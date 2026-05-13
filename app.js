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
  renstra: "Matriks Renstra Satker",
  rencana: "Rencana Kinerja Tahunan",
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

document.querySelector("#performanceYearSelect")?.addEventListener("change", renderPerformanceTree);

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
    if (editingRenstraIndex === index) resetRenstraForm();
  }
});

document.querySelector("#resetRenstra").addEventListener("click", () => {
  renstraItems = structuredClone(defaultRenstra);
  renderRenstraRows();
  populatePerformanceYearSelect();
  renderPerformanceTree();
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

populateCascadeSelects();
populateAgreementCascadeSelect();
populateAgreementIndicatorSelect();
populateRealizationCascadeSelect();
populateRealizationIndicatorSelect();
populatePerformanceYearSelect();
resetIndicatorInputs();
resetRenstraIndicatorInputs();
renderPlans();
renderPerformanceTree();
renderRenstraRows();
renderRealizations();
renderGoals();
renderAgreementPreview();
renderAgreements();
renderDocuments();
renderReviews();
