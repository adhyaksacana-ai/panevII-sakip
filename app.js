const goals = [
  {
    title: "Meningkatnya penanganan perkara yang profesional",
    progress: 91,
  },
  {
    title: "Meningkatnya kualitas pelayanan hukum kepada masyarakat",
    progress: 84,
  },
  {
    title: "Menguatnya tata kelola dan akuntabilitas satuan kerja",
    progress: 78,
  },
];

const authStorageKey = "sakipAuthSession";
const satkerAccountsStorageKey = "sakipSatkerAccounts";
let currentUser = null;

const defaultCascades = [
  {
    strategic: "Meningkatnya penanganan perkara yang profesional",
    strategicIndicators: [
      { name: "Persentase penyelesaian perkara sesuai standar layanan", target: "95%" },
      { name: "Rata-rata waktu penyelesaian administrasi perkara", target: "7 hari" },
    ],
    program: "Terwujudnya penanganan perkara pidana umum yang efektif",
    programIndicators: [
      { name: "Persentase berkas perkara yang ditangani tepat waktu", target: "94%" },
      { name: "Persentase perkara lengkap secara administrasi", target: "98%" },
    ],
    activity: "Penyelesaian administrasi penanganan perkara pidana umum",
    activityIndicators: [
      { name: "Jumlah perkara yang diselesaikan sesuai SOP", target: "120 perkara" },
      { name: "Persentase eviden perkara yang tervalidasi", target: "96%" },
    ],
    owner: "Pidana Umum",
    status: "On-track",
  },
  {
    strategic: "Menguatnya tata kelola dan akuntabilitas satuan kerja",
    strategicIndicators: [
      { name: "Nilai evaluasi SAKIP internal", target: "88" },
      { name: "Persentase rekomendasi evaluasi yang ditindaklanjuti", target: "92%" },
    ],
    program: "Meningkatnya kualitas perencanaan dan pelaporan kinerja",
    programIndicators: [
      { name: "Persentase dokumen kinerja yang lengkap dan tepat waktu", target: "100%" },
      { name: "Persentase kesesuaian rencana aksi dengan perjanjian kinerja", target: "95%" },
    ],
    activity: "Penyusunan laporan kinerja dan eviden SAKIP",
    activityIndicators: [
      { name: "Jumlah dokumen eviden yang tervalidasi", target: "48 dokumen" },
      { name: "Jumlah laporan monitoring triwulanan", target: "4 laporan" },
    ],
    owner: "Pembinaan",
    status: "Perlu eviden",
  },
  {
    strategic: "Meningkatnya kualitas pelayanan hukum kepada masyarakat",
    strategicIndicators: [
      { name: "Indeks kepuasan layanan publik", target: "90" },
      { name: "Persentase layanan tanpa pengaduan berulang", target: "93%" },
    ],
    program: "Terwujudnya layanan hukum yang responsif",
    programIndicators: [
      { name: "Persentase layanan yang selesai sesuai SLA", target: "90%" },
      { name: "Persentase pengaduan yang ditindaklanjuti", target: "100%" },
    ],
    activity: "Pelaksanaan pelayanan hukum dan pengaduan masyarakat",
    activityIndicators: [
      { name: "Persentase pengaduan masyarakat yang ditindaklanjuti", target: "100%" },
      { name: "Jumlah kanal layanan yang aktif", target: "4 kanal" },
    ],
    owner: "Intelijen",
    status: "On-track",
  },
];

let cascades = structuredClone(defaultCascades);
let editingIndex = null;

const defaultAgreements = [
  {
    number: "PK-001/2026",
    period: "Tahun 2026",
    supervisorName: "Kepala Kejaksaan Negeri Bandung",
    supervisorPosition: "Atasan Langsung",
    employeeName: "Kepala Seksi Pidana Umum",
    employeePosition: "Bawahan",
    cascadeIndex: 0,
    indicatorLevel: "strategic",
    indicatorIndex: 0,
    target: "95%",
    status: "Ditandatangani",
  },
];

let agreements = structuredClone(defaultAgreements);
let editingAgreementIndex = null;

const defaultRenstra = [
  {
    period: "2026-2030",
    unit: "Kejaksaan Negeri Bandung",
    strategic: "Meningkatnya akuntabilitas kinerja satuan kerja",
    program: "Meningkatnya kualitas perencanaan dan pelaporan kinerja",
    activity: "Penyusunan laporan kinerja triwulanan",
    owner: "Subbag Pembinaan",
    strategicIndicators: [
      { name: "Nilai SAKIP satuan kerja", targets: ["82", "84", "86", "88", "90"] },
      { name: "Persentase rekomendasi evaluasi yang ditindaklanjuti", targets: ["80%", "85%", "90%", "95%", "100%"] },
    ],
    programIndicators: [
      { name: "Persentase dokumen kinerja tepat waktu", targets: ["90%", "92%", "94%", "96%", "100%"] },
    ],
    activityIndicators: [
      { name: "Jumlah laporan monitoring tepat waktu", targets: ["4 laporan", "4 laporan", "4 laporan", "4 laporan", "4 laporan"] },
    ],
  },
  {
    period: "2026-2030",
    unit: "Kejaksaan Negeri Bandung",
    strategic: "Meningkatnya penanganan perkara yang profesional dan berkeadilan",
    program: "Terwujudnya penanganan perkara pidana umum yang efektif",
    activity: "Penyelesaian administrasi dan pengendalian perkara pidana umum",
    owner: "Seksi Pidana Umum",
    strategicIndicators: [
      { name: "Persentase perkara selesai sesuai standar layanan", targets: ["82%", "86%", "90%", "93%", "95%"] },
      { name: "Indeks kualitas penanganan perkara", targets: ["78", "80", "83", "86", "88"] },
    ],
    programIndicators: [
      { name: "Persentase berkas perkara yang ditangani tepat waktu", targets: ["84%", "88%", "91%", "94%", "96%"] },
    ],
    activityIndicators: [
      { name: "Jumlah perkara yang diselesaikan sesuai SOP", targets: ["110 perkara", "118 perkara", "126 perkara", "134 perkara", "140 perkara"] },
      { name: "Persentase eviden perkara tervalidasi", targets: ["86%", "90%", "93%", "96%", "98%"] },
    ],
  },
  {
    period: "2026-2030",
    unit: "Kejaksaan Negeri Bandung",
    strategic: "Meningkatnya efektivitas pemulihan aset dan penyelamatan keuangan negara",
    program: "Meningkatnya penyelesaian perkara tindak pidana khusus",
    activity: "Pelaksanaan penyidikan dan penuntutan perkara tindak pidana khusus",
    owner: "Seksi Pidana Khusus",
    strategicIndicators: [
      { name: "Nilai pemulihan aset dan penyelamatan keuangan negara", targets: ["Rp2 M", "Rp2.5 M", "Rp3 M", "Rp3.5 M", "Rp4 M"] },
    ],
    programIndicators: [
      { name: "Persentase perkara tindak pidana khusus yang naik tahap", targets: ["70%", "75%", "80%", "85%", "90%"] },
      { name: "Persentase tindak lanjut hasil audit kerugian negara", targets: ["75%", "80%", "85%", "90%", "95%"] },
    ],
    activityIndicators: [
      { name: "Jumlah perkara tindak pidana khusus yang diselesaikan", targets: ["8 perkara", "10 perkara", "12 perkara", "14 perkara", "16 perkara"] },
    ],
  },
  {
    period: "2026-2030",
    unit: "Kejaksaan Negeri Bandung",
    strategic: "Meningkatnya kualitas pelayanan hukum dan kepercayaan masyarakat",
    program: "Terwujudnya layanan hukum yang responsif dan mudah diakses",
    activity: "Pelayanan hukum, penerangan hukum, dan pengelolaan pengaduan masyarakat",
    owner: "Seksi Intelijen",
    strategicIndicators: [
      { name: "Indeks kepuasan layanan publik", targets: ["82", "85", "88", "90", "92"] },
      { name: "Persentase layanan tanpa pengaduan berulang", targets: ["85%", "88%", "91%", "94%", "96%"] },
    ],
    programIndicators: [
      { name: "Persentase layanan selesai sesuai SLA", targets: ["86%", "89%", "92%", "95%", "97%"] },
    ],
    activityIndicators: [
      { name: "Jumlah kegiatan penerangan hukum", targets: ["18 kegiatan", "22 kegiatan", "26 kegiatan", "30 kegiatan", "34 kegiatan"] },
      { name: "Persentase pengaduan masyarakat yang ditindaklanjuti", targets: ["90%", "93%", "95%", "97%", "100%"] },
    ],
  },
  {
    period: "2026-2030",
    unit: "Kejaksaan Negeri Bandung",
    strategic: "Meningkatnya tata kelola barang bukti dan barang rampasan",
    program: "Meningkatnya pengelolaan barang bukti yang transparan dan akuntabel",
    activity: "Inventarisasi, pemeliharaan, dan penyelesaian barang bukti",
    owner: "Seksi Pengelolaan Barang Bukti",
    strategicIndicators: [
      { name: "Persentase barang bukti tercatat dan terlacak", targets: ["88%", "91%", "94%", "97%", "100%"] },
    ],
    programIndicators: [
      { name: "Persentase barang bukti yang memiliki status hukum jelas", targets: ["80%", "84%", "88%", "92%", "96%"] },
    ],
    activityIndicators: [
      { name: "Jumlah pembaruan data barang bukti", targets: ["12 kali", "12 kali", "12 kali", "12 kali", "12 kali"] },
      { name: "Persentase barang rampasan yang diselesaikan", targets: ["70%", "76%", "82%", "88%", "94%"] },
    ],
  },
];

let renstraItems = structuredClone(defaultRenstra);
let editingRenstraIndex = null;
let ikuFormulas = loadIkuFormulas();
let openIkuFormulaKeys = new Set();
let satkerAccounts = loadSatkerAccounts();

const defaultRealizations = [
  {
    quarter: "Triwulan I",
    agreementIndex: 0,
    achievement: "86%",
    budget: 125000000,
    note: "Realisasi awal berjalan sesuai target triwulanan.",
  },
];

let realizations = structuredClone(defaultRealizations);

const akipDocumentTypes = [
  "Renstra",
  "IKU",
  "Renja/RKT",
  "Perjanjian Kinerja",
  "Rencana Aksi",
  "Laporan Kinerja",
  "DPA",
  "Pohon Kinerja & Cascading",
  "LHE AKIP Internal",
  "TL LHE AKIP Internal",
  "Laporan Monev Renaksi",
  "Pedoman Teknis Perencanaan",
  "Pedoman Teknis Pengukuran & Pengumpulan Data Kinerja",
  "Pedoman Teknis Evaluasi Internal",
];

const akipQuarters = ["Triwulan I", "Triwulan II", "Triwulan III", "Triwulan IV"];

const akipDocumentCategories = [
  {
    name: "Perencanaan Kinerja",
    types: ["Renstra", "IKU", "Renja/RKT", "Perjanjian Kinerja", "Rencana Aksi", "Pohon Kinerja & Cascading"],
  },
  {
    name: "Pengukuran Kinerja",
    types: ["DPA", "Laporan Monev Renaksi"],
  },
  {
    name: "Pelaporan Kinerja",
    types: ["Laporan Kinerja"],
  },
  {
    name: "Evaluasi dan Tindak Lanjut",
    types: ["LHE AKIP Internal", "TL LHE AKIP Internal"],
  },
  {
    name: "Pedoman Teknis",
    types: [
      "Pedoman Teknis Perencanaan",
      "Pedoman Teknis Pengukuran & Pengumpulan Data Kinerja",
      "Pedoman Teknis Evaluasi Internal",
    ],
  },
];

let selectedAkipFiles = [];
let uploadedAkipDocuments = [];
let uploadProgressTimer = null;

const reviews = [
  ["Kualitas Eviden", "Beberapa indikator membutuhkan bukti dukung yang lebih spesifik dan mudah ditelusuri."],
  ["Konsistensi Target", "Target tahunan perlu diselaraskan ulang dengan rencana aksi triwulanan."],
  ["Tindak Lanjut", "Unit pembina diminta memperbarui progres paling lambat 7 hari kerja."],
];

const titles = {
  dashboard: "Dashboard Kinerja",
  renstra: "Matriks Renstra Satker",
  rencana: "Rencana Kinerja Tahunan",
  iku: "Indikator Kinerja Utama",
  "akun-satker": "Akun Satker",
  perjanjian: "Perjanjian Kinerja",
  realisasi: "Realisasi Kinerja",
  eviden: "Dokumen AKIP",
  evaluasi: "Monitoring dan Evaluasi",
  "evaluasi-akip": "Evaluasi AKIP",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function loadIkuFormulas() {
  try {
    return JSON.parse(window.localStorage.getItem("sakipIkuFormulas") || "{}");
  } catch {
    return {};
  }
}

function persistIkuFormulas() {
  window.localStorage.setItem("sakipIkuFormulas", JSON.stringify(ikuFormulas));
}

function loadSatkerAccounts() {
  try {
    return JSON.parse(window.localStorage.getItem(satkerAccountsStorageKey) || "[]");
  } catch {
    return [];
  }
}

function persistSatkerAccounts() {
  window.localStorage.setItem(satkerAccountsStorageKey, JSON.stringify(satkerAccounts));
}

function isBackendAvailable() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

function getStoredAuth() {
  try {
    return JSON.parse(window.localStorage.getItem(authStorageKey) || "null");
  } catch {
    return null;
  }
}

function storeAuth(session) {
  window.localStorage.setItem(authStorageKey, JSON.stringify(session));
}

function clearAuth() {
  window.localStorage.removeItem(authStorageKey);
  currentUser = null;
}

async function apiRequest(path, options = {}) {
  const session = getStoredAuth();
  const headers = {
    "content-type": "application/json",
    ...(options.headers || {}),
  };

  if (session?.token) headers.authorization = `Bearer ${session.token}`;

  const response = await fetch(path, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || "Request API gagal.");
  }

  return payload;
}

function applyAuthenticatedUser(user) {
  currentUser = user;
  document.querySelector("#profileName").textContent = user.name || "Pengguna SAKIP";
  document.querySelector("#profileRole").textContent = `${user.role || "User"} - ${user.unit || "Satuan Kerja"}`;
  document.querySelector("#loginShell").hidden = true;
  document.querySelector("#appShell").hidden = false;
  loadSatkerAccountsFromServer().catch(() => renderSatkerAccounts());
}

function showLogin(message = "") {
  document.querySelector("#loginShell").hidden = false;
  document.querySelector("#appShell").hidden = true;
  document.querySelector("#loginMessage").textContent = message;
}

async function initializeAuth() {
  const session = getStoredAuth();

  if (!session) {
    showLogin();
    return;
  }

  if (!isBackendAvailable()) {
    applyAuthenticatedUser(session.user);
    return;
  }

  try {
    const { user } = await apiRequest("/api/auth/me");
    storeAuth({ ...session, user });
    applyAuthenticatedUser(user);
  } catch {
    clearAuth();
    showLogin("Sesi berakhir. Silakan masuk kembali.");
  }
}

function renderIndicatorList(indicators) {
  return `
    <ul class="inline-list">
      ${indicators
        .map(
          (indicator) =>
            `<li><strong>${escapeHtml(indicator.name)}</strong><span>Target ${escapeHtml(indicator.target)}</span></li>`
        )
        .join("")}
    </ul>
  `;
}

function currency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function getIndicatorsByLevel(plan, level) {
  if (!plan) return [];
  if (level === "strategic") return plan.strategicIndicators;
  if (level === "program") return plan.programIndicators;
  return plan.activityIndicators;
}

function getLevelLabel(level) {
  return {
    strategic: "Sasaran Strategis",
    program: "Sasaran Program",
    activity: "Sasaran Kegiatan",
  }[level];
}

function getSasaranByLevel(plan, level) {
  if (!plan) return "-";
  if (level === "strategic") return plan.strategic;
  if (level === "program") return plan.program;
  return plan.activity;
}

function getAgreementPlan(agreement) {
  return cascades[agreement?.cascadeIndex] || cascades[0];
}

function getAgreementIndicator(agreement) {
  const plan = getAgreementPlan(agreement);
  const indicators = getIndicatorsByLevel(plan, agreement?.indicatorLevel || "activity");
  return indicators[agreement?.indicatorIndex] || indicators[0] || { name: "-", target: "-" };
}

function getSignedAgreementEntries() {
  return agreements
    .map((agreement, index) => ({ agreement, index }))
    .filter(({ agreement }) => agreement.status === "Ditandatangani");
}

function getSelectedSignedAgreement() {
  const agreementSelect = document.querySelector("#realizationAgreementSelect");
  const selectedIndex = Number(agreementSelect?.value);
  const selectedAgreement = agreements[selectedIndex];
  if (selectedAgreement?.status === "Ditandatangani") {
    return { agreement: selectedAgreement, index: selectedIndex };
  }

  return getSignedAgreementEntries()[0] || { agreement: null, index: -1 };
}

function renderRenstraIndicatorList(indicators) {
  return indicators
    .map(
      (indicator) => `
        <div>
          <strong>${escapeHtml(indicator.name)}</strong>
          <ul class="target-list">
            ${indicator.targets
              .map((target, index) => `<li><span>Tahun ${index + 1}</span><strong>${escapeHtml(target)}</strong></li>`)
              .join("")}
          </ul>
        </div>
      `
    )
    .join("");
}

function parseTargetNumber(value) {
  const match = String(value || "").replace(",", ".").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function calculateAchievementPercent(achievement, target) {
  const achievementNumber = parseTargetNumber(achievement);
  const targetNumber = parseTargetNumber(target);
  if (!achievementNumber || !targetNumber) return 0;

  return Math.min(Math.round((achievementNumber / targetNumber) * 100), 150);
}

function getStrategicDashboardItems() {
  const latestByAgreement = new Map();
  realizations.forEach((item) => {
    const agreement = agreements[item.agreementIndex];
    if (!agreement || agreement.status !== "Ditandatangani" || agreement.indicatorLevel !== "strategic") return;
    if (!latestByAgreement.has(item.agreementIndex)) latestByAgreement.set(item.agreementIndex, item);
  });

  return [...latestByAgreement.entries()].map(([agreementIndex, realization]) => {
    const agreement = agreements[agreementIndex];
    const plan = getAgreementPlan(agreement);
    const indicator = getAgreementIndicator(agreement);
    const target = agreement.target || indicator.target;
    const percent = calculateAchievementPercent(realization.achievement, target);
    const status = percent < 60 ? "red" : percent < 85 ? "yellow" : "green";

    return {
      sasaran: getSasaranByLevel(plan, "strategic"),
      indicator: indicator.name,
      target,
      achievement: realization.achievement,
      quarter: realization.quarter,
      percent,
      status,
    };
  });
}

function renderGoals() {
  const goalList = document.querySelector("#goalList");
  if (!goalList) return;

  const items = getStrategicDashboardItems();
  const average = items.length ? Math.round(items.reduce((total, item) => total + item.percent, 0) / items.length) : 0;
  const riskCount = items.filter((item) => item.percent < 85).length;

  document.querySelector("#strategicAverageMetric").textContent = `${average}%`;
  document.querySelector("#strategicGoalMetric").textContent = new Set(items.map((item) => item.sasaran)).size;
  document.querySelector("#strategicIndicatorMetric").textContent = items.length;
  document.querySelector("#strategicRiskMetric").textContent = riskCount;

  if (!items.length) {
    goalList.innerHTML = `
      <div class="empty-dashboard">
        <strong>Belum ada capaian sasaran strategis.</strong>
        <span>Tandatangani Perjanjian Kinerja level Sasaran Strategis, lalu input realisasi kinerjanya.</span>
      </div>
    `;
    return;
  }

  goalList.innerHTML = items
    .map(
      (item) => `
        <article class="strategic-card ${item.status}">
          <div class="status-ring" style="--value: ${Math.min(item.percent, 100)}">
            <strong>${item.percent}%</strong>
            <span>${escapeHtml(item.quarter)}</span>
          </div>
          <div class="strategic-card-body">
            <span class="status-label">${item.status === "green" ? "Tercapai" : item.status === "yellow" ? "Perlu Akselerasi" : "Kritis"}</span>
            <strong>${escapeHtml(item.sasaran)}</strong>
            <p>${escapeHtml(item.indicator)}</p>
            <div class="target-strip">
              <span>Target: <strong>${escapeHtml(item.target)}</strong></span>
              <span>Realisasi: <strong>${escapeHtml(item.achievement)}</strong></span>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderPlans() {
  const planRows = document.querySelector("#planRows");
  planRows.innerHTML = cascades
    .map(
      (plan, index) => `
        <tr>
          <td>
            <strong>${escapeHtml(plan.strategic)}</strong>
          </td>
          <td>${renderIndicatorList(plan.strategicIndicators)}</td>
          <td>
            <strong>${escapeHtml(plan.program)}</strong>
          </td>
          <td>${renderIndicatorList(plan.programIndicators)}</td>
          <td>${escapeHtml(plan.activity)}</td>
          <td>${renderIndicatorList(plan.activityIndicators)}</td>
          <td>${escapeHtml(plan.owner)}</td>
          <td><span class="badge">${escapeHtml(plan.status)}</span></td>
          <td>
            <div class="row-actions">
              <button class="ghost-button" data-edit-plan="${index}" type="button">Edit</button>
              <button class="ghost-button" data-delete-plan="${index}" type="button">Hapus</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function getRenstraYears(item) {
  const match = String(item.period).match(/(\d{4})\D+(\d{4})/);
  if (!match) return [1, 2, 3, 4, 5].map((year) => `Tahun ${year}`);

  const startYear = Number(match[1]);
  return [0, 1, 2, 3, 4].map((offset) => String(startYear + offset));
}

function getPerformanceYears() {
  return [...new Set(renstraItems.flatMap(getRenstraYears))];
}

function getTargetIndexForYear(item, selectedYear) {
  const years = getRenstraYears(item);
  const index = years.indexOf(selectedYear);
  return index >= 0 ? index : 0;
}

function renderRenstraIndicatorsForYear(indicators, yearIndex, selectedYear) {
  return `
    <ul class="inline-list">
      ${indicators
        .map(
          (indicator) =>
            `<li><strong>${escapeHtml(indicator.name)}</strong><span>Target ${escapeHtml(selectedYear)}: ${escapeHtml(indicator.targets[yearIndex] || "-")}</span></li>`
        )
        .join("")}
    </ul>
  `;
}

function getIkuFormulaKey(item, level, indicator) {
  return [item.period, item.unit, level, getSasaranByLevel(item, level), indicator.name].join("||");
}

function getDefaultIkuFormula(indicator) {
  return {
    method: "percentage_manual",
    numerator: "Realisasi",
    denominator: "Target",
    unit: "%",
    note: "Capaian dihitung dari realisasi dibandingkan target.",
    manualValueLabel: "Nilai capaian",
    apiNumeratorKey: "",
    apiNumeratorField: "",
    apiDenominatorKey: "",
    apiDenominatorField: "",
    formulaPrompt: "",
    generatedFormula: "",
    dataSources: [],
    saved: false,
  };
}

function getIkuFormula(item, level, indicator) {
  const key = getIkuFormulaKey(item, level, indicator);
  return {
    ...getDefaultIkuFormula(indicator),
    ...(ikuFormulas[key] || {}),
  };
}

function getIkuFormulaText(formula) {
  if (formula.method === "manual_value") return "Capaian = Nilai manual tanpa rumus";
  if (formula.method === "percentage_api") return "Capaian = Data pembilang API / data penyebut API x 100";
  if (formula.method === "ai_generated") return formula.generatedFormula || "Generate rumus AI untuk menentukan sumber data";
  return "Capaian = Realisasi / Target x 100";
}

function getApiFieldOptions(apiKey) {
  if (!apiKey) return [];
  const seed = apiKey.slice(-4).toUpperCase() || "DATA";
  return [
    { value: `realisasi_${seed}`, label: `Realisasi ${seed}` },
    { value: `target_${seed}`, label: `Target ${seed}` },
    { value: `volume_${seed}`, label: `Volume ${seed}` },
    { value: `total_${seed}`, label: `Total ${seed}` },
  ];
}

function getFormulaSourceNames(text) {
  const sourcePattern = /\b(?:data|jumlah|total|nilai|target|realisasi|volume|output|perkara|laporan|dokumen|layanan|anggaran)\s+[a-z0-9\s-]{0,38}/gi;
  const matches = [...String(text).matchAll(sourcePattern)]
    .map((match) => match[0].trim().replace(/\s+/g, " "))
    .filter((match) => match.length > 4);
  const uniqueMatches = [...new Set(matches)].slice(0, 4);
  return uniqueMatches.length ? uniqueMatches : ["Realisasi indikator", "Target indikator"];
}

function generateIkuFormulaFromPrompt(prompt) {
  const sources = getFormulaSourceNames(prompt);
  const sourceKeys = sources.map((source, index) => ({
    name: source,
    apiKey: "",
    selectedField: "",
    id: `source_${index + 1}`,
  }));

  return {
    generatedFormula:
      sources.length > 1
        ? `Capaian = (${sources[0]} / ${sources[1]}) x 100`
        : `Capaian = ${sources[0]}`,
    dataSources: sourceKeys,
  };
}

function renderApiFieldSelect(key, field, value, apiKey, label) {
  const options = getApiFieldOptions(apiKey);
  return `
    <label>
      ${label}
      <select data-iku-field="${field}" data-iku-key="${escapeHtml(key)}" ${options.length ? "" : "disabled"}>
        <option value="">${options.length ? "Pilih data" : "Load API dahulu"}</option>
        ${options
          .map((option) => `<option value="${escapeHtml(option.value)}" ${value === option.value ? "selected" : ""}>${escapeHtml(option.label)}</option>`)
          .join("")}
      </select>
    </label>
  `;
}

function renderFormulaControls(key, formula) {
  if (formula.method === "manual_value") {
    return `
      <div class="iku-parameter-grid compact">
        <label>
          Label Nilai
          <input data-iku-field="manualValueLabel" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.manualValueLabel)}" placeholder="Contoh: Nilai capaian" />
        </label>
        <label>
          Satuan
          <input data-iku-field="unit" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.unit)}" placeholder="Satuan" />
        </label>
        <label class="wide-field">
          Keterangan
          <input data-iku-field="note" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.note)}" placeholder="Tanpa formulasi, nilai diinput manual" />
        </label>
      </div>
    `;
  }

  if (formula.method === "percentage_api") {
    return `
      <div class="iku-parameter-grid api-grid">
        <label>
          API Key Pembilang
          <input data-iku-field="apiNumeratorKey" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.apiNumeratorKey)}" placeholder="Masukkan API key pembilang" />
        </label>
        ${renderApiFieldSelect(key, "apiNumeratorField", formula.apiNumeratorField, formula.apiNumeratorKey, "Data Pembilang")}
        <button class="ghost-button" data-load-api="apiNumeratorKey" data-iku-key="${escapeHtml(key)}" type="button">Load Pembilang</button>
        <label>
          API Key Penyebut
          <input data-iku-field="apiDenominatorKey" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.apiDenominatorKey)}" placeholder="Masukkan API key penyebut" />
        </label>
        ${renderApiFieldSelect(key, "apiDenominatorField", formula.apiDenominatorField, formula.apiDenominatorKey, "Data Penyebut")}
        <button class="ghost-button" data-load-api="apiDenominatorKey" data-iku-key="${escapeHtml(key)}" type="button">Load Penyebut</button>
      </div>
    `;
  }

  if (formula.method === "ai_generated") {
    return `
      <div class="iku-ai-builder">
        <label>
          Rumus atau Instruksi AI
          <textarea data-iku-field="formulaPrompt" data-iku-key="${escapeHtml(key)}" rows="3" placeholder="Contoh: hitung persentase laporan tepat waktu dibanding seluruh laporan">${escapeHtml(formula.formulaPrompt)}</textarea>
        </label>
        <div class="form-actions">
          <button class="ghost-button" data-generate-iku-formula data-iku-key="${escapeHtml(key)}" type="button">Generate AI</button>
        </div>
        <strong>${escapeHtml(formula.generatedFormula || "Belum ada rumus hasil generate.")}</strong>
        <div class="iku-source-list">
          ${formula.dataSources
            .map(
              (source, index) => `
                <div class="iku-source-row">
                  <span>${escapeHtml(source.name)}</span>
                  <input data-iku-source-field="apiKey" data-iku-source-index="${index}" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(source.apiKey || "")}" placeholder="API key sumber data" />
                  ${renderApiFieldSelect(key, `sourceField:${index}`, source.selectedField, source.apiKey, "Data")}
                  <button class="ghost-button" data-load-source-api="${index}" data-iku-key="${escapeHtml(key)}" type="button">Load Data</button>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  return `
    <div class="iku-parameter-grid">
      <label>
        Pembilang
        <input data-iku-field="numerator" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.numerator)}" placeholder="Pembilang" />
      </label>
      <label>
        Penyebut
        <input data-iku-field="denominator" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.denominator)}" placeholder="Penyebut" />
      </label>
      <label>
        Satuan
        <input data-iku-field="unit" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.unit)}" placeholder="Satuan" />
      </label>
      <label class="wide-field">
        Keterangan
        <input data-iku-field="note" data-iku-key="${escapeHtml(key)}" value="${escapeHtml(formula.note)}" placeholder="Keterangan penyebut dan pembilang" />
      </label>
    </div>
  `;
}

function renderEyeIcon(isOpen) {
  if (isOpen) {
    return `
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;
  }

  return `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 3l18 18"></path>
      <path d="M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6"></path>
      <path d="M9.5 5.5A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17.2 17.2 0 0 1-3.2 4.2"></path>
      <path d="M6.6 6.7C3.6 8.6 2 12 2 12s3.5 7 10 7c1.4 0 2.7-.3 3.8-.8"></path>
    </svg>
  `;
}

function getIkuRows() {
  return renstraItems.flatMap((item, renstraIndex) =>
    ["strategic", "program", "activity"].flatMap((level) =>
      getIndicatorsByLevel(item, level).map((indicator, indicatorIndex) => ({
        item,
        renstraIndex,
        level,
        indicator,
        indicatorIndex,
      }))
    )
  );
}

function slugifyAccount(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, ".")
    .replace(/\.+/g, ".")
    .slice(0, 42);
}

function normalizeAccountUsernamePart(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[^\w\s/-]/g, "")
    .trim()
    .replace(/[\s/-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 42);
}

function generateLocalPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const randomPart = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `Skp-${randomPart}`;
}

function generateLocalSatkerUsername(level, name) {
  const prefixMap = {
    "Kejaksaan Agung": "KA",
    "Kejaksaan Tinggi": "KT",
    "Kejaksaan Negeri": "KN",
    "Cabang Kejaksaan Negeri": "CKN",
  };
  const base = `${prefixMap[level] || "SATKER"}_${normalizeAccountUsernamePart(name) || "baru"}`;
  let username = base;
  let suffix = 2;
  while (
    satkerAccounts.some((account) => account.username.toLowerCase() === username.toLowerCase()) ||
    ["admin", "operator"].includes(username.toLowerCase())
  ) {
    username = `${base}_${suffix}`;
    suffix += 1;
  }
  return username;
}

function renderSatkerAccounts() {
  const rows = document.querySelector("#satkerAccountRows");
  if (!rows) return;

  if (!satkerAccounts.length) {
    rows.innerHTML = "<tr><td colspan=\"7\">Belum ada akun satker. Input nama Bidang/Badan/Kota/Provinsi/Kabupaten/Kota untuk membuat akun login otomatis.</td></tr>";
    return;
  }

  rows.innerHTML = satkerAccounts
    .map(
      (account) => `
        <tr>
          <td><span class="badge">${escapeHtml(account.level)}</span></td>
          <td><strong>${escapeHtml(account.name)}</strong></td>
          <td>${escapeHtml(account.region || "-")}</td>
          <td><code>${escapeHtml(account.username)}</code></td>
          <td><code>${escapeHtml(account.password)}</code></td>
          <td>${escapeHtml(account.status || "Aktif")}</td>
          <td>
            <div class="row-actions">
              <button class="ghost-button" data-refresh-satker-password="${escapeHtml(account.id)}" type="button">Refresh Password</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

async function loadSatkerAccountsFromServer() {
  if (!isBackendAvailable() || !getStoredAuth()?.token) {
    renderSatkerAccounts();
    return;
  }

  const { accounts } = await apiRequest("/api/satker-accounts");
  satkerAccounts = accounts;
  persistSatkerAccounts();
  renderSatkerAccounts();
}

async function createSatkerAccount(payload) {
  if (isBackendAvailable() && getStoredAuth()?.token) {
    const { account } = await apiRequest("/api/satker-accounts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    satkerAccounts.unshift(account);
  } else {
    satkerAccounts.unshift({
      id: crypto.randomUUID(),
      level: payload.level,
      name: payload.name,
      region: payload.region,
      username: generateLocalSatkerUsername(payload.level, payload.name),
      password: generateLocalPassword(),
      role: "Satker",
      unit: payload.name,
      status: "Aktif",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  persistSatkerAccounts();
  renderSatkerAccounts();
}

async function refreshSatkerPassword(accountId) {
  if (isBackendAvailable() && getStoredAuth()?.token) {
    const { account } = await apiRequest(`/api/satker-accounts/${encodeURIComponent(accountId)}/refresh-password`, {
      method: "POST",
      body: "{}",
    });
    satkerAccounts = satkerAccounts.map((item) => (item.id === account.id ? account : item));
  } else {
    satkerAccounts = satkerAccounts.map((item) =>
      item.id === accountId ? { ...item, password: generateLocalPassword(), updatedAt: new Date().toISOString() } : item
    );
  }

  persistSatkerAccounts();
  renderSatkerAccounts();
}

function populateIkuYearSelect() {
  const select = document.querySelector("#ikuYearSelect");
  if (!select) return;

  const currentValue = select.value;
  const years = getPerformanceYears();
  select.innerHTML = years.map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`).join("");

  if (years.includes(currentValue)) {
    select.value = currentValue;
  } else if (years.includes("2026")) {
    select.value = "2026";
  }
}

function renderIkuSummary() {
  const summary = document.querySelector("#ikuSummary");
  if (!summary) return;
  const rows = getIkuRows();
  const counts = rows.reduce(
    (total, row) => {
      total[row.level] += 1;
      return total;
    },
    { strategic: 0, program: 0, activity: 0 }
  );

  summary.innerHTML = `
    <article class="iku-summary-item">
      <span>Sasaran Strategis</span>
      <strong>${counts.strategic}</strong>
    </article>
    <article class="iku-summary-item">
      <span>Sasaran Program</span>
      <strong>${counts.program}</strong>
    </article>
    <article class="iku-summary-item">
      <span>Sasaran Kegiatan</span>
      <strong>${counts.activity}</strong>
    </article>
    <article class="iku-summary-item">
      <span>Total Indikator</span>
      <strong>${rows.length}</strong>
    </article>
  `;
}

function renderIkuRows() {
  const tableRows = document.querySelector("#ikuRows");
  if (!tableRows) return;
  const selectedYear = document.querySelector("#ikuYearSelect")?.value || getPerformanceYears()[0] || "Tahun 1";
  const rows = getIkuRows();

  if (!rows.length) {
    tableRows.innerHTML = "<tr><td colspan=\"6\">Belum ada data IKU. Input atau impor Matriks Renstra terlebih dahulu.</td></tr>";
    renderIkuSummary();
    return;
  }

  tableRows.innerHTML = rows
    .map(({ item, level, indicator, indicatorIndex }) => {
      const yearIndex = getTargetIndexForYear(item, selectedYear);
      const formula = getIkuFormula(item, level, indicator);
      const key = getIkuFormulaKey(item, level, indicator);
      const isFormulaOpen = openIkuFormulaKeys.has(key);

      return `
        <tr>
          <td><span class="badge">${escapeHtml(getLevelLabel(level))}</span></td>
          <td>
            <strong>${escapeHtml(getSasaranByLevel(item, level))}</strong>
            <small>${escapeHtml(item.unit)} - ${escapeHtml(item.period)}</small>
          </td>
          <td>${escapeHtml(indicator.name)}</td>
          <td>
            <strong>${escapeHtml(selectedYear)}</strong>
            <span>${escapeHtml(indicator.targets[yearIndex] || indicator.targets[0] || "-")}</span>
          </td>
          <td>
            <div class="iku-formula-cell">
              <div class="iku-formula-head">
                <button class="icon-button eye-button" data-toggle-iku-formula data-iku-key="${escapeHtml(key)}" type="button" aria-label="${isFormulaOpen ? "Tutup formulasi" : "Buka formulasi"}">
                  ${renderEyeIcon(isFormulaOpen)}
                </button>
                <div>
                  <strong>Formulasi Perhitungan</strong>
                  <small>${escapeHtml(getIkuFormulaText(formula))}</small>
                </div>
              </div>
              <span class="iku-save-state">${formula.saved ? "Tersimpan" : "Belum disimpan"}</span>
            </div>
          </td>
          <td>
            <div class="iku-formula-panel ${isFormulaOpen ? "open" : ""}">
              <select data-iku-field="method" data-iku-key="${escapeHtml(key)}">
                <option value="percentage_manual" ${formula.method === "percentage_manual" ? "selected" : ""}>Persentase Manual</option>
                <option value="manual_value" ${formula.method === "manual_value" ? "selected" : ""}>Manual Nilai</option>
                <option value="percentage_api" ${formula.method === "percentage_api" ? "selected" : ""}>Persentase API</option>
                <option value="ai_generated" ${formula.method === "ai_generated" ? "selected" : ""}>Generate AI</option>
              </select>
              ${renderFormulaControls(key, formula)}
              <button class="ghost-button" data-save-iku-formula data-iku-key="${escapeHtml(key)}" type="button">Simpan Formulasi</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
  renderIkuSummary();
}

function refreshIkuViews() {
  populateIkuYearSelect();
  renderIkuRows();
}

function populatePerformanceYearSelect() {
  const select = document.querySelector("#performanceYearSelect");
  if (!select) return;

  const currentValue = select.value;
  const years = getPerformanceYears();
  select.innerHTML = years.map((year) => `<option value="${escapeHtml(year)}">${escapeHtml(year)}</option>`).join("");

  if (years.includes(currentValue)) {
    select.value = currentValue;
  } else if (years.includes("2026")) {
    select.value = "2026";
  }
}

function renderPerformanceTree() {
  const performanceTree = document.querySelector("#performanceTree");
  if (!performanceTree) return;
  const selectedYear = document.querySelector("#performanceYearSelect")?.value || getPerformanceYears()[0] || "Tahun 1";

  if (!renstraItems.length) {
    performanceTree.innerHTML = "<p class=\"helper-text\">Belum ada data Matriks Renstra untuk ditampilkan.</p>";
    return;
  }

  const unitName = renstraItems[0]?.unit || "Satuan Kerja";
  const period = renstraItems[0]?.period || "Renstra";
  const branches = renstraItems
    .map((item) => {
      const yearIndex = getTargetIndexForYear(item, selectedYear);

      return `
        <li class="org-program renstra-branch">
          <article class="tree-node strategic">
            <span class="node-level">Sasaran Strategis</span>
            <strong>${escapeHtml(item.strategic)}</strong>
            ${renderRenstraIndicatorsForYear(item.strategicIndicators, yearIndex, selectedYear)}
          </article>
          <ul class="org-activities">
            <li class="org-activity renstra-flow">
              <article class="tree-node program">
                <span class="node-level">Sasaran Program</span>
                <strong>${escapeHtml(item.program)}</strong>
                ${renderRenstraIndicatorsForYear(item.programIndicators, yearIndex, selectedYear)}
              </article>
              <article class="tree-node activity">
                <span class="node-level">Sasaran Kegiatan</span>
                <strong>${escapeHtml(item.activity)}</strong>
                <small>Penanggung jawab: ${escapeHtml(item.owner)}</small>
                ${renderRenstraIndicatorsForYear(item.activityIndicators, yearIndex, selectedYear)}
              </article>
            </li>
          </ul>
        </li>
      `;
    })
    .join("");

  performanceTree.innerHTML = `
    <section class="org-chart unified-tree">
      <div class="org-root">
        <article class="tree-node satker-root">
          <span class="node-level">Renstra Satuan Kerja</span>
          <strong>${escapeHtml(unitName)}</strong>
          <small>Periode ${escapeHtml(period)} - Target ${escapeHtml(selectedYear)}</small>
        </article>
      </div>
      <ul class="org-programs unified-branches">${branches}</ul>
    </section>
  `;
}

function populateCascadeSelects() {
  const strategicOptionsList = document.querySelector("#strategicOptions");
  const programOptionsList = document.querySelector("#programOptions");
  const strategicOptions = [...new Set(cascades.map((item) => item.strategic))];
  const programOptions = [...new Set(cascades.map((item) => item.program))];

  strategicOptionsList.innerHTML = strategicOptions
    .map((option) => `<option value="${escapeHtml(option)}"></option>`)
    .join("");

  programOptionsList.innerHTML = programOptions
    .map((option) => `<option value="${escapeHtml(option)}"></option>`)
    .join("");
}

function createIndicatorRow(type, indicator = "", target = "") {
  const list = document.querySelector(`[data-indicator-list="${type}"]`);
  const row = document.createElement("div");
  row.className = "indicator-row";
  row.innerHTML = `
    <label>
      Indikator
      <input name="${type}IndicatorName" value="${escapeHtml(indicator)}" placeholder="Nama indikator" required />
    </label>
    <label>
      Target
      <input name="${type}IndicatorTarget" value="${escapeHtml(target)}" placeholder="Target" required />
    </label>
    <button class="icon-button" data-remove-indicator type="button" aria-label="Hapus indikator">x</button>
  `;

  row.querySelector("[data-remove-indicator]").addEventListener("click", () => {
    if (list.children.length > 1) row.remove();
  });

  list.append(row);
}

function createSasaranRow(values = {}) {
  const list = document.querySelector("#additionalSasaranList");
  const row = document.createElement("div");
  row.className = "sasaran-row";
  row.innerHTML = `
    <label>
      Sasaran Strategis
      <input name="extraStrategic" value="${escapeHtml(values.strategic || "")}" list="strategicOptions" placeholder="Sasaran strategis" required />
    </label>
    <label>
      Sasaran Program
      <input name="extraProgram" value="${escapeHtml(values.program || "")}" list="programOptions" placeholder="Sasaran program" required />
    </label>
    <label>
      Sasaran Kegiatan
      <input name="extraActivity" value="${escapeHtml(values.activity || "")}" placeholder="Sasaran kegiatan" required />
    </label>
    <label>
      Penanggung Jawab
      <input name="extraOwner" value="${escapeHtml(values.owner || "")}" placeholder="Penanggung jawab" required />
    </label>
    <button class="icon-button" data-remove-sasaran type="button" aria-label="Hapus sasaran">x</button>
  `;

  row.querySelector("[data-remove-sasaran]").addEventListener("click", () => row.remove());
  list.append(row);
}

function createRenstraIndicatorRow(type, indicator = {}) {
  const list = document.querySelector(`[data-renstra-list="${type}"]`);
  const targets = indicator.targets || ["", "", "", "", ""];
  const row = document.createElement("div");
  row.className = "renstra-indicator-row";
  row.innerHTML = `
    <label>
      Indikator
      <input name="${type}RenstraIndicatorName" value="${escapeHtml(indicator.name || "")}" placeholder="Nama indikator" required />
    </label>
    ${targets
      .map(
        (target, index) => `
          <label>
            Tahun ${index + 1}
            <input name="${type}RenstraTarget${index + 1}" value="${escapeHtml(target)}" placeholder="Target" required />
          </label>
        `
      )
      .join("")}
    <button class="icon-button" data-remove-renstra-indicator type="button" aria-label="Hapus indikator">x</button>
  `;

  row.querySelector("[data-remove-renstra-indicator]").addEventListener("click", () => {
    if (list.children.length > 1) row.remove();
  });

  list.append(row);
}

function setRenstraIndicatorRows(type, indicators) {
  const list = document.querySelector(`[data-renstra-list="${type}"]`);
  list.innerHTML = "";
  indicators.forEach((indicator) => createRenstraIndicatorRow(type, indicator));
  if (!indicators.length) createRenstraIndicatorRow(type);
}

function resetRenstraIndicatorInputs() {
  document.querySelectorAll("[data-renstra-list]").forEach((list) => {
    list.innerHTML = "";
  });
  createRenstraIndicatorRow("strategic", { name: "Nilai SAKIP satuan kerja", targets: ["82", "84", "86", "88", "90"] });
  createRenstraIndicatorRow("program", { name: "Persentase program sesuai target", targets: ["90%", "92%", "94%", "96%", "100%"] });
  createRenstraIndicatorRow("activity", { name: "Jumlah output kegiatan", targets: ["4", "4", "4", "4", "4"] });
}

function collectRenstraIndicators(type) {
  return [...document.querySelectorAll(`[name="${type}RenstraIndicatorName"]`)]
    .map((input, index) => ({
      name: input.value.trim(),
      targets: [1, 2, 3, 4, 5].map(
        (year) => document.querySelectorAll(`[name="${type}RenstraTarget${year}"]`)[index].value.trim()
      ),
    }))
    .filter((indicator) => indicator.name && indicator.targets.every(Boolean));
}

function setIndicatorRows(type, indicators) {
  const list = document.querySelector(`[data-indicator-list="${type}"]`);
  list.innerHTML = "";
  indicators.forEach((indicator) => createIndicatorRow(type, indicator.name, indicator.target));
  if (!indicators.length) createIndicatorRow(type);
}

function resetIndicatorInputs() {
  document.querySelectorAll("[data-indicator-list]").forEach((list) => {
    list.innerHTML = "";
  });

  createIndicatorRow("strategic", "Nilai SAKIP satuan kerja", "88");
  createIndicatorRow("program", "Persentase program sesuai target", "95%");
  createIndicatorRow("activity", "Jumlah laporan monitoring tepat waktu", "4 laporan");
}

function collectIndicators(type) {
  const names = [...document.querySelectorAll(`[name="${type}IndicatorName"]`)];
  const targets = [...document.querySelectorAll(`[name="${type}IndicatorTarget"]`)];

  return names
    .map((input, index) => ({
      name: input.value.trim(),
      target: targets[index].value.trim(),
    }))
    .filter((indicator) => indicator.name && indicator.target);
}

function collectSasaranTargets(form) {
  const primary = {
    strategic: form.get("strategic").trim(),
    program: form.get("program").trim(),
    activity: form.get("activity").trim(),
    owner: form.get("owner").trim(),
  };
  const extras = [...document.querySelectorAll(".sasaran-row")].map((row) => ({
    strategic: row.querySelector('[name="extraStrategic"]').value.trim(),
    program: row.querySelector('[name="extraProgram"]').value.trim(),
    activity: row.querySelector('[name="extraActivity"]').value.trim(),
    owner: row.querySelector('[name="extraOwner"]').value.trim(),
  }));

  return [primary, ...extras].filter((item) => item.strategic && item.program && item.activity && item.owner);
}

function refreshCascadeViews() {
  renderPlans();
  populatePerformanceYearSelect();
  renderPerformanceTree();
  refreshIkuViews();
  populateCascadeSelects();
  populateAgreementCascadeSelect();
  populateAgreementIndicatorSelect();
  populateRealizationCascadeSelect();
  populateRealizationIndicatorSelect();
  renderRealizations();
  renderGoals();
  renderAgreementPreview();
  renderAgreements();
}

function resetCascadeForm() {
  document.querySelector("#cascadeForm").reset();
  document.querySelector("#editIndex").value = "";
  document.querySelector("#saveCascade").textContent = "Simpan Cascading";
  document.querySelector("#cancelEdit").hidden = true;
  editingIndex = null;
  document.querySelector("#additionalSasaranList").innerHTML = "";
  resetIndicatorInputs();
}

function fillCascadeForm(plan, index) {
  document.querySelector("#strategicInput").value = plan.strategic;
  document.querySelector("#programInput").value = plan.program;
  document.querySelector('[name="activity"]').value = plan.activity;
  document.querySelector('[name="owner"]').value = plan.owner;
  document.querySelector("#editIndex").value = index;
  document.querySelector("#saveCascade").textContent = "Simpan Perubahan";
  document.querySelector("#cancelEdit").hidden = false;
  editingIndex = index;
  document.querySelector("#additionalSasaranList").innerHTML = "";
  setIndicatorRows("strategic", plan.strategicIndicators);
  setIndicatorRows("program", plan.programIndicators);
  setIndicatorRows("activity", plan.activityIndicators);
  document.querySelector("#cascadeForm").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRenstraRows() {
  const rows = document.querySelector("#renstraRows");
  if (!rows) return;

  rows.innerHTML = renstraItems
    .map(
      (item, index) => `
        <tr>
          <td>
            <strong>${escapeHtml(item.period)}</strong>
            <br />
            <small>${escapeHtml(item.unit)}</small>
          </td>
          <td>${escapeHtml(item.strategic)}</td>
          <td>${renderRenstraIndicatorList(item.strategicIndicators)}</td>
          <td>${escapeHtml(item.program)}</td>
          <td>${renderRenstraIndicatorList(item.programIndicators)}</td>
          <td>${escapeHtml(item.activity)}</td>
          <td>${renderRenstraIndicatorList(item.activityIndicators)}</td>
          <td>${escapeHtml(item.owner)}</td>
          <td>
            <div class="row-actions">
              <button class="ghost-button" data-edit-renstra="${index}" type="button">Edit</button>
              <button class="ghost-button" data-copy-renstra="${index}" type="button">Kirim ke Rencana</button>
              <button class="ghost-button" data-delete-renstra="${index}" type="button">Hapus</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function resetRenstraForm() {
  document.querySelector("#renstraForm").reset();
  document.querySelector("#renstraEditIndex").value = "";
  document.querySelector("#saveRenstra").textContent = "Simpan Renstra";
  document.querySelector("#cancelRenstraEdit").hidden = true;
  editingRenstraIndex = null;
  resetRenstraIndicatorInputs();
}

function fillRenstraForm(item, index) {
  const form = document.querySelector("#renstraForm");
  form.elements.renstraPeriod.value = item.period;
  form.elements.renstraUnit.value = item.unit;
  form.elements.renstraStrategic.value = item.strategic;
  form.elements.renstraProgram.value = item.program;
  form.elements.renstraActivity.value = item.activity;
  form.elements.renstraOwner.value = item.owner;
  document.querySelector("#renstraEditIndex").value = index;
  document.querySelector("#saveRenstra").textContent = "Simpan Perubahan";
  document.querySelector("#cancelRenstraEdit").hidden = false;
  editingRenstraIndex = index;
  setRenstraIndicatorRows("strategic", item.strategicIndicators);
  setRenstraIndicatorRows("program", item.programIndicators);
  setRenstraIndicatorRows("activity", item.activityIndicators);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renstraToCascade(item) {
  return {
    strategic: item.strategic,
    strategicIndicators: item.strategicIndicators.map((indicator) => ({
      name: indicator.name,
      target: indicator.targets[0],
    })),
    program: item.program,
    programIndicators: item.programIndicators.map((indicator) => ({
      name: indicator.name,
      target: indicator.targets[0],
    })),
    activity: item.activity,
    activityIndicators: item.activityIndicators.map((indicator) => ({
      name: indicator.name,
      target: indicator.targets[0],
    })),
    owner: item.owner,
    status: "Dari Renstra",
  };
}

function populateRealizationCascadeSelect() {
  const agreementSelect = document.querySelector("#realizationAgreementSelect");
  const select = document.querySelector("#realizationCascadeSelect");
  if (!agreementSelect || !select) return;

  const signedAgreements = getSignedAgreementEntries();
  const currentValue = agreementSelect.value;
  agreementSelect.innerHTML = signedAgreements.length
    ? signedAgreements
        .map(
          ({ agreement, index }) =>
            `<option value="${index}">${escapeHtml(agreement.number)} - ${escapeHtml(agreement.employeeName)}</option>`
        )
        .join("")
    : "<option value=\"\">Belum ada PK ditandatangani</option>";

  if (signedAgreements.some(({ index }) => String(index) === currentValue)) {
    agreementSelect.value = currentValue;
  }

  const { agreement } = getSelectedSignedAgreement();
  const plan = getAgreementPlan(agreement);
  select.innerHTML = agreement && plan
    ? `<option value="${agreement.cascadeIndex}">${escapeHtml(getSasaranByLevel(plan, agreement.indicatorLevel))}</option>`
    : "";
}

function populateRealizationIndicatorSelect() {
  const agreementSelect = document.querySelector("#realizationAgreementSelect");
  const cascadeSelect = document.querySelector("#realizationCascadeSelect");
  const levelSelect = document.querySelector("#realizationLevelSelect");
  const indicatorSelect = document.querySelector("#realizationIndicatorSelect");
  if (!agreementSelect || !cascadeSelect || !levelSelect || !indicatorSelect) return;

  const { agreement } = getSelectedSignedAgreement();
  const plan = getAgreementPlan(agreement);
  const indicator = getAgreementIndicator(agreement);
  levelSelect.innerHTML = agreement
    ? `<option value="${agreement.indicatorLevel}">${escapeHtml(getLevelLabel(agreement.indicatorLevel))}</option>`
    : "";
  cascadeSelect.innerHTML = agreement && plan
    ? `<option value="${agreement.cascadeIndex}">${escapeHtml(getSasaranByLevel(plan, agreement.indicatorLevel))}</option>`
    : "";
  indicatorSelect.innerHTML = agreement
    ? `<option value="${agreement.indicatorIndex}">${escapeHtml(indicator.name)} - Target ${escapeHtml(agreement.target || indicator.target)}</option>`
    : "";
}

function renderRealizations() {
  const rows = document.querySelector("#realizationRows");
  if (!rows) return;

  const signedRealizations = realizations
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => agreements[item.agreementIndex]?.status === "Ditandatangani");

  if (!signedRealizations.length) {
    rows.innerHTML = `
      <tr>
        <td colspan="9">Belum ada realisasi dari Perjanjian Kinerja yang sudah ditandatangani.</td>
      </tr>
    `;
    renderMonevMonitoring();
    return;
  }

  rows.innerHTML = signedRealizations
    .map(({ item, index }) => {
      const agreement = agreements[item.agreementIndex];
      const plan = getAgreementPlan(agreement);
      const indicator = getAgreementIndicator(agreement);
      const sasaran = getSasaranByLevel(plan, agreement?.indicatorLevel || "activity");

      return `
        <tr>
          <td>${escapeHtml(item.quarter)}</td>
          <td>${escapeHtml(sasaran || "-")}</td>
          <td>${escapeHtml(getLevelLabel(agreement?.indicatorLevel || "activity"))}</td>
          <td>${escapeHtml(indicator.name)}</td>
          <td>${escapeHtml(agreement?.target || indicator.target)}</td>
          <td><strong>${escapeHtml(item.achievement)}</strong></td>
          <td>${currency(item.budget)}</td>
          <td>${escapeHtml(item.note || "-")}</td>
          <td>
            <div class="row-actions">
              <button class="ghost-button" data-delete-realization="${index}" type="button">Hapus</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
  renderMonevMonitoring();
}

function normalizeKey(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replaceAll(" ", "_")
    .replaceAll("-", "_");
}

function getField(row, aliases) {
  const normalized = Object.fromEntries(Object.entries(row).map(([key, value]) => [normalizeKey(key), value]));
  return aliases.map(normalizeKey).map((key) => normalized[key]).find((value) => String(value || "").trim()) || "";
}

function splitDelimitedLine(line, delimiter) {
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && nextCharacter === '"') {
      cell += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === delimiter && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }

  cells.push(cell.trim());
  return cells;
}

const renstraTemplateHeaders = [
  "periode",
  "unit",
  "sasaran_strategis",
  "indikator_strategis",
  "target_strategis_t1",
  "target_strategis_t2",
  "target_strategis_t3",
  "target_strategis_t4",
  "target_strategis_t5",
  "sasaran_program",
  "indikator_program",
  "target_program_t1",
  "target_program_t2",
  "target_program_t3",
  "target_program_t4",
  "target_program_t5",
  "sasaran_kegiatan",
  "indikator_kegiatan",
  "target_kegiatan_t1",
  "target_kegiatan_t2",
  "target_kegiatan_t3",
  "target_kegiatan_t4",
  "target_kegiatan_t5",
  "penanggung_jawab",
];

const renstraTemplateRows = [
  {
    periode: "2026-2030",
    unit: "Kejaksaan Negeri Contoh",
    sasaran_strategis: "Meningkatnya akuntabilitas kinerja satuan kerja",
    indikator_strategis: "Nilai SAKIP satuan kerja|Persentase rekomendasi evaluasi ditindaklanjuti",
    target_strategis_t1: "82|80%",
    target_strategis_t2: "84|85%",
    target_strategis_t3: "86|90%",
    target_strategis_t4: "88|95%",
    target_strategis_t5: "90|100%",
    sasaran_program: "Meningkatnya kualitas perencanaan dan pelaporan kinerja",
    indikator_program: "Persentase dokumen kinerja tepat waktu",
    target_program_t1: "90%",
    target_program_t2: "92%",
    target_program_t3: "94%",
    target_program_t4: "96%",
    target_program_t5: "100%",
    sasaran_kegiatan: "Penyusunan laporan kinerja triwulanan",
    indikator_kegiatan: "Jumlah laporan monitoring tepat waktu",
    target_kegiatan_t1: "4 laporan",
    target_kegiatan_t2: "4 laporan",
    target_kegiatan_t3: "4 laporan",
    target_kegiatan_t4: "4 laporan",
    target_kegiatan_t5: "4 laporan",
    penanggung_jawab: "Subbag Pembinaan",
  },
];

function detectDelimiter(header) {
  const options = ["\t", ";", ","];
  return options.reduce(
    (best, delimiter) => {
      const count = header.split(delimiter).length;
      return count > best.count ? { delimiter, count } : best;
    },
    { delimiter: "\t", count: 0 }
  ).delimiter;
}

function parseMatrixText(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : parsed.rows || parsed.data || [];
  }

  const lines = trimmed.split(/\r?\n/).filter(Boolean);
  const delimiter = detectDelimiter(lines[0]);
  const headers = splitDelimitedLine(lines[0], delimiter);

  return lines.slice(1).map((line) => {
    const cells = splitDelimitedLine(line, delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""]));
  });
}

function escapeDelimitedValue(value, delimiter) {
  const text = String(value ?? "");
  if (text.includes("\"") || text.includes("\n") || text.includes("\r") || text.includes(delimiter)) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

function buildDelimitedTemplate(delimiter) {
  const lines = [
    renstraTemplateHeaders.join(delimiter),
    ...renstraTemplateRows.map((row) =>
      renstraTemplateHeaders.map((header) => escapeDelimitedValue(row[header], delimiter)).join(delimiter)
    ),
  ];
  return lines.join("\r\n");
}

function downloadBlob(filename, content, type) {
  const blob = content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildExcelHtmlTemplate() {
  const headerCells = renstraTemplateHeaders.map((header) => `<th>${escapeHtml(header)}</th>`).join("");
  const rows = renstraTemplateRows
    .map((row) => `<tr>${renstraTemplateHeaders.map((header) => `<td>${escapeHtml(row[header])}</td>`).join("")}</tr>`)
    .join("");
  return `
    <html>
      <head><meta charset="utf-8" /></head>
      <body>
        <table>
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `;
}

function buildPdfTemplate() {
  const rows = [renstraTemplateHeaders, ...renstraTemplateRows.map((row) => renstraTemplateHeaders.map((header) => row[header]))];
  const lines = [
    "Template Matriks Renstra",
    "Gunakan header berikut agar ekstraksi otomatis akurat.",
    ...rows.map((row) => row.join("\t")),
  ];
  const escapePdf = (value) => String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
  const stream = [
    "BT",
    "/F1 7 Tf",
    "36 800 Td",
    ...lines.flatMap((line, index) => [`(${escapePdf(line.slice(0, 220))}) Tj`, index === lines.length - 1 ? "" : "0 -18 Td"]),
    "ET",
  ]
    .filter(Boolean)
    .join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object) => {
    offsets.push(pdf.length);
    pdf += object;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function downloadRenstraTemplate(format) {
  if (format === "csv") {
    downloadBlob("template-matriks-renstra.csv", buildDelimitedTemplate(","), "text/csv;charset=utf-8");
    return;
  }

  if (format === "tsv" || format === "txt") {
    downloadBlob(`template-matriks-renstra.${format}`, buildDelimitedTemplate("\t"), "text/plain;charset=utf-8");
    return;
  }

  if (format === "json") {
    downloadBlob(
      "template-matriks-renstra.json",
      JSON.stringify({ rows: renstraTemplateRows }, null, 2),
      "application/json;charset=utf-8"
    );
    return;
  }

  if (format === "xlsx" && window.XLSX) {
    const worksheet = window.XLSX.utils.json_to_sheet(renstraTemplateRows, { header: renstraTemplateHeaders });
    const workbook = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(workbook, worksheet, "Matriks Renstra");
    window.XLSX.writeFile(workbook, "template-matriks-renstra.xlsx");
    return;
  }

  if (format === "xls") {
    downloadBlob("template-matriks-renstra.xls", buildExcelHtmlTemplate(), "application/vnd.ms-excel;charset=utf-8");
    return;
  }

  if (format === "pdf") {
    downloadBlob("template-matriks-renstra.pdf", buildPdfTemplate(), "application/pdf");
    return;
  }

  alert("Format Excel .xlsx membutuhkan SheetJS. Pastikan browser terhubung internet, atau pilih format XLS/CSV/JSON.");
}

function indicatorsFromColumns(row, indicatorAliases, targetAliases) {
  const indicatorText = getField(row, indicatorAliases);
  const targetText = getField(row, targetAliases);
  const indicators = indicatorText.split("|").map((value) => value.trim()).filter(Boolean);
  const targets = targetText.split("|").map((value) => value.trim()).filter(Boolean);

  return indicators.map((indicator, index) => ({
    name: indicator,
    target: targets[index] || targets[0] || "-",
  }));
}

function renstraIndicatorsFromColumns(row, indicatorAliases, targetPrefixAliases) {
  const indicatorText = getField(row, indicatorAliases);
  const indicators = indicatorText.split("|").map((value) => value.trim()).filter(Boolean);

  return indicators.map((indicator, indicatorIndex) => ({
    name: indicator,
    targets: [1, 2, 3, 4, 5].map((year) => {
      const targetText = getField(
        row,
        targetPrefixAliases.flatMap((prefix) => [
          `${prefix}_t${year}`,
          `${prefix}_tahun_${year}`,
          `${prefix}_tahun${year}`,
          `${prefix}_${year}`,
        ])
      );
      const values = targetText.split("|").map((value) => value.trim()).filter(Boolean);
      return values[indicatorIndex] || values[0] || "-";
    }),
  }));
}

function addUniqueIndicators(existing, incoming) {
  incoming.forEach((indicator) => {
    const exists = existing.some((item) => item.name === indicator.name && item.target === indicator.target);
    if (!exists) existing.push(indicator);
  });
}

function addUniqueRenstraIndicators(existing, incoming) {
  incoming.forEach((indicator) => {
    const exists = existing.some(
      (item) => item.name === indicator.name && item.targets.join("|") === indicator.targets.join("|")
    );
    if (!exists) existing.push(indicator);
  });
}

function extractCascadesFromRows(rows) {
  const grouped = new Map();

  rows.forEach((row) => {
    const strategic = getField(row, ["sasaran_strategis", "strategis", "ss"]);
    const program = getField(row, ["sasaran_program", "program", "sp"]);
    const activity = getField(row, ["sasaran_kegiatan", "kegiatan", "sk"]);
    const owner = getField(row, ["penanggung_jawab", "owner", "unit", "bidang"]) || "-";

    if (!strategic || !program || !activity) return;

    const key = [strategic, program, activity, owner].join("||");
    if (!grouped.has(key)) {
      grouped.set(key, {
        strategic,
        strategicIndicators: [],
        program,
        programIndicators: [],
        activity,
        activityIndicators: [],
        owner,
        status: "Impor",
      });
    }

    const plan = grouped.get(key);
    addUniqueIndicators(
      plan.strategicIndicators,
      indicatorsFromColumns(row, ["indikator_strategis", "indikator_ss", "iku_strategis"], ["target_strategis", "target_ss"])
    );
    addUniqueIndicators(
      plan.programIndicators,
      indicatorsFromColumns(row, ["indikator_program", "indikator_sp", "iku_program"], ["target_program", "target_sp"])
    );
    addUniqueIndicators(
      plan.activityIndicators,
      indicatorsFromColumns(row, ["indikator_kegiatan", "indikator_sk", "iku_kegiatan"], ["target_kegiatan", "target_sk"])
    );
  });

  return [...grouped.values()].filter(
    (plan) => plan.strategicIndicators.length && plan.programIndicators.length && plan.activityIndicators.length
  );
}

function extractRenstraFromRows(rows) {
  const grouped = new Map();

  rows.forEach((row) => {
    const period = getField(row, ["periode", "periode_renstra", "renstra_period"]) || "2026-2030";
    const unit = getField(row, ["unit", "satuan_kerja", "satker"]) || "Satuan Kerja";
    const strategic = getField(row, ["sasaran_strategis", "strategis", "ss"]);
    const program = getField(row, ["sasaran_program", "program", "sp"]);
    const activity = getField(row, ["sasaran_kegiatan", "kegiatan", "sk"]);
    const owner = getField(row, ["penanggung_jawab", "owner", "bidang", "unit_pengampu"]) || "-";

    if (!strategic || !program || !activity) return;

    const key = [period, unit, strategic, program, activity, owner].join("||");
    if (!grouped.has(key)) {
      grouped.set(key, {
        period,
        unit,
        strategic,
        program,
        activity,
        owner,
        strategicIndicators: [],
        programIndicators: [],
        activityIndicators: [],
      });
    }

    const item = grouped.get(key);
    addUniqueRenstraIndicators(
      item.strategicIndicators,
      renstraIndicatorsFromColumns(
        row,
        ["indikator_strategis", "indikator_ss", "iku_strategis"],
        ["target_strategis", "target_ss"]
      )
    );
    addUniqueRenstraIndicators(
      item.programIndicators,
      renstraIndicatorsFromColumns(
        row,
        ["indikator_program", "indikator_sp", "iku_program"],
        ["target_program", "target_sp"]
      )
    );
    addUniqueRenstraIndicators(
      item.activityIndicators,
      renstraIndicatorsFromColumns(
        row,
        ["indikator_kegiatan", "indikator_sk", "iku_kegiatan"],
        ["target_kegiatan", "target_sk"]
      )
    );
  });

  return [...grouped.values()].filter(
    (item) => item.strategicIndicators.length && item.programIndicators.length && item.activityIndicators.length
  );
}

async function extractPdfText(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF.js belum termuat. Pastikan browser terhubung internet, lalu muat ulang halaman.");
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const lines = content.items.reduce((groups, item) => {
      const y = Math.round(item.transform[5]);
      const line = groups.get(y) || [];
      line.push(item);
      groups.set(y, line);
      return groups;
    }, new Map());
    pages.push(
      [...lines.entries()]
        .sort((left, right) => right[0] - left[0])
        .map(([, items]) =>
          items
            .sort((left, right) => left.transform[4] - right.transform[4])
            .map((item) => item.str)
            .join("\t")
        )
        .join("\n")
    );
  }

  return pages.join("\n");
}

async function extractExcelText(file) {
  if (!window.XLSX) {
    throw new Error("SheetJS belum termuat. Pastikan browser terhubung internet, lalu muat ulang halaman.");
  }

  const buffer = await file.arrayBuffer();
  const workbook = window.XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("Workbook Excel tidak memiliki sheet.");
  }

  const sheet = workbook.Sheets[firstSheetName];
  return window.XLSX.utils.sheet_to_csv(sheet, { FS: "\t" });
}

function formatCascadeLabel(plan, index) {
  return `${index + 1}. ${plan.strategic} / ${plan.program} / ${plan.activity}`;
}

function populateAgreementCascadeSelect() {
  const select = document.querySelector("#agreementCascadeSelect");
  if (!select) return;

  select.innerHTML = cascades
    .map((plan, index) => `<option value="${index}">${escapeHtml(formatCascadeLabel(plan, index))}</option>`)
    .join("");
}

function populateAgreementIndicatorSelect() {
  const cascadeSelect = document.querySelector("#agreementCascadeSelect");
  const levelSelect = document.querySelector("#agreementLevelSelect");
  const indicatorSelect = document.querySelector("#agreementIndicatorSelect");
  const targetInput = document.querySelector("#agreementTargetInput");
  if (!cascadeSelect || !levelSelect || !indicatorSelect || !targetInput) return;

  const plan = cascades[Number(cascadeSelect.value)] || cascades[0];
  const indicators = getIndicatorsByLevel(plan, levelSelect.value);
  const previousValue = indicatorSelect.value;
  indicatorSelect.innerHTML = indicators
    .map((indicator, index) => `<option value="${index}">${escapeHtml(indicator.name)}</option>`)
    .join("");

  if (indicators[Number(previousValue)]) indicatorSelect.value = previousValue;
  const selected = indicators[Number(indicatorSelect.value)] || indicators[0];
  targetInput.value = selected?.target || "";
}

function renderAgreementPreview() {
  const preview = document.querySelector("#agreementPreview");
  const select = document.querySelector("#agreementCascadeSelect");
  if (!preview || !select) return;

  const plan = cascades[Number(select.value)] || cascades[0];
  const level = document.querySelector("#agreementLevelSelect")?.value || "activity";
  const indicatorIndex = Number(document.querySelector("#agreementIndicatorSelect")?.value || 0);
  const indicator = getIndicatorsByLevel(plan, level)[indicatorIndex] || { name: "-", target: "-" };
  const target = document.querySelector("#agreementTargetInput")?.value || indicator.target;
  if (!plan) {
    preview.innerHTML = "<p class=\"helper-text\">Belum ada sasaran kinerja yang tersedia.</p>";
    return;
  }

  preview.innerHTML = `
    <div class="agreement-summary">
      <strong>${escapeHtml(getSasaranByLevel(plan, level))}</strong>
      <span>${escapeHtml(getLevelLabel(level))}</span>
    </div>
    <div class="agreement-summary">
      <strong>${escapeHtml(indicator.name)}</strong>
      <span>Target tahunan: ${escapeHtml(target)}</span>
    </div>
  `;
}

function renderAgreements() {
  const rows = document.querySelector("#agreementRows");
  if (!rows) return;

  rows.innerHTML = agreements
    .map((agreement, index) => {
      const plan = getAgreementPlan(agreement);
      const indicator = getAgreementIndicator(agreement);
      return `
        <tr>
          <td>
            <strong>${escapeHtml(agreement.number)}</strong>
            <br />
            <small>${escapeHtml(agreement.period)}</small>
          </td>
          <td>
            <strong>${escapeHtml(agreement.supervisorName)}</strong>
            <br />
            <small>${escapeHtml(agreement.supervisorPosition)}</small>
          </td>
          <td>
            <strong>${escapeHtml(agreement.employeeName)}</strong>
            <br />
            <small>${escapeHtml(agreement.employeePosition)}</small>
          </td>
          <td>${plan ? escapeHtml(getSasaranByLevel(plan, agreement.indicatorLevel)) : "-"}</td>
          <td>${escapeHtml(getLevelLabel(agreement.indicatorLevel))}</td>
          <td>${escapeHtml(indicator.name)}</td>
          <td><strong>${escapeHtml(agreement.target || indicator.target)}</strong></td>
          <td><span class="badge">${escapeHtml(agreement.status)}</span></td>
          <td>
            <div class="row-actions">
              <button class="ghost-button" data-edit-agreement="${index}" type="button">Edit</button>
              <button class="ghost-button" data-sign-agreement="${index}" type="button">Tanda Tangan</button>
              <button class="ghost-button" data-delete-agreement="${index}" type="button">Hapus</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function resetAgreementForm() {
  document.querySelector("#agreementForm").reset();
  document.querySelector("#agreementEditIndex").value = "";
  document.querySelector("#saveAgreement").textContent = "Simpan Perjanjian";
  document.querySelector("#cancelAgreementEdit").hidden = true;
  editingAgreementIndex = null;
  populateAgreementIndicatorSelect();
  renderAgreementPreview();
}

function fillAgreementForm(agreement, index) {
  const form = document.querySelector("#agreementForm");
  form.elements.agreementNumber.value = agreement.number;
  form.elements.agreementPeriod.value = agreement.period;
  form.elements.supervisorName.value = agreement.supervisorName;
  form.elements.supervisorPosition.value = agreement.supervisorPosition;
  form.elements.employeeName.value = agreement.employeeName;
  form.elements.employeePosition.value = agreement.employeePosition;
  form.elements.agreementCascade.value = agreement.cascadeIndex;
  form.elements.agreementLevel.value = agreement.indicatorLevel || "activity";
  populateAgreementIndicatorSelect();
  form.elements.agreementIndicator.value = agreement.indicatorIndex || 0;
  form.elements.agreementTarget.value = agreement.target || getAgreementIndicator(agreement).target;
  document.querySelector("#agreementEditIndex").value = index;
  document.querySelector("#saveAgreement").textContent = "Simpan Perubahan";
  document.querySelector("#cancelAgreementEdit").hidden = false;
  editingAgreementIndex = index;
  renderAgreementPreview();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

const akipState = {
  workbook: null,
  model: null,
  answers: {},
  notes: {},
  guideSelections: {},
};

function akipCell(sheet, row, column) {
  return sheet[XLSX.utils.encode_cell({ r: row - 1, c: column - 1 })];
}

function akipText(sheet, row, column) {
  const cell = akipCell(sheet, row, column);
  if (cell?.w !== undefined && cell?.w !== null) return String(cell.w).trim();
  if (cell?.v !== undefined && cell?.v !== null) return String(cell.v).trim();
  return "";
}

function akipDirectText(sheet, row, column) {
  const cell = akipCell(sheet, row, column);
  if (cell?.w !== undefined && cell?.w !== null) return String(cell.w).trim();
  if (cell?.v !== undefined && cell?.v !== null) return String(cell.v).trim();
  return "";
}

function akipMergedText(sheet, row, column) {
  const ownText = akipDirectText(sheet, row, column);
  if (ownText) return ownText;

  const merges = sheet["!merges"] || [];
  const merge = merges.find(
    (item) => row - 1 >= item.s.r && row - 1 <= item.e.r && column - 1 >= item.s.c && column - 1 <= item.e.c
  );
  if (!merge) return "";

  return akipDirectText(sheet, merge.s.r + 1, merge.s.c + 1);
}

function normalizeAkipText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[._-]+/g, " ")
    .trim();
}

function akipNumber(value) {
  const cleaned = String(value ?? "")
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseAkipFormulaNumber(value) {
  const source = String(value || "").trim();
  if (source.includes("/")) {
    const [left, right] = source.split("/").map(Number);
    return right ? left / right : 0;
  }
  return Number(source) || 0;
}

function parseAkipOptions(formula) {
  const source = String(formula || "").replace("_xlfn.", "");
  if (/\/100\b/.test(source)) return { type: "percent", options: [] };
  const options = [...source.matchAll(/"([^"]+)"\s*,\s*([^,)]+)/g)].map((match) => ({
    label: match[1],
    score: parseAkipFormulaNumber(match[2]),
  }));
  return { type: "choice", options };
}

function parseAkipOptionsFromGuide(guide) {
  const text = String(guide || "").replace(/\s+/g, " ").trim();
  const labels = ["AA", "A", "BB", "B", "CC", "C", "D", "E", "YA", "TIDAK", "MEMADAI", "BELUM MEMADAI"];
  const found = labels.filter((label) => new RegExp(`(?:^|\\b)${label}(?:\\b|\\s*[:：])`, "i").test(text));
  const unique = [...new Set(found)];
  const scoreMap = {
    AA: 1,
    A: 1,
    BB: 0.9,
    B: 0.8,
    CC: 0.6,
    C: 0.4,
    D: 0.2,
    E: 0,
    YA: 1,
    TIDAK: 0,
    MEMADAI: 1,
    "BELUM MEMADAI": 0,
  };
  if (unique.length >= 2) return { type: "choice", options: unique.map((label) => ({ label, score: scoreMap[label] ?? 0 })) };
  return { type: "percent", options: [] };
}

function getAkipFormulaOrValue(sheet, row, column) {
  const cell = akipCell(sheet, row, column);
  if (!cell) return "";
  return cell.f || cell.v || cell.w || "";
}

function akipColumnHasFormula(sheet, range, column) {
  for (let row = 1; row <= range.e.r + 1; row += 1) {
    if (akipCell(sheet, row, column)?.f) return true;
  }
  return false;
}

function findAkipLayout(sheet) {
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  const fallback = {
    no: 1,
    title: 2,
    weight: 3,
    evidence: 4,
    subtotal: 5,
    pm: 7,
    evaluation: 8,
    guide: 9,
    note: 10,
  };

  let best = { score: 0, row: 1, columns: { ...fallback } };
  const maxHeaderRow = Math.min(range.e.r + 1, 40);
  const maxColumn = range.e.c + 1;

  for (let row = 1; row <= maxHeaderRow; row += 1) {
    const columns = {};
    let score = 0;

    for (let column = 1; column <= maxColumn; column += 1) {
      const header = normalizeAkipText(
        [akipMergedText(sheet, row - 1, column), akipMergedText(sheet, row, column), akipMergedText(sheet, row + 1, column)]
          .filter(Boolean)
          .join(" ")
      );

      if (!header) continue;
      if (!columns.no && /(^|\s)(no|nomor)(\s|$)/.test(header)) {
        columns.no = column;
        score += 1;
      }
      if (!columns.title && /(komponen|sub komponen|kriteria|uraian|pertanyaan)/.test(header)) {
        columns.title = column;
        score += 2;
      }
      if (!columns.weight && /(bobot|nilai maksimal|maksimal)/.test(header)) {
        columns.weight = column;
        score += 1;
      }
      if (!columns.evidence && /(bukti|evidence|data dukung|dokumen)/.test(header)) {
        columns.evidence = column;
        score += 1;
      }
      if (!columns.pm && /(nilai pm|penilaian mandiri|pm)/.test(header)) {
        columns.pm = column;
        score += 1;
      }
      if (!columns.evaluation && /(nilai evaluasi|evaluasi|evaluator)/.test(header) && !/(range|keterangan)/.test(header)) {
        columns.evaluation = column;
        score += 1;
      }
      if (!columns.guide && /(range|keterangan nilai|pedoman|kriteria penilaian)/.test(header)) {
        columns.guide = column;
        score += 1;
      }
      if (!columns.note && /(catatan|link|rekomendasi|tindak lanjut)/.test(header)) {
        columns.note = column;
        score += 1;
      }
    }

    if (score > best.score) best = { score, row, columns: { ...fallback, ...columns } };
  }

  const formulaColumns = [];
  for (let column = 1; column <= maxColumn; column += 1) {
    if (akipColumnHasFormula(sheet, range, column)) formulaColumns.push(column);
  }

  if (!formulaColumns.includes(best.columns.pm) && formulaColumns[0]) best.columns.pm = formulaColumns[0];
  if (!formulaColumns.includes(best.columns.evaluation) && formulaColumns[1]) best.columns.evaluation = formulaColumns[1];

  return { headerRow: best.row, columns: best.columns };
}

function sheetLooksLikeAkip(sheet) {
  if (!sheet?.["!ref"]) return false;
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  const maxRow = Math.min(range.e.r + 1, 60);
  const maxColumn = range.e.c + 1;
  let hits = 0;

  for (let row = 1; row <= maxRow; row += 1) {
    for (let column = 1; column <= maxColumn; column += 1) {
      const text = normalizeAkipText(akipMergedText(sheet, row, column));
      if (!text) continue;
      if (/(lembar kerja evaluasi|lke|akip|akuntabilitas kinerja|komponen|sub komponen|bobot|nilai pm|evaluasi)/.test(text)) {
        hits += 1;
      }
    }
  }

  return hits >= 4;
}

function getAkipSheetNames(workbook) {
  const contentMatches = workbook.SheetNames.filter((name) => sheetLooksLikeAkip(workbook.Sheets[name]));
  const nameMatches = workbook.SheetNames.filter((name) => /lke|akip|evaluasi/i.test(name));
  return [...new Set([...contentMatches, ...nameMatches])];
}

function scoreAkipAnswer(formula, answer) {
  const rule = parseAkipOptions(formula);
  if (rule.type === "percent") return Math.max(0, Math.min(1, akipNumber(answer) / 100));
  const found = rule.options.find((option) => option.label === answer);
  return found ? found.score : 0;
}

function scoreAkipCriterionAnswer(criterion, field) {
  const key = `${criterion.row}:${field}`;
  const answer = akipState.answers[key];
  const formula = field === "pm" ? criterion.formulaPm : criterion.formulaEval;
  const formulaScore = scoreAkipAnswer(formula, answer);
  if (formula || criterion.type === "percent" || !answer) return formulaScore;
  return criterion.optionScores?.[answer] ?? 0;
}

function parseAkipSheet(sheetName) {
  const sheet = akipState.workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  const layout = findAkipLayout(sheet);
  const columns = layout.columns;
  const components = [];
  let currentComponent = null;
  let currentSubcomponent = null;

  for (let row = Math.max(1, layout.headerRow); row <= range.e.r + 1; row += 1) {
    const no = akipMergedText(sheet, row, columns.no);
    const title = akipMergedText(sheet, row, columns.title);
    const weight = akipNumber(akipMergedText(sheet, row, columns.weight));
    const formulaPm = akipCell(sheet, row, columns.pm)?.f || "";
    const formulaEval = akipCell(sheet, row, columns.evaluation)?.f || "";
    const subtotalFormula =
      akipCell(sheet, row, columns.subtotal)?.f ||
      akipCell(sheet, row, columns.pm)?.f ||
      akipCell(sheet, row, columns.evaluation)?.f ||
      "";
    const compactNo = String(no).replace(/\s+/g, "");
    const hasFormula = Boolean(formulaPm || formulaEval);
    const normalizedTitle = normalizeAkipText(title);

    if (!no && !title && !weight && !hasFormula) continue;
    if (/^(no|nomor)$/i.test(String(no).trim()) || /komponen|kriteria|uraian/i.test(title)) continue;

    if (/^\d+$/.test(compactNo) && title && weight && !hasFormula) {
      currentComponent = { row, no, title, weight, subcomponents: [], pm: 0, evaluation: 0 };
      components.push(currentComponent);
      currentSubcomponent = null;
      continue;
    }

    if (/^\d+\.[a-z0-9]+\.?$/i.test(compactNo) && title && weight && !hasFormula) {
      if (!currentComponent) {
        currentComponent = { row, no: String(compactNo).split(".")[0] || "1", title: "Komponen AKIP", weight: 0, subcomponents: [], pm: 0, evaluation: 0 };
        components.push(currentComponent);
      }
      currentSubcomponent = { row, no, title, weight, criteria: [], formula: "", pm: 0, evaluation: 0 };
      currentComponent?.subcomponents.push(currentSubcomponent);
      continue;
    }

    if (/nilai sub komponen|subtotal|jumlah/i.test(`${no} ${title}`) && currentSubcomponent) {
      currentSubcomponent.formula = subtotalFormula;
      continue;
    }

    const looksLikeCriterion =
      hasFormula ||
      (/^\d+\.[a-z0-9]+\.\d+/i.test(compactNo) && title) ||
      (currentSubcomponent && title && !weight && !/nilai sub komponen|subtotal|jumlah/i.test(normalizedTitle));

    if (looksLikeCriterion && currentSubcomponent) {
      const guide = akipMergedText(sheet, row, columns.guide);
      const formulaRule = parseAkipOptions(formulaPm || formulaEval);
      const fallbackRule = parseAkipOptionsFromGuide(guide);
      const rule = formulaRule.options.length || formulaRule.type === "percent" ? formulaRule : fallbackRule;
      currentSubcomponent.criteria.push({
        row,
        no,
        title,
        evidence: akipMergedText(sheet, row, columns.evidence),
        guide,
        note: akipMergedText(sheet, row, columns.note),
        formulaPm: formulaPm || getAkipFormulaOrValue(sheet, row, columns.pm),
        formulaEval: formulaEval || getAkipFormulaOrValue(sheet, row, columns.evaluation),
        type: rule.type,
        options: rule.options.map((option) => option.label),
        optionScores: Object.fromEntries(rule.options.map((option) => [option.label, option.score])),
      });
    }
  }

  return { sheetName, layout, components };
}

function calculateAkipSubcomponent(subcomponent, field) {
  const columnIndex = field === "pm" ? akipState.model?.layout?.columns?.pm : akipState.model?.layout?.columns?.evaluation;
  const column = XLSX.utils.encode_col((columnIndex || (field === "pm" ? 7 : 8)) - 1);
  const scores = subcomponent.criteria.map((criterion) => {
    return { row: criterion.row, score: scoreAkipCriterionAnswer(criterion, field) };
  });
  const formula = String(subcomponent.formula || "").replaceAll("$", "");
  const rangeMatch = formula.match(new RegExp(`${column}(\\d+):${column}(\\d+)`));
  const selectedScores = rangeMatch
    ? scores.filter((item) => item.row >= Number(rangeMatch[1]) && item.row <= Number(rangeMatch[2]))
    : scores;
  const totalScore = selectedScores.reduce((sum, item) => sum + item.score, 0);
  const weightMatch = formula.match(/\*C(\d+)/);
  const weight = weightMatch ? subcomponent.weight : subcomponent.weight;

  if (/AVERAGE/i.test(formula)) {
    return selectedScores.length ? (totalScore / selectedScores.length) * weight : 0;
  }

  const denominator = selectedScores.length;
  return denominator ? (totalScore / denominator) * weight : 0;
}

function akipPredicate(score) {
  if (score > 90) return "AA";
  if (score > 80) return "A";
  if (score > 70) return "BB";
  if (score > 60) return "B";
  if (score > 50) return "CC";
  if (score > 30) return "C";
  return "D";
}

function calculateAkipModel() {
  const model = akipState.model;
  if (!model) return { pm: 0, evaluation: 0 };

  model.components.forEach((component) => {
    component.subcomponents.forEach((subcomponent) => {
      subcomponent.pm = calculateAkipSubcomponent(subcomponent, "pm");
      subcomponent.evaluation = calculateAkipSubcomponent(subcomponent, "evaluation");
    });
    component.pm = subcomponentTotal(component.subcomponents, "pm");
    component.evaluation = subcomponentTotal(component.subcomponents, "evaluation");
  });

  return {
    pm: subcomponentTotal(model.components, "pm"),
    evaluation: subcomponentTotal(model.components, "evaluation"),
  };
}

function subcomponentTotal(items, field) {
  return items.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
}

function formatAkipScore(value) {
  return Number(value || 0).toFixed(2).replace(/\.00$/, "");
}

function renderAkipInput(criterion, field) {
  const key = `${criterion.row}:${field}`;
  const value = akipState.answers[key] || "";
  if (criterion.type === "percent") {
    return `<input class="akip-score-input" data-akip-answer="${key}" type="number" min="0" max="100" step="0.01" value="${escapeHtml(value)}" placeholder="0-100" />`;
  }
  return `
    <select class="akip-score-input" data-akip-answer="${key}">
      <option value="">-</option>
      ${criterion.options.map((option) => `<option value="${escapeHtml(option)}" ${value === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
    </select>
  `;
}

function renderAkipNote(criterion) {
  const value = akipState.notes[criterion.row] ?? criterion.note ?? "";
  return `<input class="akip-note-input" data-akip-note="${criterion.row}" type="url" value="${escapeHtml(value)}" placeholder="https://link-eviden-atau-catatan" />`;
}

function parseAkipGuideOptions(criterion) {
  const guide = String(criterion.guide || "").replace(/\s+/g, " ").trim();
  if (!guide) return [];

  const labels = criterion.options.length ? criterion.options : ["YA", "TIDAK", "A", "B", "C", "D", "E"];
  const matches = labels
    .map((label) => {
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const match = guide.match(new RegExp(`(?:^|\\s)${escaped}\\s*[:：]\\s*`, "i"));
      return match ? { label, index: match.index || 0, end: (match.index || 0) + match[0].length } : null;
    })
    .filter(Boolean)
    .sort((left, right) => left.index - right.index);

  if (!matches.length) return [{ label: "Keterangan", description: guide }];

  return matches.map((match, index) => {
    const next = matches[index + 1];
    return {
      label: match.label,
      description: guide.slice(match.end, next ? next.index : guide.length).trim(),
    };
  });
}

function renderAkipGuideDropdown(criterion) {
  const options = parseAkipGuideOptions(criterion);
  const selected = akipState.guideSelections[criterion.row] || options[0]?.label || "";
  const selectedOption = options.find((option) => option.label === selected) || options[0];

  if (!options.length) return "";

  return `
    <div class="akip-guide-cell">
      <select class="akip-guide-select" data-akip-guide="${criterion.row}">
        ${options
          .map(
            (option) =>
              `<option value="${escapeHtml(option.label)}" ${selected === option.label ? "selected" : ""}>${escapeHtml(option.label)}</option>`
          )
          .join("")}
      </select>
      <p>${escapeHtml(selectedOption?.description || "")}</p>
    </div>
  `;
}

function renderAkipEvaluation() {
  const rows = document.querySelector("#akipRows");
  const summary = document.querySelector("#akipSummary");
  if (!akipState.model) return;

  const totals = calculateAkipModel();
  summary.innerHTML = `
    <article class="metric">
      <span>Total PM</span>
      <strong>${formatAkipScore(totals.pm)}</strong>
      <small>Predikat ${akipPredicate(totals.pm)}</small>
    </article>
    <article class="metric">
      <span>Total Evaluasi</span>
      <strong>${formatAkipScore(totals.evaluation)}</strong>
      <small>Predikat ${akipPredicate(totals.evaluation)}</small>
    </article>
  `;

  rows.innerHTML = akipState.model.components
    .map(
      (component) => `
        <tr class="akip-component-row">
          <td>${escapeHtml(component.no)}</td>
          <td><strong>${escapeHtml(component.title)}</strong></td>
          <td>${formatAkipScore(component.weight)}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>${formatAkipScore(component.pm)}</td>
          <td>${formatAkipScore(component.evaluation)}</td>
          <td></td>
          <td></td>
        </tr>
        ${component.subcomponents
          .map(
            (subcomponent) => `
              <tr class="akip-subcomponent-row">
                <td>${escapeHtml(subcomponent.no)}</td>
                <td><strong>${escapeHtml(subcomponent.title)}</strong></td>
                <td>${formatAkipScore(subcomponent.weight)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${formatAkipScore(subcomponent.pm)}</td>
                <td>${formatAkipScore(subcomponent.evaluation)}</td>
                <td></td>
                <td></td>
              </tr>
              ${subcomponent.criteria
                .map(
                  (criterion) => `
                    <tr>
                      <td>${escapeHtml(criterion.no)}</td>
                      <td>${escapeHtml(criterion.title)}</td>
                      <td></td>
                      <td>${escapeHtml(criterion.evidence)}</td>
                      <td>${renderAkipInput(criterion, "pm")}</td>
                      <td>${renderAkipInput(criterion, "evaluation")}</td>
                      <td>${formatAkipScore(scoreAkipCriterionAnswer(criterion, "pm"))}</td>
                      <td>${formatAkipScore(scoreAkipCriterionAnswer(criterion, "evaluation"))}</td>
                      <td>${renderAkipGuideDropdown(criterion)}</td>
                      <td>${renderAkipNote(criterion)}</td>
                    </tr>
                  `
                )
                .join("")}
            `
          )
          .join("")}
      `
    )
    .join("");
}

function loadAkipSheet(sheetName) {
  akipState.answers = {};
  akipState.notes = {};
  akipState.guideSelections = {};
  akipState.model = parseAkipSheet(sheetName);
  if (!akipState.model.components.length) {
    akipState.model = null;
    document.querySelector("#akipRows").innerHTML =
      '<tr><td colspan="10">Sheet terpilih belum dapat dibaca sebagai LKE AKIP. Pastikan tabel memuat kolom No, Komponen/Kriteria, Bobot, Nilai PM, Nilai Evaluasi, dan Keterangan Range Nilai.</td></tr>';
    throw new Error("Struktur LKE tidak dikenali pada sheet yang dipilih.");
  }
  renderAkipEvaluation();
}

function deleteAkipWorksheet() {
  akipState.workbook = null;
  akipState.model = null;
  akipState.answers = {};
  akipState.notes = {};
  akipState.guideSelections = {};

  document.querySelector("#akipFile").value = "";
  document.querySelector("#akipSheetSelect").innerHTML = "<option>Unggah workbook terlebih dahulu</option>";
  document.querySelector("#akipSheetSelect").disabled = true;
  document.querySelector("#akipSummary").innerHTML = `
    <article class="metric">
      <span>Total PM</span>
      <strong>0</strong>
      <small>Predikat D</small>
    </article>
    <article class="metric">
      <span>Total Evaluasi</span>
      <strong>0</strong>
      <small>Predikat D</small>
    </article>
  `;
  document.querySelector("#akipRows").innerHTML =
    '<tr><td colspan="10">Unggah workbook Lembar Kerja Evaluasi (LKE) AKIP untuk mulai menilai.</td></tr>';
}

function getDocumentIcon() {
  return `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"></path>
      <path d="M14 2v5h5"></path>
      <path d="M9 13h6"></path>
      <path d="M9 17h4"></path>
    </svg>
  `;
}

function getFileKind(fileName) {
  const extension = String(fileName || "").split(".").pop().toLowerCase();
  if (["xls", "xlsx", "csv"].includes(extension)) return { label: "XLS", className: "sheet" };
  if (["doc", "docx"].includes(extension)) return { label: "DOC", className: "doc" };
  if (["zip", "rar"].includes(extension)) return { label: "ZIP", className: "archive" };
  return { label: extension === "pdf" ? "PDF" : "FILE", className: "pdf" };
}

function formatFileSize(size) {
  if (!size) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  return `${(size / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getUploadedDocumentsByType(type) {
  return uploadedAkipDocuments.filter((document) => document.documentType === type);
}

function getQuarterIndex(quarter) {
  const index = akipQuarters.indexOf(quarter);
  return index === -1 ? akipQuarters.length : index;
}

function getSortedUploadedDocuments() {
  return [...uploadedAkipDocuments].sort((first, second) => {
    const quarterDiff = getQuarterIndex(first.quarter) - getQuarterIndex(second.quarter);
    if (quarterDiff) return quarterDiff;
    return new Date(second.uploadedAt) - new Date(first.uploadedAt);
  });
}

function getDocumentsForCategory(category) {
  return uploadedAkipDocuments.filter((document) => category.types.includes(document.documentType));
}

function getDocumentsForTypeAndQuarter(type, quarter) {
  return uploadedAkipDocuments.filter((document) => document.documentType === type && document.quarter === quarter);
}

function countDocumentsByQuarter(documents) {
  return akipQuarters.map((quarter) => documents.filter((document) => document.quarter === quarter).length);
}

function renderQuarterCountCells(counts) {
  return counts.map((count) => `<td><strong>${count}</strong></td>`).join("");
}

function renderDocumentLinks(documents) {
  if (!documents.length) return '<span class="muted-cell">Belum upload</span>';
  return `
    <div class="monev-file-links">
      <strong>${documents.length} file</strong>
      ${documents
        .map(
          (document, index) => `
            <a href="${escapeHtml(document.url)}" target="_blank" rel="noopener">
              Lihat ${index + 1}
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSelectedFiles() {
  const filesPanel = document.querySelector("#selectedFilesPanel");
  const fileList = document.querySelector("#selectedFileList");
  const summary = document.querySelector("#selectedFileSummary");
  const count = document.querySelector("#uploadFileCount");
  const status = document.querySelector("#uploadOverallStatus");
  const submitButton = document.querySelector("#submitAkipUpload");
  if (!filesPanel || !fileList || !summary || !count || !status || !submitButton) return;

  const hasFiles = selectedAkipFiles.length > 0;
  filesPanel.hidden = !hasFiles;
  count.textContent = String(selectedAkipFiles.length);
  const missingMetaCount = selectedAkipFiles.filter((item) => !item.documentType || !item.quarter).length;
  status.textContent = hasFiles ? (missingMetaCount ? "Lengkapi dokumen" : "Menunggu unggah") : "Siap";
  submitButton.disabled = !hasFiles || missingMetaCount > 0;

  if (!hasFiles) {
    fileList.innerHTML = "";
    summary.textContent = "Pilih jenis dokumen dan triwulan untuk setiap file sesuai urutan unggah.";
    return;
  }

  const totalSize = selectedAkipFiles.reduce((total, item) => total + item.file.size, 0);
  summary.textContent = missingMetaCount
    ? `${selectedAkipFiles.length} file dipilih - ${missingMetaCount} belum lengkap jenis dokumen atau triwulan`
    : `${selectedAkipFiles.length} file dipilih - ${formatFileSize(totalSize)} - siap diunggah`;
  fileList.innerHTML = selectedAkipFiles
    .map(({ id, file, documentType, quarter, progress, status: fileStatus }, index) => {
      const kind = getFileKind(file.name);
      const statusClass = fileStatus === "Selesai" ? "done" : fileStatus === "Gagal" ? "error" : "";
      const typeOptions = [
        '<option value="">Pilih jenis dokumen</option>',
        ...akipDocumentTypes.map(
          (type) => `<option value="${escapeHtml(type)}"${type === documentType ? " selected" : ""}>${escapeHtml(type)}</option>`
        ),
      ].join("");
      const quarterOptions = [
        '<option value="">Pilih triwulan</option>',
        ...akipQuarters.map((item) => `<option value="${escapeHtml(item)}"${item === quarter ? " selected" : ""}>${escapeHtml(item)}</option>`),
      ].join("");
      return `
        <article class="selected-file" data-file-id="${escapeHtml(id)}">
          <span class="file-type-icon ${escapeHtml(kind.className)}">${getDocumentIcon()}</span>
          <div class="selected-file-body">
            <div class="selected-file-title">
              <strong title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</strong>
              <span>${escapeHtml(formatFileSize(file.size))}</span>
            </div>
            <div class="file-meta-grid">
              <label class="file-type-select">
                Jenis dokumen urutan ${index + 1}
                <select data-akip-file-type="${escapeHtml(id)}">
                  ${typeOptions}
                </select>
              </label>
              <label class="file-type-select">
                Triwulan
                <select data-akip-file-quarter="${escapeHtml(id)}">
                  ${quarterOptions}
                </select>
              </label>
            </div>
            <div class="file-progress"><span style="--progress: ${progress}%"></span></div>
            <span class="file-status ${statusClass}">${escapeHtml(fileStatus)}</span>
          </div>
          <button class="file-remove" data-remove-akip-file="${escapeHtml(id)}" type="button" aria-label="Hapus ${escapeHtml(file.name)}">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </article>
      `;
    })
    .join("");
}

function showToast(title, message, type = "success") {
  const stack = document.querySelector("#toastStack");
  if (!stack) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
  stack.append(toast);
  window.setTimeout(() => toast.remove(), 3600);
}

function addAkipFiles(files) {
  const incomingFiles = Array.from(files || []);
  const existingKeys = new Set(selectedAkipFiles.map(({ file }) => `${file.name}-${file.size}-${file.lastModified}`));
  const freshFiles = incomingFiles.filter((file) => !existingKeys.has(`${file.name}-${file.size}-${file.lastModified}`));

  selectedAkipFiles = selectedAkipFiles.concat(
    freshFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: "Pilih jenis dokumen",
      documentType: "",
      quarter: "",
    }))
  );

  renderSelectedFiles();
  if (freshFiles.length) showToast("File ditambahkan", `${freshFiles.length} file ditambahkan. Pilih jenis dokumen dan triwulan.`);
}

function resetAkipUpload() {
  if (uploadProgressTimer) window.clearInterval(uploadProgressTimer);
  uploadProgressTimer = null;
  selectedAkipFiles = [];
  document.querySelector("#akipDocumentInput").value = "";
  renderSelectedFiles();
}

function simulateAkipUpload() {
  if (!selectedAkipFiles.length) {
    showToast("Belum ada file", "Pilih minimal satu file sebelum mengunggah.", "error");
    return;
  }

  const firstMissingIndex = selectedAkipFiles.findIndex((item) => !item.documentType || !item.quarter);
  if (firstMissingIndex !== -1) {
    showToast("Data dokumen belum lengkap", `Pilih jenis dokumen dan triwulan untuk file urutan ${firstMissingIndex + 1}.`, "error");
    return;
  }

  document.querySelector("#uploadOverallStatus").textContent = "Mengunggah...";
  selectedAkipFiles = selectedAkipFiles.map((item) => ({ ...item, status: "Mengunggah...", progress: Math.max(item.progress, 8) }));
  renderSelectedFiles();

  if (uploadProgressTimer) window.clearInterval(uploadProgressTimer);
  uploadProgressTimer = window.setInterval(() => {
    selectedAkipFiles = selectedAkipFiles.map((item) => {
      if (item.progress >= 100) return { ...item, status: "Selesai" };
      const nextProgress = Math.min(100, item.progress + 18 + Math.round(Math.random() * 16));
      return { ...item, progress: nextProgress, status: nextProgress >= 100 ? "Selesai" : "Mengunggah..." };
    });
    renderSelectedFiles();

    if (selectedAkipFiles.every((item) => item.progress >= 100)) {
      window.clearInterval(uploadProgressTimer);
      uploadProgressTimer = null;
      document.querySelector("#uploadOverallStatus").textContent = "Selesai";
      const uploadedAt = new Date().toISOString();
      uploadedAkipDocuments = uploadedAkipDocuments.concat(
        selectedAkipFiles.map((item) => ({
          id: item.id,
          documentType: item.documentType,
          quarter: item.quarter,
          name: item.file.name,
          size: item.file.size,
          url: URL.createObjectURL(item.file),
          uploadedAt,
        }))
      );
      renderMonevMonitoring();
      showToast("Unggah selesai", `${selectedAkipFiles.length} file berhasil diproses sesuai jenis dokumen masing-masing.`);
    }
  }, 360);
}

function getMonevRealizationEntries() {
  return realizations
    .map((item, index) => ({ item, index, agreement: agreements[item.agreementIndex] }))
    .filter(({ agreement }) => agreement?.status === "Ditandatangani");
}

function getActionStatus(percent) {
  if (percent >= 85) return { label: "Tercapai", className: "done" };
  if (percent >= 60) return { label: "Perlu percepatan", className: "warning" };
  return { label: "Berisiko", className: "danger" };
}

function renderMonevDocuments() {
  const rows = document.querySelector("#monevDocumentRows");
  if (!rows) return;

  const uploadedTypeCount = akipDocumentTypes.filter((type) => getUploadedDocumentsByType(type).length).length;
  const compliance = Math.round((uploadedTypeCount / akipDocumentTypes.length) * 100);
  const sortedDocuments = getSortedUploadedDocuments();
  document.querySelector("#monevDocumentCompliance").textContent = `${compliance}%`;
  document.querySelector("#monevDocumentSummary").textContent = `${uploadedTypeCount} dari ${akipDocumentTypes.length} jenis dokumen terpenuhi, ${sortedDocuments.length} file terunggah`;

  rows.innerHTML = akipDocumentCategories
    .map((category, index) => {
      const documents = getDocumentsForCategory(category);
      const counts = countDocumentsByQuarter(documents);
      const uploadedTypes = category.types.filter((type) => getUploadedDocumentsByType(type).length).length;
      const isComplete = uploadedTypes === category.types.length;
      return `
        <tr>
          <td><strong>${escapeHtml(category.name)}</strong></td>
          <td>${uploadedTypes}/${category.types.length} jenis<br><small>${documents.length} file terunggah</small></td>
          ${renderQuarterCountCells(counts)}
          <td>
            <span class="monev-status ${isComplete ? "done" : documents.length ? "warning" : "missing"}">
              ${isComplete ? "Lengkap" : documents.length ? "Sebagian" : "Belum upload"}
            </span>
          </td>
          <td>
            <button class="icon-button monev-eye-button" data-view-monev-category="${index}" type="button" aria-label="Lihat rincian ${escapeHtml(category.name)}">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              </svg>
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderMonevDocumentDialog(category) {
  const dialog = document.querySelector("#monevDocumentDialog");
  const title = document.querySelector("#monevDocumentDialogTitle");
  const copy = document.querySelector("#monevDocumentDialogCopy");
  const summary = document.querySelector("#monevDocumentQuarterSummary");
  const rows = document.querySelector("#monevDocumentDetailRows");
  if (!dialog || !title || !copy || !summary || !rows) return;

  const documents = getDocumentsForCategory(category);
  const counts = countDocumentsByQuarter(documents);
  title.textContent = category.name;
  copy.textContent = `${documents.length} file terunggah dari ${category.types.length} jenis dokumen.`;
  summary.innerHTML = akipQuarters
    .map(
      (quarter, index) => `
        <article class="metric">
          <span>${escapeHtml(quarter)}</span>
          <strong>${counts[index]}</strong>
          <small>dokumen terunggah</small>
        </article>
      `
    )
    .join("");

  rows.innerHTML = category.types
    .map((type) => {
      const uploadedCount = getUploadedDocumentsByType(type).length;
      return `
        <tr>
          <td><strong>${escapeHtml(type)}</strong></td>
          ${akipQuarters.map((quarter) => `<td>${renderDocumentLinks(getDocumentsForTypeAndQuarter(type, quarter))}</td>`).join("")}
          <td>
            <span class="monev-status ${uploadedCount ? "done" : "missing"}">
              ${uploadedCount ? "Sudah upload" : "Belum upload"}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");

  dialog.showModal();
}

function renderMonevActions() {
  const rows = document.querySelector("#monevActionRows");
  if (!rows) return;

  const entries = getMonevRealizationEntries();
  const actionDocumentCount = getUploadedDocumentsByType("Rencana Aksi").length;
  document.querySelector("#monevActionCount").textContent = String(entries.length || actionDocumentCount);

  if (!entries.length) {
    rows.innerHTML = `
      <tr>
        <td colspan="6">Belum ada realisasi kinerja untuk dipantau. Unggah Rencana Aksi dan input realisasi kinerja terlebih dahulu.</td>
      </tr>
    `;
    return;
  }

  rows.innerHTML = entries
    .map(({ item, agreement }) => {
      const plan = getAgreementPlan(agreement);
      const indicator = getAgreementIndicator(agreement);
      const target = agreement.target || indicator.target;
      const percent = calculateAchievementPercent(item.achievement, target);
      const status = getActionStatus(percent);
      return `
        <tr>
          <td>${escapeHtml(item.quarter)}</td>
          <td>
            <strong>${escapeHtml(getSasaranByLevel(plan, agreement.indicatorLevel))}</strong>
            <small>${escapeHtml(indicator.name)}</small>
          </td>
          <td>${escapeHtml(target)}</td>
          <td><strong>${escapeHtml(item.achievement)}</strong> <small>(${percent}%)</small></td>
          <td><span class="monev-status ${status.className}">${status.label}</span></td>
          <td>${escapeHtml(item.note || "-")}</td>
        </tr>
      `;
    })
    .join("");
}

function renderMonevBudget() {
  const rows = document.querySelector("#monevBudgetRows");
  if (!rows) return;

  const entries = getMonevRealizationEntries();
  const totalBudget = entries.reduce((total, { item }) => total + Number(item.budget || 0), 0);
  document.querySelector("#monevBudgetTotal").textContent = currency(totalBudget);
  document.querySelector("#monevBudgetSummary").textContent = entries.length
    ? `${entries.length} realisasi sudah tercatat`
    : "Belum ada realisasi anggaran";

  if (!entries.length) {
    rows.innerHTML = `
      <tr>
        <td colspan="5">Belum ada data anggaran dari menu Realisasi Kinerja.</td>
      </tr>
    `;
    return;
  }

  rows.innerHTML = entries
    .map(({ item, agreement }) => {
      const indicator = getAgreementIndicator(agreement);
      return `
        <tr>
          <td>${escapeHtml(item.quarter)}</td>
          <td>${escapeHtml(indicator.name)}</td>
          <td><strong>${currency(item.budget)}</strong></td>
          <td>${escapeHtml(item.achievement)}</td>
          <td>${escapeHtml(item.note || "-")}</td>
        </tr>
      `;
    })
    .join("");
}

function renderMonevMonitoring() {
  renderMonevDocuments();
  renderMonevActions();
  renderMonevBudget();
}

function switchPage(pageId) {
  document.querySelectorAll(".content-page").forEach((page) => {
    page.classList.toggle("active", page.id === pageId);
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });

  document.querySelector("#pageTitle").textContent = titles[pageId];
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.page));
});

document.querySelector("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const username = String(form.get("username") || "").trim();
  const password = String(form.get("password") || "");
  const loginMessage = document.querySelector("#loginMessage");
  loginMessage.textContent = "Memeriksa akun...";

  try {
    if (!isBackendAvailable()) {
      const localSatker = satkerAccounts.find(
        (account) => account.username.toLowerCase() === username.toLowerCase() && account.password === password
      );
      if (!(username === "admin" && password === "admin123") && !localSatker) {
        throw new Error("Username atau password salah.");
      }
      const user = localSatker
        ? {
            id: localSatker.id,
            username: localSatker.username,
            name: localSatker.name,
            role: localSatker.level,
            unit: localSatker.name,
          }
        : {
            id: "admin",
            username: "admin",
            name: "Admin SAKIP",
            role: "Administrator Demo",
            unit: "Kejaksaan Negeri",
          };
      storeAuth({ token: "demo-file-session", user });
      applyAuthenticatedUser(user);
      event.currentTarget.reset();
      return;
    }

    const session = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    storeAuth(session);
    applyAuthenticatedUser(session.user);
    event.currentTarget.reset();
  } catch (error) {
    loginMessage.textContent = error.message;
  }
});

document.querySelector("#logoutButton").addEventListener("click", async () => {
  document.querySelector("#logoutDialog").showModal();
});

document.querySelector("#confirmLogout").addEventListener("click", async () => {
  document.querySelector("#confirmLogout").textContent = "Keluar...";
  try {
    if (isBackendAvailable() && getStoredAuth()?.token) {
      await apiRequest("/api/auth/logout", { method: "POST", body: "{}" });
    }
  } catch {
    // Logout tetap dilakukan secara lokal walau server tidak merespons.
  }
  clearAuth();
  document.querySelector("#logoutDialog").close();
  document.querySelector("#confirmLogout").textContent = "Keluar";
  showLogin("Anda sudah keluar.");
});

document.querySelector("#satkerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    await createSatkerAccount({
      level: form.get("satkerLevel"),
      name: String(form.get("satkerName") || "").trim(),
      region: String(form.get("satkerRegion") || "").trim(),
    });
    event.currentTarget.reset();
    alert("Akun satker berhasil dibuat.");
  } catch (error) {
    alert(`Gagal membuat akun satker: ${error.message}`);
  }
});

document.querySelector("#reloadSatkerAccounts").addEventListener("click", () => {
  loadSatkerAccountsFromServer().catch((error) => alert(`Gagal memuat akun satker: ${error.message}`));
});

document.querySelector("#satkerAccountRows").addEventListener("click", async (event) => {
  const refreshButton = event.target.closest("[data-refresh-satker-password]");
  if (!refreshButton) return;

  try {
    await refreshSatkerPassword(refreshButton.dataset.refreshSatkerPassword);
    alert("Password baru berhasil dibuat.");
  } catch (error) {
    alert(`Gagal refresh password: ${error.message}`);
  }
});

document.querySelector("#performanceYearSelect")?.addEventListener("change", renderPerformanceTree);
document.querySelector("#ikuYearSelect")?.addEventListener("change", renderIkuRows);

function updateIkuFormulaField(key, fieldName, value) {
  const formula = {
    ...getDefaultIkuFormula({ name: "" }),
    ...(ikuFormulas[key] || {}),
  };

  if (fieldName.startsWith("sourceField:")) {
    const sourceIndex = Number(fieldName.split(":")[1]);
    formula.dataSources = [...(formula.dataSources || [])];
    formula.dataSources[sourceIndex] = {
      ...(formula.dataSources[sourceIndex] || {}),
      selectedField: value,
    };
  } else {
    formula[fieldName] = value;
  }

  formula.saved = false;
  ikuFormulas[key] = formula;
}

document.querySelector("#ikuRows")?.addEventListener("input", (event) => {
  const field = event.target.closest("[data-iku-field]");
  if (field) {
    updateIkuFormulaField(field.dataset.ikuKey, field.dataset.ikuField, field.value);
    return;
  }

  const sourceField = event.target.closest("[data-iku-source-field]");
  if (!sourceField) return;
  const key = sourceField.dataset.ikuKey;
  const sourceIndex = Number(sourceField.dataset.ikuSourceIndex);
  const formula = {
    ...getDefaultIkuFormula({ name: "" }),
    ...(ikuFormulas[key] || {}),
  };
  formula.dataSources = [...(formula.dataSources || [])];
  formula.dataSources[sourceIndex] = {
    ...(formula.dataSources[sourceIndex] || {}),
    [sourceField.dataset.ikuSourceField]: sourceField.value,
  };
  formula.saved = false;
  ikuFormulas[key] = formula;
});

document.querySelector("#ikuRows")?.addEventListener("change", (event) => {
  const field = event.target.closest("[data-iku-field]");
  if (field) {
    updateIkuFormulaField(field.dataset.ikuKey, field.dataset.ikuField, field.value);
    renderIkuRows();
    return;
  }

  const sourceField = event.target.closest("[data-iku-source-field]");
  if (sourceField) renderIkuRows();
});

document.querySelector("#ikuRows")?.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-toggle-iku-formula]");
  const generateButton = event.target.closest("[data-generate-iku-formula]");
  const loadApiButton = event.target.closest("[data-load-api]");
  const loadSourceApiButton = event.target.closest("[data-load-source-api]");
  const saveButton = event.target.closest("[data-save-iku-formula]");

  if (toggleButton) {
    const key = toggleButton.dataset.ikuKey;
    if (openIkuFormulaKeys.has(key)) {
      openIkuFormulaKeys.delete(key);
    } else {
      openIkuFormulaKeys.add(key);
    }
    renderIkuRows();
    return;
  }

  if (generateButton) {
    const key = generateButton.dataset.ikuKey;
    const formula = {
      ...getDefaultIkuFormula({ name: "" }),
      ...(ikuFormulas[key] || {}),
    };
    const generated = generateIkuFormulaFromPrompt(formula.formulaPrompt);
    ikuFormulas[key] = {
      ...formula,
      ...generated,
      saved: false,
    };
    renderIkuRows();
    return;
  }

  if (loadApiButton) {
    const key = loadApiButton.dataset.ikuKey;
    const formula = ikuFormulas[key] || {};
    const apiField = loadApiButton.dataset.loadApi;
    if (!formula[apiField]) {
      alert("Masukkan API key terlebih dahulu.");
      return;
    }
    renderIkuRows();
    return;
  }

  if (loadSourceApiButton) {
    const key = loadSourceApiButton.dataset.ikuKey;
    const sourceIndex = Number(loadSourceApiButton.dataset.loadSourceApi);
    const source = ikuFormulas[key]?.dataSources?.[sourceIndex];
    if (!source?.apiKey) {
      alert("Masukkan API key sumber data terlebih dahulu.");
      return;
    }
    renderIkuRows();
    return;
  }

  if (!saveButton) return;
  const key = saveButton.dataset.ikuKey;
  ikuFormulas[key] = {
    ...getDefaultIkuFormula({ name: "" }),
    ...(ikuFormulas[key] || {}),
    saved: true,
  };
  persistIkuFormulas();
  renderIkuRows();
});

document.querySelector("#resetIkuFormulas")?.addEventListener("click", () => {
  ikuFormulas = {};
  persistIkuFormulas();
  renderIkuRows();
});

document.querySelector("#openEntry").addEventListener("click", () => {
  document.querySelector("#entryDialog").showModal();
});

document.querySelector("#akipFile").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  try {
    const data = await file.arrayBuffer();
    akipState.workbook = XLSX.read(data, { type: "array", cellFormula: true });
    const sheetSelect = document.querySelector("#akipSheetSelect");
    const lkeSheets = getAkipSheetNames(akipState.workbook);
    if (!lkeSheets.length) {
      akipState.workbook = null;
      akipState.model = null;
      akipState.answers = {};
      akipState.notes = {};
      akipState.guideSelections = {};
      document.querySelector("#akipRows").innerHTML =
        '<tr><td colspan="10">File belum memuat sheet Lembar Kerja Evaluasi (LKE) AKIP.</td></tr>';
      throw new Error('Workbook harus memiliki sheet atau isi tabel LKE/AKIP, misalnya "LKE Eselon I", "LKE KEJATI", atau "LKE KEJARI+CABJARI".');
    }
    const sheetNames = lkeSheets;

    sheetSelect.innerHTML = sheetNames.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
    sheetSelect.disabled = false;
    loadAkipSheet(sheetNames[0]);
  } catch (error) {
    alert(`Gagal membaca workbook LKE: ${error.message}`);
    event.target.value = "";
  }
});

document.querySelector("#akipSheetSelect").addEventListener("change", (event) => {
  try {
    loadAkipSheet(event.target.value);
  } catch (error) {
    alert(`Gagal membaca sheet LKE: ${error.message}`);
  }
});

document.querySelector("#akipRows").addEventListener("input", (event) => {
  const scoreInput = event.target.closest("[data-akip-answer]");
  if (scoreInput) {
    akipState.answers[scoreInput.dataset.akipAnswer] = scoreInput.value;
    renderAkipEvaluation();
    return;
  }

  const noteInput = event.target.closest("[data-akip-note]");
  if (noteInput) {
    akipState.notes[noteInput.dataset.akipNote] = noteInput.value;
  }
});

document.querySelector("#akipRows").addEventListener("change", (event) => {
  const guideSelect = event.target.closest("[data-akip-guide]");
  if (!guideSelect) return;
  akipState.guideSelections[guideSelect.dataset.akipGuide] = guideSelect.value;
  renderAkipEvaluation();
});

document.querySelector("#monevDocumentRows").addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view-monev-category]");
  if (!viewButton) return;
  const category = akipDocumentCategories[Number(viewButton.dataset.viewMonevCategory)];
  if (category) renderMonevDocumentDialog(category);
});

document.querySelector("#resetAkipScores").addEventListener("click", () => {
  akipState.answers = {};
  akipState.notes = {};
  akipState.guideSelections = {};
  if (akipState.model) renderAkipEvaluation();
});

document.querySelector("#deleteAkipWorksheet").addEventListener("click", deleteAkipWorksheet);

document.querySelector("#realizationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const { agreement, index } = getSelectedSignedAgreement();
  if (!agreement) {
    alert("Belum ada Perjanjian Kinerja yang ditandatangani. Tandatangani PK terlebih dahulu sebelum input realisasi.");
    return;
  }

  realizations.unshift({
    quarter: form.get("quarter"),
    agreementIndex: index,
    achievement: form.get("achievement"),
    budget: Number(form.get("budget")),
    note: form.get("note"),
  });
  renderRealizations();
  renderGoals();
  event.currentTarget.reset();
  populateRealizationIndicatorSelect();
  alert("Realisasi kinerja triwulanan berhasil disimpan.");
});

document.querySelector("#realizationAgreementSelect").addEventListener("change", populateRealizationIndicatorSelect);

document.querySelector("#realizationRows").addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-delete-realization]");
  if (!deleteButton) return;
  realizations.splice(Number(deleteButton.dataset.deleteRealization), 1);
  renderRealizations();
  renderGoals();
});

document.querySelector("#resetRealizations").addEventListener("click", () => {
  realizations = structuredClone(defaultRealizations);
  populateRealizationCascadeSelect();
  populateRealizationIndicatorSelect();
  renderRealizations();
  renderGoals();
});

document.querySelectorAll("[data-add-indicator]").forEach((button) => {
  button.addEventListener("click", () => createIndicatorRow(button.dataset.addIndicator));
});

document.querySelector("#addSasaran").addEventListener("click", () => createSasaranRow());

document.querySelectorAll("[data-add-renstra-indicator]").forEach((button) => {
  button.addEventListener("click", () => createRenstraIndicatorRow(button.dataset.addRenstraIndicator));
});

document.querySelector("#planRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-plan]");
  const deleteButton = event.target.closest("[data-delete-plan]");

  if (editButton) {
    const index = Number(editButton.dataset.editPlan);
    fillCascadeForm(cascades[index], index);
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.deletePlan);
    cascades.splice(index, 1);
    refreshCascadeViews();
    if (editingIndex === index) resetCascadeForm();
  }
});

document.querySelector("#cascadeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const strategicIndicators = collectIndicators("strategic");
  const programIndicators = collectIndicators("program");
  const activityIndicators = collectIndicators("activity");
  const sasaranTargets = collectSasaranTargets(form);

  if (!strategicIndicators.length || !programIndicators.length || !activityIndicators.length) {
    alert("Setiap sasaran harus memiliki minimal satu indikator dan target.");
    return;
  }

  if (!sasaranTargets.length) {
    alert("Minimal satu sasaran strategis, program, kegiatan, dan penanggung jawab harus diisi.");
    return;
  }

  const payloads = sasaranTargets.map((target) => ({
    strategic: target.strategic,
    strategicIndicators: structuredClone(strategicIndicators),
    program: target.program,
    programIndicators: structuredClone(programIndicators),
    activity: target.activity,
    activityIndicators: structuredClone(activityIndicators),
    owner: target.owner,
    status: editingIndex === null ? "Draft" : cascades[editingIndex].status,
  }));

  if (editingIndex === null) {
    cascades.unshift(...payloads);
  } else {
    cascades[editingIndex] = payloads[0];
  }

  refreshCascadeViews();
  resetCascadeForm();
  alert(`${payloads.length} sasaran cascading berhasil disimpan.`);
});

document.querySelector("#resetCascade").addEventListener("click", () => {
  cascades = structuredClone(defaultCascades);
  refreshCascadeViews();
  resetCascadeForm();
});

document.querySelector("#cancelEdit").addEventListener("click", resetCascadeForm);

document.querySelector("#renstraForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const strategicIndicators = collectRenstraIndicators("strategic");
  const programIndicators = collectRenstraIndicators("program");
  const activityIndicators = collectRenstraIndicators("activity");

  if (!strategicIndicators.length || !programIndicators.length || !activityIndicators.length) {
    alert("Setiap level sasaran Renstra harus memiliki minimal satu indikator dan target 5 tahun.");
    return;
  }

  const payload = {
    period: form.get("renstraPeriod"),
    unit: form.get("renstraUnit"),
    strategic: form.get("renstraStrategic"),
    program: form.get("renstraProgram"),
    activity: form.get("renstraActivity"),
    owner: form.get("renstraOwner"),
    strategicIndicators,
    programIndicators,
    activityIndicators,
  };

  if (editingRenstraIndex === null) {
    renstraItems.unshift(payload);
  } else {
    renstraItems[editingRenstraIndex] = payload;
  }

  renderRenstraRows();
  populatePerformanceYearSelect();
  renderPerformanceTree();
  refreshIkuViews();
  resetRenstraForm();
  alert("Matriks Renstra berhasil disimpan.");
});

document.querySelector("#renstraRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-renstra]");
  const copyButton = event.target.closest("[data-copy-renstra]");
  const deleteButton = event.target.closest("[data-delete-renstra]");

  if (editButton) {
    const index = Number(editButton.dataset.editRenstra);
    fillRenstraForm(renstraItems[index], index);
  }

  if (copyButton) {
    const index = Number(copyButton.dataset.copyRenstra);
    cascades.unshift(renstraToCascade(renstraItems[index]));
    refreshCascadeViews();
    alert("Data Renstra Tahun 1 berhasil dikirim ke Rencana Kinerja.");
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.deleteRenstra);
    renstraItems.splice(index, 1);
    renderRenstraRows();
    populatePerformanceYearSelect();
    renderPerformanceTree();
    refreshIkuViews();
    if (editingRenstraIndex === index) resetRenstraForm();
  }
});

document.querySelector("#resetRenstra").addEventListener("click", () => {
  renstraItems = structuredClone(defaultRenstra);
  renderRenstraRows();
  populatePerformanceYearSelect();
  renderPerformanceTree();
  refreshIkuViews();
  resetRenstraForm();
});

document.querySelector("#cancelRenstraEdit").addEventListener("click", resetRenstraForm);

document.querySelector("#matrixFile").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  try {
    const fileName = file.name.toLowerCase();
    const isPdf = file.type === "application/pdf" || fileName.endsWith(".pdf");
    const isExcel =
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".xls") ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";

    if (isPdf) {
      document.querySelector("#matrixText").value = await extractPdfText(file);
    } else if (isExcel) {
      document.querySelector("#matrixText").value = await extractExcelText(file);
    } else {
      document.querySelector("#matrixText").value = await file.text();
    }
  } catch (error) {
    alert(`Gagal mengekstrak file: ${error.message}`);
    event.target.value = "";
  }
});

document.querySelector("#clearMatrix").addEventListener("click", () => {
  document.querySelector("#matrixFile").value = "";
  document.querySelector("#matrixText").value = "";
});

document.querySelector("#downloadRenstraTemplate").addEventListener("click", () => {
  downloadRenstraTemplate(document.querySelector("#renstraTemplateFormat").value);
});

document.querySelector("#importMatrix").addEventListener("click", () => {
  try {
    const rows = parseMatrixText(document.querySelector("#matrixText").value);
    const imported = extractRenstraFromRows(rows);

    if (!imported.length) {
      alert("Matriks Renstra belum bisa diekstrak. Periksa nama kolom, sasaran, indikator, dan target 5 tahun.");
      return;
    }

    renstraItems = [...imported, ...renstraItems];
    renderRenstraRows();
    populatePerformanceYearSelect();
    renderPerformanceTree();
    refreshIkuViews();
    alert(`${imported.length} baris Matriks Renstra berhasil diekstrak dan diinput otomatis.`);
  } catch (error) {
    alert(`Gagal membaca Matriks Renstra: ${error.message}`);
  }
});

document.querySelector("#agreementCascadeSelect").addEventListener("change", () => {
  populateAgreementIndicatorSelect();
  renderAgreementPreview();
});
document.querySelector("#agreementLevelSelect").addEventListener("change", () => {
  populateAgreementIndicatorSelect();
  renderAgreementPreview();
});
document.querySelector("#agreementIndicatorSelect").addEventListener("change", () => {
  populateAgreementIndicatorSelect();
  renderAgreementPreview();
});
document.querySelector("#agreementTargetInput").addEventListener("input", renderAgreementPreview);

document.querySelector("#agreementForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const payload = {
    number: form.get("agreementNumber"),
    period: form.get("agreementPeriod"),
    supervisorName: form.get("supervisorName"),
    supervisorPosition: form.get("supervisorPosition"),
    employeeName: form.get("employeeName"),
    employeePosition: form.get("employeePosition"),
    cascadeIndex: Number(form.get("agreementCascade")),
    indicatorLevel: form.get("agreementLevel"),
    indicatorIndex: Number(form.get("agreementIndicator")),
    target: form.get("agreementTarget"),
    status: editingAgreementIndex === null ? "Draft" : agreements[editingAgreementIndex].status,
  };

  if (editingAgreementIndex === null) {
    agreements.push(payload);
  } else {
    agreements[editingAgreementIndex] = payload;
  }

  renderAgreements();
  populateRealizationCascadeSelect();
  populateRealizationIndicatorSelect();
  renderRealizations();
  renderGoals();
  resetAgreementForm();
  alert("Perjanjian kinerja berhasil disimpan.");
});

document.querySelector("#agreementRows").addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-agreement]");
  const signButton = event.target.closest("[data-sign-agreement]");
  const deleteButton = event.target.closest("[data-delete-agreement]");

  if (editButton) {
    const index = Number(editButton.dataset.editAgreement);
    fillAgreementForm(agreements[index], index);
  }

  if (signButton) {
    const index = Number(signButton.dataset.signAgreement);
    agreements[index].status = agreements[index].status === "Ditandatangani" ? "Menunggu Tanda Tangan" : "Ditandatangani";
    renderAgreements();
    populateRealizationCascadeSelect();
    populateRealizationIndicatorSelect();
    renderRealizations();
    renderGoals();
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.deleteAgreement);
    agreements.splice(index, 1);
    realizations = realizations
      .filter((item) => item.agreementIndex !== index)
      .map((item) => ({
        ...item,
        agreementIndex: item.agreementIndex > index ? item.agreementIndex - 1 : item.agreementIndex,
      }));
    renderAgreements();
    populateRealizationCascadeSelect();
    populateRealizationIndicatorSelect();
    renderRealizations();
    renderGoals();
    if (editingAgreementIndex === index) resetAgreementForm();
  }
});

document.querySelector("#resetAgreements").addEventListener("click", () => {
  agreements = structuredClone(defaultAgreements);
  realizations = structuredClone(defaultRealizations);
  renderAgreements();
  populateRealizationCascadeSelect();
  populateRealizationIndicatorSelect();
  renderRealizations();
  renderGoals();
  resetAgreementForm();
});

document.querySelector("#cancelAgreementEdit").addEventListener("click", resetAgreementForm);

document.querySelector("#akipDocumentInput").addEventListener("change", (event) => {
  addAkipFiles(event.target.files);
  event.target.value = "";
});

document.querySelector("#akipDropzone").addEventListener("dragover", (event) => {
  event.preventDefault();
  event.currentTarget.classList.add("dragging");
});

document.querySelector("#akipDropzone").addEventListener("dragleave", (event) => {
  event.currentTarget.classList.remove("dragging");
});

document.querySelector("#akipDropzone").addEventListener("drop", (event) => {
  event.preventDefault();
  event.currentTarget.classList.remove("dragging");
  addAkipFiles(event.dataTransfer.files);
});

document.querySelector("#selectedFileList").addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-akip-file]");
  if (!removeButton) return;
  selectedAkipFiles = selectedAkipFiles.filter((item) => item.id !== removeButton.dataset.removeAkipFile);
  renderSelectedFiles();
});

document.querySelector("#selectedFileList").addEventListener("change", (event) => {
  const typeSelect = event.target.closest("[data-akip-file-type]");
  const quarterSelect = event.target.closest("[data-akip-file-quarter]");
  if (!typeSelect && !quarterSelect) return;

  selectedAkipFiles = selectedAkipFiles.map((item) => {
    const isTypeChange = typeSelect && item.id === typeSelect.dataset.akipFileType;
    const isQuarterChange = quarterSelect && item.id === quarterSelect.dataset.akipFileQuarter;
    if (!isTypeChange && !isQuarterChange) return item;

    const nextItem = {
      ...item,
      documentType: isTypeChange ? typeSelect.value : item.documentType,
      quarter: isQuarterChange ? quarterSelect.value : item.quarter,
    };
    return {
      ...nextItem,
      status: nextItem.documentType && nextItem.quarter ? "Siap diunggah" : "Lengkapi dokumen",
    };
  });
  renderSelectedFiles();
});

document.querySelector("#clearAkipFiles").addEventListener("click", resetAkipUpload);
document.querySelector("#cancelAkipUpload").addEventListener("click", resetAkipUpload);
document.querySelector("#submitAkipUpload").addEventListener("click", simulateAkipUpload);

populateCascadeSelects();
populateAgreementCascadeSelect();
populateAgreementIndicatorSelect();
populateRealizationCascadeSelect();
populateRealizationIndicatorSelect();
populatePerformanceYearSelect();
refreshIkuViews();
resetIndicatorInputs();
resetRenstraIndicatorInputs();
renderPlans();
renderPerformanceTree();
renderRenstraRows();
renderRealizations();
renderGoals();
renderAgreementPreview();
renderAgreements();
renderSelectedFiles();
renderMonevMonitoring();
renderSatkerAccounts();
initializeAuth();
