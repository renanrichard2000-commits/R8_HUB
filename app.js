const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const categoryNav = document.getElementById("categories");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("empty");

let currentCategory = "all";

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

function render() {
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
  emptyState.hidden = items.length > 0;

  for (const it of items) {
    const card = document.createElement("div");
    card.className = "card";

    const badges = [];
    if (it.version) badges.push(`<span class="badge">v${escapeHtml(it.version)}</span>`);
    if (it.size && it.size !== "—") badges.push(`<span class="badge">${escapeHtml(it.size)}</span>`);

    const catLabel = CATEGORIES.find((c) => c.id === it.category)?.label ?? it.category;

    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${it.icon ?? "📦"}</div>
        <div class="card-title">${escapeHtml(it.name)}</div>
      </div>
      <p class="card-desc">${escapeHtml(it.description ?? "")}</p>
      <div class="card-meta">
        <span class="badge cat-${escapeHtml(it.category)}">${escapeHtml(catLabel)}</span>
        ${badges.join("")}
      </div>
      <a class="download-btn ${isExternal(it) ? "external" : ""}"
         href="${escapeHtml(downloadUrl(it))}"
         ${isExternal(it) ? 'target="_blank" rel="noopener"' : 'download'}>
        ⬇ Download
      </a>
    `;
    grid.appendChild(card);
  }
}

searchInput.addEventListener("input", render);
renderCategories();
render();
