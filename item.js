// Página única de cada item — acessada via: item.html?id=0

const params = new URLSearchParams(location.search);
const id = parseInt(params.get("id"), 10);
const item = ITEMS[id];
const detailContainer = document.getElementById("itemDetail");
const relatedContainer = document.getElementById("related");

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

function coverStyle(it) {
  const [a, b] = it.color || ["#161b22", "#1a2432"];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function catLabel(it) {
  return CATEGORIES.find((c) => c.id === it.category)?.label ?? it.category;
}

/* ---------- render ---------- */

function render() {
  if (item == null) {
    detailContainer.innerHTML = `
      <div class="empty">
        <p>Item não encontrado.</p>
        <p style="margin-top:1rem"><a class="download-btn" href="index.html">Voltar ao início</a></p>
      </div>
    `;
    relatedContainer.hidden = true;
    return;
  }

  const badges = [];
  badges.push(`<span class="badge cat-${escapeHtml(item.category)}">${escapeHtml(catLabel(item))}</span>`);
  if (item.genre) badges.push(`<span class="badge genre-badge">${escapeHtml(item.genre)}</span>`);
  if (item.version) badges.push(`<span class="badge">v${escapeHtml(item.version)}</span>`);
  if (item.size) badges.push(`<span class="badge">${escapeHtml(item.size)}</span>`);
  if (item.downloads) badges.push(`<span class="badge">⬇ ${formatNum(item.downloads)} downloads</span>`);
  if (item.date) badges.push(`<span class="badge">📅 ${escapeHtml(item.date)}</span>`);

  detailContainer.innerHTML = `
    <div class="item-body">
      <h1 class="item-name">
        <img class="item-name-icon" src="${itemImage(item)}" alt="${escapeHtml(item.name)}" />
        ${escapeHtml(item.name)}
      </h1>
      <div class="item-meta">${badges.join("")}</div>

      <a class="download-btn item-download"
         href="${escapeHtml(downloadUrl(item))}"
         ${isExternal(item) ? 'target="_blank" rel="noopener"' : 'download'}>
        ⬇ Baixar agora
      </a>
      ${item.file ? `<p class="item-hint">Arquivo: <code>${escapeHtml(item.file.replace("./files/", ""))}</code> · ${escapeHtml(item.size || "")}</p>` : ""}

      <h2 class="item-section">DESCRIÇÃO</h2>
      <p class="item-desc">${escapeHtml(item.description ?? "")}</p>
    </div>
  `;

  // itens relacionados (mesma categoria)
  const related = ITEMS.filter((it) => it.category === item.category && it !== item);
  relatedContainer.hidden = !related.length;
  if (related.length) {
    relatedContainer.innerHTML = `
      <div class="row-head">
        <div>
          <h2>🎁 MAIS ITENS DA CATEGORIA</h2>
          <p class="section-sub">${escapeHtml(catLabel(item))}</p>
        </div>
        <a class="ver-mais" href="catalog.html?sec=geral">Ver todos →</a>
      </div>
      <div class="row-scroll" id="relatedScroll"></div>
    `;
    const scroll = relatedContainer.querySelector("#relatedScroll");
    related.slice(0, 8).forEach((it) => scroll.appendChild(miniCard(it)));
  }
}

function miniCard(it) {
  const card = document.createElement("a");
  card.className = "row-card";
  card.href = "item.html?id=" + ITEMS.indexOf(it);
  card.innerHTML = `
    <div class="row-card-cover" style="background: ${coverStyle(it)}">
      <img class="cover-emoji" src="${itemImage(it)}" alt="${escapeHtml(it.name)}" />
      <span class="cover-title">${escapeHtml(it.name)}</span>
    </div>
    <div class="row-card-info">
      <div class="row-card-name">${escapeHtml(it.name)}</div>
      <div class="row-card-meta">
        ${it.downloads ? `⬇ ${formatNum(it.downloads)}` : ""}${it.downloads && it.size ? " · " : ""}${it.size ? `${escapeHtml(it.size)}` : ""}
      </div>
    </div>
  `;
  return card;
}

render();
