// Página de busca com filtros — acessada via: search.html
// Filtros: plataformas, gêneros, idiomas, tipo do item

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("empty");
const filterPanel = document.getElementById("filterPanel");
const toggleFilters = document.getElementById("toggleFilters");
const closeFilters = document.getElementById("closeFilters");
const clearFiltersBtn = document.getElementById("clearFilters");

let selectedCategories = new Set();
let selectedGenres = new Set();
let selectedLanguages = new Set();
let selectedTypes = new Set();
let currentQuery = "";

/* ---------- helpers ---------- */

function formatNum(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

function downloadUrl(it) {
  return it.url ? it.url : it.file;
}

function isExternal(it) {
  return !!it.url;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function catLabel(it) {
  return CATEGORIES.find((c) => c.id === it.category)?.label ?? it.category;
}

function itemImage(it) {
  return ITEM_IMAGES[it.category] || ITEM_IMAGES.default;
}

function typeLabel(it) {
  const t = ITEM_TYPES.find((x) => x.id === it.type);
  return t ? t.label : (it.type || "—");
}

/* ---------- card ---------- */

function renderCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const badges = [];
  badges.push(`<span class="badge genre-badge">${escapeHtml(item.genre || "—")}</span>`);
  if (item.version) badges.push(`<span class="badge">v${escapeHtml(item.version)}</span>`);
  if (item.size) badges.push(`<span class="badge">${escapeHtml(item.size)}</span>`);
  if (item.downloads) badges.push(`<span class="badge">⬇ ${formatNum(item.downloads)}</span>`);
  if (item.date) badges.push(`<span class="badge">📅 ${escapeHtml(item.date)}</span>`);
  badges.push(`<span class="badge type-badge">${escapeHtml(typeLabel(item))}</span>`);

  const langs = (item.language || [])
    .map((l) => LANGUAGES.find((x) => x.id === l)?.label)
    .filter(Boolean)
    .join(", ");

  const catLabel = CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;

  card.innerHTML = `
    <div class="card-top">
      <img class="card-icon" src="${itemImage(item)}" alt="${escapeHtml(item.name)}" />
      <a class="card-title" href="item.html?id=${ITEMS.indexOf(item)}">${escapeHtml(item.name)}</a>
    </div>
    <p class="card-desc">${escapeHtml(item.description ?? "")}</p>
    <div class="card-meta">
      <span class="badge cat-${escapeHtml(item.category)}">${escapeHtml(catLabel)}</span>
      ${badges.join("")}
    </div>
    <div class="card-langs">🌐 ${escapeHtml(langs || "—")}</div>
    <a class="download-btn ${isExternal(item) ? "external" : ""}"
       href="${escapeHtml(downloadUrl(item))}"
       ${isExternal(item) ? 'target="_blank" rel="noopener"' : 'download'}>
      ⬇ Download
    </a>
  `;
  return card;
}

/* ---------- filtros ---------- */

function matchesFilters(it) {
  if (selectedCategories.size && !selectedCategories.has(it.category)) return false;
  if (selectedGenres.size && !selectedGenres.has(it.genre)) return false;
  if (selectedLanguages.size) {
    const itemLangs = new Set(it.language || []);
    let hasLang = false;
    selectedLanguages.forEach((l) => {
      if (itemLangs.has(l)) hasLang = true;
    });
    if (!hasLang) return false;
  }
  if (selectedTypes.size && !selectedTypes.has(it.type)) return false;

  const q = currentQuery.trim().toLowerCase();
  if (q) {
    const ok =
      (it.name || "").toLowerCase().includes(q) ||
      (it.description || "").toLowerCase().includes(q);
    if (!ok) return false;
  }
  return true;
}

function renderFilterPlatforms() {
  const catWrap = document.getElementById("filterCategories");
  catWrap.innerHTML = "";
  for (const cat of CATEGORIES) {
    if (cat.id === "all") continue;
    const cb = document.createElement("label");
    cb.className = "filter-item";
    cb.innerHTML = `
      <input type="checkbox" value="${cat.id}" ${selectedCategories.has(cat.id) ? "checked" : ""} />
      <span class="filter-check"></span>
      <span>${cat.icon} ${cat.label}</span>
    `;
    cb.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) selectedCategories.add(cat.id);
      else selectedCategories.delete(cat.id);
      renderFilterGenres();
      render();
    });
    catWrap.appendChild(cb);
  }
}

function renderFilterGenres() {
  const genreWrap = document.getElementById("filterGenres");
  genreWrap.innerHTML = "";

  //coleta os gêneros das plataformas selecionadas
  const genreSet = new Set();
  selectedCategories.forEach((cat) => {
    (GENRES[cat] || []).forEach((g) => genreSet.add(g));
  });
  const genres = Array.from(genreSet);

  if (!genres.length) {
    genreWrap.innerHTML = '<p class="filter-empty">Selecione uma plataforma para ver os gêneros.</p>';
    return;
  }

  for (const g of genres) {
    const cb = document.createElement("label");
    cb.className = "filter-item";
    cb.innerHTML = `
      <input type="checkbox" value="${escapeHtml(g)}" ${selectedGenres.has(g) ? "checked" : ""} />
      <span class="filter-check"></span>
      <span>${escapeHtml(g)}</span>
    `;
    cb.querySelector("input").addEventListener("change", (e) => {
      const val = e.target.value;
      if (e.target.checked) selectedGenres.add(val);
      else selectedGenres.delete(val);
      render();
    });
    genreWrap.appendChild(cb);
  }
}

function renderFilterLanguages() {
  const langWrap = document.getElementById("filterLanguages");
  langWrap.innerHTML = "";
  for (const lang of LANGUAGES) {
    const cb = document.createElement("label");
    cb.className = "filter-item";
    cb.innerHTML = `
      <input type="checkbox" value="${lang.id}" ${selectedLanguages.has(lang.id) ? "checked" : ""} />
      <span class="filter-check"></span>
      <span>${lang.icon} ${lang.label}</span>
    `;
    cb.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) selectedLanguages.add(lang.id);
      else selectedLanguages.delete(lang.id);
      render();
    });
    langWrap.appendChild(cb);
  }
}

function renderFilterTypes() {
  const typeWrap = document.getElementById("filterTypes");
  typeWrap.innerHTML = "";
  for (const t of ITEM_TYPES) {
    const cb = document.createElement("label");
    cb.className = "filter-item";
    cb.innerHTML = `
      <input type="checkbox" value="${t.id}" ${selectedTypes.has(t.id) ? "checked" : ""} />
      <span class="filter-check"></span>
      <span>${t.label}</span>
    `;
    cb.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) selectedTypes.add(t.id);
      else selectedTypes.delete(t.id);
      render();
    });
    typeWrap.appendChild(cb);
  }
}

/* ---------- render ---------- */

function render() {
  const items = ITEMS.filter(matchesFilters);
  resultCount.textContent = `${items.length} item(s) encontrado(s)`;
  grid.innerHTML = "";
  items.forEach((it) => grid.appendChild(renderCard(it)));
  emptyState.hidden = items.length > 0;
}

/* ---------- eventos ---------- */

searchInput.addEventListener("input", () => {
  currentQuery = searchInput.value;
  render();
});

toggleFilters.addEventListener("click", () => {
  filterPanel.classList.add("open");
});

closeFilters.addEventListener("click", () => {
  filterPanel.classList.remove("open");
});

clearFiltersBtn.addEventListener("click", () => {
  selectedCategories.clear();
  selectedGenres.clear();
  selectedLanguages.clear();
  selectedTypes.clear();
  searchInput.value = "";
  currentQuery = "";
  renderFilterPlatforms();
  renderFilterGenres();
  renderFilterLanguages();
  renderFilterTypes();
  render();
});

/* ---------- init ---------- */

renderFilterPlatforms();
renderFilterGenres();
renderFilterLanguages();
renderFilterTypes();
render();
