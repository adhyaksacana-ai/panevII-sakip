const http = require("http");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const publicDir = __dirname;
const maxBodySize = 1_000_000;

const store = {
  renstraItems: [],
  ikuFormulas: {},
  satkerAccounts: [],
  sessions: new Map(),
};

const users = [
  {
    id: "admin",
    username: "admin",
    password: "admin123",
    name: "Admin SAKIP",
    role: "Administrator",
    unit: "Kejaksaan Negeri",
  },
  {
    id: "operator",
    username: "operator",
    password: "operator123",
    name: "Operator Satker",
    role: "Operator",
    unit: "Kejaksaan Negeri",
  },
];

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PUT,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  response.end(JSON.stringify(payload));
}

function sendError(response, statusCode, message) {
  sendJson(response, statusCode, { error: message });
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    unit: user.unit,
  };
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, ".")
    .replace(/\.+/g, ".")
    .slice(0, 42);
}

function normalizeUsernamePart(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[^\w\s/-]/g, "")
    .trim()
    .replace(/[\s/-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 42);
}

function generatePassword() {
  return `Skp-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function generateSatkerUsername(level, name) {
  const prefixMap = {
    "Kejaksaan Agung": "KA",
    "Kejaksaan Tinggi": "KT",
    "Kejaksaan Negeri": "KN",
    "Cabang Kejaksaan Negeri": "CKN",
  };
  const base = `${prefixMap[level] || "SATKER"}_${normalizeUsernamePart(name) || "baru"}`;
  let username = base;
  let suffix = 2;
  while (
    store.satkerAccounts.some((account) => account.username.toLowerCase() === username.toLowerCase()) ||
    users.some((user) => user.username.toLowerCase() === username.toLowerCase())
  ) {
    username = `${base}_${suffix}`;
    suffix += 1;
  }
  return username;
}

function sanitizeSatkerAccount(account) {
  return {
    id: account.id,
    level: account.level,
    name: account.name,
    region: account.region,
    username: account.username,
    password: account.password,
    role: account.role,
    unit: account.unit,
    status: account.status,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

function findRegisteredKejatiByName(name) {
  const normalizedName = String(name || "").trim().toLowerCase();
  return store.satkerAccounts.find(
    (account) => account.level === "Kejaksaan Tinggi" && account.name.toLowerCase() === normalizedName
  );
}

function findRegisteredKejariByName(name) {
  const normalizedName = String(name || "").trim().toLowerCase();
  return store.satkerAccounts.find(
    (account) => account.level === "Kejaksaan Negeri" && account.name.toLowerCase() === normalizedName
  );
}

function getBearerToken(request) {
  const header = request.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

function getSessionUser(request) {
  const token = getBearerToken(request);
  const session = token ? store.sessions.get(token) : null;
  if (!session || session.expiresAt < Date.now()) {
    if (token) store.sessions.delete(token);
    return null;
  }
  return session.user;
}

function requireAuth(request, response) {
  const user = getSessionUser(request);
  if (!user) {
    sendError(response, 401, "Login diperlukan.");
    return null;
  }
  return user;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBodySize) {
        reject(new Error("Request body terlalu besar."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => {
      const rawBody = Buffer.concat(chunks).toString("utf8");
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch {
        reject(new Error("Body harus berupa JSON valid."));
      }
    });

    request.on("error", reject);
  });
}

function getFormulaSourceNames(text) {
  const sourcePattern =
    /\b(?:data|jumlah|total|nilai|target|realisasi|volume|output|perkara|laporan|dokumen|layanan|anggaran)\s+[a-z0-9\s-]{0,38}/gi;
  const matches = [...String(text || "").matchAll(sourcePattern)]
    .map((match) => match[0].trim().replace(/\s+/g, " "))
    .filter((match) => match.length > 4);
  const uniqueMatches = [...new Set(matches)].slice(0, 4);
  return uniqueMatches.length ? uniqueMatches : ["Realisasi indikator", "Target indikator"];
}

function generateFormula(prompt) {
  const sources = getFormulaSourceNames(prompt);
  return {
    formula:
      sources.length > 1
        ? `Capaian = (${sources[0]} / ${sources[1]}) x 100`
        : `Capaian = ${sources[0]}`,
    dataSources: sources.map((source, index) => ({
      id: `source_${index + 1}`,
      name: source,
      requiredApiKey: true,
    })),
  };
}

function getApiFieldOptions(apiKey) {
  const seed = String(apiKey || "").slice(-4).toUpperCase() || "DATA";
  return [
    { value: `realisasi_${seed}`, label: `Realisasi ${seed}` },
    { value: `target_${seed}`, label: `Target ${seed}` },
    { value: `volume_${seed}`, label: `Volume ${seed}` },
    { value: `total_${seed}`, label: `Total ${seed}` },
  ];
}

async function handleApi(request, response, url) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (url.pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, {
      ok: true,
      service: "sakip-api",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (url.pathname === "/api/meta" && request.method === "GET") {
    sendJson(response, 200, {
      name: "SAKIP KEJAKSAAN RI API",
      version: "0.1.0",
      endpoints: [
        "GET /api/health",
        "POST /api/auth/login",
        "GET /api/auth/me",
        "POST /api/auth/logout",
        "GET /api/renstra",
        "PUT /api/renstra",
        "GET /api/iku-formulas",
        "PUT /api/iku-formulas",
        "POST /api/ai/generate-formula",
        "POST /api/data-sources/load",
        "GET /api/satker-accounts",
        "POST /api/satker-accounts",
        "POST /api/satker-accounts/:id/refresh-password",
      ],
    });
    return;
  }

  if (url.pathname === "/api/auth/login" && request.method === "POST") {
    const body = await readBody(request);
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");
    const baseUser = users.find((item) => item.username === username && item.password === password);
    const satkerUser = store.satkerAccounts.find((item) => item.username.toLowerCase() === username && item.password === password);
    const user = baseUser || satkerUser;

    if (!user) {
      sendError(response, 401, "Username atau password salah.");
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    store.sessions.set(token, {
      user: sanitizeUser(user),
      expiresAt: Date.now() + 1000 * 60 * 60 * 8,
    });
    sendJson(response, 200, { token, user: sanitizeUser(user) });
    return;
  }

  if (url.pathname === "/api/auth/me" && request.method === "GET") {
    const user = requireAuth(request, response);
    if (!user) return;
    sendJson(response, 200, { user });
    return;
  }

  if (url.pathname === "/api/auth/logout" && request.method === "POST") {
    const token = getBearerToken(request);
    if (token) store.sessions.delete(token);
    sendJson(response, 200, { ok: true });
    return;
  }

  if (url.pathname === "/api/renstra" && request.method === "GET") {
    if (!requireAuth(request, response)) return;
    sendJson(response, 200, { rows: store.renstraItems });
    return;
  }

  if (url.pathname === "/api/renstra" && request.method === "PUT") {
    if (!requireAuth(request, response)) return;
    const body = await readBody(request);
    store.renstraItems = Array.isArray(body.rows) ? body.rows : [];
    sendJson(response, 200, { rows: store.renstraItems });
    return;
  }

  if (url.pathname === "/api/iku-formulas" && request.method === "GET") {
    if (!requireAuth(request, response)) return;
    sendJson(response, 200, { formulas: store.ikuFormulas });
    return;
  }

  if (url.pathname === "/api/iku-formulas" && request.method === "PUT") {
    if (!requireAuth(request, response)) return;
    const body = await readBody(request);
    store.ikuFormulas = body.formulas && typeof body.formulas === "object" ? body.formulas : {};
    sendJson(response, 200, { formulas: store.ikuFormulas });
    return;
  }

  if (url.pathname === "/api/ai/generate-formula" && request.method === "POST") {
    if (!requireAuth(request, response)) return;
    const body = await readBody(request);
    sendJson(response, 200, generateFormula(body.prompt));
    return;
  }

  if (url.pathname === "/api/data-sources/load" && request.method === "POST") {
    if (!requireAuth(request, response)) return;
    const body = await readBody(request);
    if (!body.apiKey) {
      sendError(response, 400, "apiKey wajib diisi.");
      return;
    }
    sendJson(response, 200, { fields: getApiFieldOptions(body.apiKey) });
    return;
  }

  if (url.pathname === "/api/satker-accounts" && request.method === "GET") {
    if (!requireAuth(request, response)) return;
    sendJson(response, 200, { accounts: store.satkerAccounts.map(sanitizeSatkerAccount) });
    return;
  }

  if (url.pathname === "/api/satker-accounts" && request.method === "POST") {
    if (!requireAuth(request, response)) return;
    const body = await readBody(request);
    const level = String(body.level || "").trim();
    const name = String(body.name || "").trim();
    const region = String(body.region || "").trim();

    if (!level || !name) {
      sendError(response, 400, "Tingkat dan nama Bidang/Badan/Kota/Provinsi/Kabupaten/Kota wajib diisi.");
      return;
    }

    if (level === "Kejaksaan Negeri" && !findRegisteredKejatiByName(region)) {
      sendError(response, 400, "Wilayah Kejaksaan Negeri harus memilih akun Kejaksaan Tinggi yang sudah terdaftar.");
      return;
    }

    if (level === "Cabang Kejaksaan Negeri" && !findRegisteredKejariByName(region)) {
      sendError(response, 400, "Wilayah Cabang Kejaksaan Negeri harus memilih akun Kejaksaan Negeri yang sudah terdaftar.");
      return;
    }

    const account = {
      id: crypto.randomUUID(),
      level,
      name,
      region,
      username: generateSatkerUsername(level, name),
      password: generatePassword(),
      role: "Satker",
      unit: name,
      status: "Aktif",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.satkerAccounts.unshift(account);
    sendJson(response, 201, { account: sanitizeSatkerAccount(account) });
    return;
  }

  const refreshMatch = url.pathname.match(/^\/api\/satker-accounts\/([^/]+)\/refresh-password$/);
  if (refreshMatch && request.method === "POST") {
    if (!requireAuth(request, response)) return;
    const account = store.satkerAccounts.find((item) => item.id === refreshMatch[1]);
    if (!account) {
      sendError(response, 404, "Akun satker tidak ditemukan.");
      return;
    }

    account.password = generatePassword();
    account.updatedAt = new Date().toISOString();
    sendJson(response, 200, { account: sanitizeSatkerAccount(account) });
    return;
  }

  sendError(response, 404, "Endpoint API tidak ditemukan.");
}

async function serveStatic(request, response, url) {
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.resolve(publicDir, `.${requestedPath}`);

  if (!filePath.startsWith(publicDir)) {
    sendError(response, 403, "Akses file ditolak.");
    return;
  }

  try {
    const data = await fs.readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      sendError(response, 404, "File tidak ditemukan.");
      return;
    }
    sendError(response, 500, "Gagal membaca file.");
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);

  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(request, response, url);
      return;
    }

    await serveStatic(request, response, url);
  } catch (error) {
    sendError(response, 400, error.message || "Request tidak valid.");
  }
});

server.listen(port, host, () => {
  console.log(`SAKIP API berjalan di http://${host}:${port}`);
});
