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
    status: "Menunggu Tanda Tangan",
  },
];

let agreements = structuredClone(defaultAgreements);
let editingAgreementIndex = null;

const documents = [
  ["Laporan Realisasi TW I", "PDF - terverifikasi"],
  ["Matriks Perjanjian Kinerja", "XLSX - menunggu review"],
  ["Dokumentasi Layanan Publik", "ZIP - perlu perbaikan"],
  ["Notulen Rapat Evaluasi", "PDF - terverifikasi"],
  ["SK Tim SAKIP", "PDF - terverifikasi"],
  ["Rencana Aksi Kinerja", "DOCX - draft"],
];

const reviews = [
  ["Kualitas Eviden", "Beberapa indikator membutuhkan bukti dukung yang lebih spesifik dan mudah ditelusuri."],
  ["Konsistensi Target", "Target tahunan perlu diselaraskan ulang dengan rencana aksi triwulanan."],
  ["Tindak Lanjut", "Unit pembina diminta memperbarui progres paling lambat 7 hari kerja."],
];

const titles = {
  dashboard: "Dashboard Kinerja",
  rencana: "Rencana Kinerja",
  perjanjian: "Perjanjian Kinerja",
  realisasi: "Realisasi Kinerja",
  eviden: "Dokumen Eviden",
  evaluasi: "Evaluasi SAKIP",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

function renderGoals() {
  const goalList = document.querySelector("#goalList");
  goalList.innerHTML = goals
    .map(
      (goal) => `
        <article class="goal-row">
          <header>
            <strong>${goal.title}</strong>
            <span>${goal.progress}%</span>
          </header>
          <div class="progress" aria-label="Progress ${goal.progress}%">
            <span style="width: ${goal.progress}%"></span>
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

function groupCascades() {
  return cascades.reduce((strategicMap, item) => {
    if (!strategicMap.has(item.strategic)) {
      strategicMap.set(item.strategic, {
        indicators: item.strategicIndicators,
        programs: new Map(),
      });
    }

    const strategic = strategicMap.get(item.strategic);
    if (!strategic.programs.has(item.program)) {
      strategic.programs.set(item.program, {
        indicators: item.programIndicators,
        activities: [],
      });
    }

    strategic.programs.get(item.program).activities.push(item);
    return strategicMap;
  }, new Map());
}

function renderPerformanceTree() {
  const performanceTree = document.querySelector("#performanceTree");
  const grouped = groupCascades();

  performanceTree.innerHTML = Array.from(grouped.entries())
    .map(([strategicName, strategic]) => {
      const programs = Array.from(strategic.programs.entries())
        .map(([programName, program]) => {
          const activities = program.activities
            .map(
              (activity) => `
                <li class="org-activity">
                  <article class="tree-node activity">
                    <span class="node-level">Sasaran Kegiatan</span>
                    <strong>${escapeHtml(activity.activity)}</strong>
                  </article>
                  <article class="tree-node indicator">
                    <span class="node-level">Indikator</span>
                    ${renderIndicatorList(activity.activityIndicators)}
                    <small>Penanggung jawab: ${escapeHtml(activity.owner)}</small>
                  </article>
                </li>
              `
            )
            .join("");

          return `
            <li class="org-program">
              <article class="tree-node program">
                <span class="node-level">Sasaran Program</span>
                <strong>${escapeHtml(programName)}</strong>
                ${renderIndicatorList(program.indicators)}
              </article>
              <ul class="org-activities">${activities}</ul>
            </li>
          `;
        })
        .join("");

      return `
        <section class="org-chart">
          <div class="org-root">
            <article class="tree-node strategic">
              <span class="node-level">Sasaran Strategis</span>
              <strong>${escapeHtml(strategicName)}</strong>
              ${renderIndicatorList(strategic.indicators)}
            </article>
          </div>
          <ul class="org-programs">${programs}</ul>
        </section>
      `;
    })
    .join("");
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
  renderPerformanceTree();
  populateCascadeSelects();
  populateAgreementCascadeSelect();
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

function addUniqueIndicators(existing, incoming) {
  incoming.forEach((indicator) => {
    const exists = existing.some((item) => item.name === indicator.name && item.target === indicator.target);
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
    pages.push(content.items.map((item) => item.str).join("\t"));
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

function renderAgreementPreview() {
  const preview = document.querySelector("#agreementPreview");
  const select = document.querySelector("#agreementCascadeSelect");
  if (!preview || !select) return;

  const plan = cascades[Number(select.value)] || cascades[0];
  if (!plan) {
    preview.innerHTML = "<p class=\"helper-text\">Belum ada sasaran kinerja yang tersedia.</p>";
    return;
  }

  preview.innerHTML = `
    <div class="agreement-summary">
      <strong>${escapeHtml(plan.strategic)}</strong>
      <span>Sasaran strategis</span>
    </div>
    <div class="agreement-summary">
      <strong>${escapeHtml(plan.program)}</strong>
      <span>Sasaran program</span>
    </div>
    <div class="agreement-summary">
      <strong>${escapeHtml(plan.activity)}</strong>
      <span>Sasaran kegiatan - ${escapeHtml(plan.owner)}</span>
    </div>
    ${renderIndicatorList(plan.activityIndicators)}
  `;
}

function renderAgreements() {
  const rows = document.querySelector("#agreementRows");
  if (!rows) return;

  rows.innerHTML = agreements
    .map((agreement, index) => {
      const plan = cascades[agreement.cascadeIndex] || cascades[0];
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
          <td>${plan ? escapeHtml(plan.activity) : "-"}</td>
          <td>${plan ? renderIndicatorList(plan.activityIndicators) : "-"}</td>
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
  document.querySelector("#agreementEditIndex").value = index;
  document.querySelector("#saveAgreement").textContent = "Simpan Perubahan";
  document.querySelector("#cancelAgreementEdit").hidden = false;
  editingAgreementIndex = index;
  renderAgreementPreview();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderDocuments() {
  const documentGrid = document.querySelector("#documentGrid");
  documentGrid.innerHTML = documents
    .map(
      ([title, meta]) => `
        <article class="document-card">
          <strong>${title}</strong>
          <span>${meta}</span>
        </article>
      `
    )
    .join("");
}

function renderReviews() {
  const reviewList = document.querySelector("#reviewList");
  reviewList.innerHTML = reviews
    .map(
      ([title, copy]) => `
        <article class="review-item">
          <strong>${title}</strong>
          <p>${copy}</p>
        </article>
      `
    )
    .join("");
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

document.querySelector("#openEntry").addEventListener("click", () => {
  document.querySelector("#entryDialog").showModal();
});

document.querySelector("#realizationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const indicator = form.get("indicator");
  const value = form.get("value");

  if (!indicator || !value) return;

  alert(`Realisasi ${value}% untuk "${indicator}" berhasil disimpan pada prototype.`);
  event.currentTarget.reset();
});

document.querySelectorAll("[data-add-indicator]").forEach((button) => {
  button.addEventListener("click", () => createIndicatorRow(button.dataset.addIndicator));
});

document.querySelector("#addSasaran").addEventListener("click", () => createSasaranRow());

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

document.querySelector("#importMatrix").addEventListener("click", () => {
  try {
    const rows = parseMatrixText(document.querySelector("#matrixText").value);
    const imported = extractCascadesFromRows(rows);

    if (!imported.length) {
      alert("Matriks belum bisa diekstrak. Periksa nama kolom dan isi sasaran/indikator/target.");
      return;
    }

    cascades = [...imported, ...cascades];
    refreshCascadeViews();
    alert(`${imported.length} baris cascading berhasil diekstrak dan diinput otomatis.`);
  } catch (error) {
    alert(`Gagal membaca matriks: ${error.message}`);
  }
});

document.querySelector("#agreementCascadeSelect").addEventListener("change", renderAgreementPreview);

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
    status: editingAgreementIndex === null ? "Draft" : agreements[editingAgreementIndex].status,
  };

  if (editingAgreementIndex === null) {
    agreements.unshift(payload);
  } else {
    agreements[editingAgreementIndex] = payload;
  }

  renderAgreements();
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
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.deleteAgreement);
    agreements.splice(index, 1);
    renderAgreements();
    if (editingAgreementIndex === index) resetAgreementForm();
  }
});

document.querySelector("#resetAgreements").addEventListener("click", () => {
  agreements = structuredClone(defaultAgreements);
  renderAgreements();
  resetAgreementForm();
});

document.querySelector("#cancelAgreementEdit").addEventListener("click", resetAgreementForm);

renderGoals();
populateCascadeSelects();
populateAgreementCascadeSelect();
resetIndicatorInputs();
renderPlans();
renderPerformanceTree();
renderAgreementPreview();
renderAgreements();
renderDocuments();
renderReviews();
