const sectionsContainer = document.getElementById("sections");
const resultsArea = document.getElementById("resultsArea");
const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const categoryNav = document.getElementById("categories");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("empty");
const backToSections = document.getElementById("backToSections");

let currentCategory = "all";
let mode = "sections"; // "sections" (destaques) ou "results" (busca/filtro)

/* ---------- helpers ---------- */

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatNum(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

function downloadUrl(item) {
  return item.url ? item.url : item.file;
}

function isExternal(item) {
  return !!item.url;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

/* ---------- card ---------- */

function renderCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const badges = [];
  if (item.version) badges.push(`<span class="badge">v${escapeHtml(item.version)}</span>`);
  if (item.size) badges.push(`<span class="badge">${escapeHtml(item.size)}</span>`);
  if (item.downloads) badges.push(`<span class="badge">⬇ ${formatNum(item.downloads)}</span>`);

  const catLabel = CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;

  card.innerHTML = `
    <div class="card-top">
      <div class="card-icon">${item.icon ?? "📦"}</div>
      <div class="card-title">${escapeHtml(item.name)}</div>
    </div>
    <p class="card-desc">${escapeHtml(item.description ?? "")}</p>
    <div class="card-meta">
      <span class="badge cat-${escapeHtml(item.category)}">${escapeHtml(catLabel)}</span>
      ${badges.join("")}
    </div>
    <a class="download-btn ${isExternal(item) ? "external" : ""}"
       href="${escapeHtml(downloadUrl(item))}"
       ${isExternal(it) ? 'target="_blank" rel="noopener"' : 'download'}>
      ⬇ Download
    </a>
  `;
  return card;
}

/* ---------- categorias ---------- */

function renderCategories() {
  categoryNav.innerHTML = "";
  for (const cat of CATEGORIES) {
    const chip = document.createElement("button");
    chip.className = "category-chip" + (cat.id === currentCategory ? " active" : "");
    chip.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
    chip.addEventListener("click", () => {
      currentCategory = cat.id;
      mode = "results";
      renderCategories();
      render();
    });
    categoryNav.appendChild(chip);
  }
}

/* ---------- destaques da página inicial ---------- */

function sectionItems(sectionId) {
  let items = ITEMS.slice();
  if (sectionId === "mais-baixados") {
    items.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sectionId === "lancamentos") {
    items.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  } else {
    items = shuffle(items);
  }
  return items;
}

function renderSections() {
  sectionsContainer.innerHTML = "";
  for (const sec of SECTIONS) {
    const section = document.createElement("section");
    section.className = "section";

    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML = `
      <div>
        <h2>${sec.title}</h2>
        <p class="section-sub">${sec.sub}</p>
      </div>
      <a class="ver-mais" href="catalog.html?sec=${sec.id}">Ver mais →</a>
    `;

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "section-grid";
    sectionGrid.setAttribute("data-section", sec.id);

    sectionItems(sec.id).slice(0, 6).forEach((it) => sectionGrid.appendChild(renderCard(it)));

    section.appendChild(head);
    section.appendChild(sectionGrid);
    sectionsContainer.appendChild(section);
  }
}

/* ---------- resultados (busca/filtro) ---------- */

function renderResults() {
  const q = searchInput.value.trim().toLowerCase();
  const items = ITEMS.filter((it) => {
    const matchesCat = currentCategory === "all" || it.category === currentCategory;
    const matchesQ =
      !q ||
      (it.name || "").toLowerCase().includes(q) ||
      (it.description || "").toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  resultCount.textContent = `${items.length} item(s) encontrado(s)`;
  grid.innerHTML = "";
  items.forEach((it) => grid.appendChild(renderCard(it)));
  emptyState.hidden = items.length > 0;
}

/* ---------- render principal ---------- */

function render() {
  if (mode === "sections") {
    sectionsContainer.hidden = false;
    resultsArea.hidden = true;
    renderSections();
  } else {
    sectionsContainer.hidden = true;
    resultsArea.hidden = false;
    renderResults();
  }
}

/* ---------- eventos ---------- */

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim()) {
    mode = "results";
    render();
  }
});

backToSections.addEventListener("click", () => {
  searchInput.value = "";
  currentCategory = "all";
  mode = "sections";
  renderCategories();
  render();
});

renderCategories();
render();
