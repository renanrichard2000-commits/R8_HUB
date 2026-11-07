// Página única de catálogo — mostra TODOS os itens de uma seção
// Acessada via: catalog.html?sec=mais-baixados | lancamentos | geral

const params = new URLSearchParams(location.search);
const sec = params.get("sec") || "geral";
const section = SECTIONS.find((s) => s.id === sec) || SECTIONS.find((s) => s.id === "geral");

document.getElementById("pageTitle").textContent = section.title;
document.getElementById("pageSub").textContent = section.sub + " — lista completa.";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const categoryNav = document.getElementById("categories");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("empty");

let currentCategory = params.get("cat") || "all";
searchInput.value = params.get("q") || "";

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

/* ---------- card ---------- */

function renderCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const badges = [];
  if (item.genre) badges.push(`<span class="badge genre-badge">${escapeHtml(item.genre)}</span>`);
  if (item.version) badges.push(`<span class="badge">v${escapeHtml(item.version)}</span>`);
  if (item.size) badges.push(`<span class="badge">${escapeHtml(item.size)}</span>`);
  if (item.downloads) badges.push(`<span class="badge">⬇ ${formatNum(item.downloads)}</span>`);
  if (item.date) badges.push(`<span class="badge">📅 ${escapeHtml(item.date)}</span>`);

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
    <a class="download-btn ${isExternal(item) ? "external" : ""}"
       href="${escapeHtml(downloadUrl(item))}"
       ${isExternal(item) ? 'target="_blank" rel="noopener"' : 'download'}>
      ⬇ Download
    </a>
  `;
  return card;
}

/* ---------- ordenação da seção ---------- */

function sortedItems() {
  let items = ITEMS.slice();
  if (sec === "mais-baixados") {
    items.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sec === "lancamentos") {
    items.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  } else {
    items = shuffle(items);
  }
  return items;
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
      renderCategories();
      render();
    });
    categoryNav.appendChild(chip);
  }
}

/* ---------- render ---------- */

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const items = sortedItems().filter((it) => {
    const matchesCat = currentCategory === "all" || it.category === currentCategory;
    const matchesQ =
      !q ||
      (it.name || "").toLowerCase().includes(q) ||
      (it.description || "").toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  resultCount.textContent = `${items.length} item(s) em "${section.title}"`;
  grid.innerHTML = "";
  items.forEach((it) => grid.appendChild(renderCard(it)));
  emptyState.hidden = items.length > 0;
}

/* ---------- eventos ---------- */

searchInput.addEventListener("input", render);
renderCategories();
render();
