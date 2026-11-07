const topbarNav = document.getElementById("categories");
const carouselEl = document.getElementById("carousel");
const rowsContainer = document.getElementById("rows");
const searchInput = document.getElementById("search");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("empty");

let currentCategory = "all";
let currentQuery = "";

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

function coverStyle(item) {
  const [a, b] = item.color || ["#161b22", "#1a2432"];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function catLabel(item) {
  return CATEGORIES.find((c) => c.id === item.category)?.label ?? item.category;
}

function matchesFilter(it) {
  const okCat = currentCategory === "all" || it.category === currentCategory;
  const q = currentQuery.trim().toLowerCase();
  const okQ =
    !q ||
    (it.name || "").toLowerCase().includes(q) ||
    (it.description || "").toLowerCase().includes(q);
  return okCat && okQ;
}

/* ---------- carrossel de destaques ---------- */

let carouselSlides = [];
let carouselIndex = 0;
let carouselTimer = null;

function featuredItems() {
  const f = ITEMS.filter((it) => it.featured && matchesFilter(it));
  return f.length ? f : ITEMS.filter(matchesFilter).slice(0, 3);
}

function renderCarousel() {
  carouselSlides = featuredItems();
  carouselEl.innerHTML = "";

  carouselSlides.forEach((item, idx) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (idx === 0 ? " active" : "");
    slide.style.background = coverStyle(item);
    slide.innerHTML = `
      <div class="carousel-emoji">${item.icon}</div>
      <div class="carousel-content">
        <span class="carousel-tag">⭐ DESTAQUE DO MOMENTO</span>
        <h2>${escapeHtml(item.name)}</h2>
        <p class="carousel-desc">${escapeHtml(item.description || "")}</p>
        <div class="carousel-meta">
          <span class="badge cat-${escapeHtml(item.category)}">${escapeHtml(catLabel(item))}</span>
          ${item.size ? `<span class="badge">${escapeHtml(item.size)}</span>` : ""}
          ${item.downloads ? `<span class="badge">⬇ ${formatNum(item.downloads)} downloads</span>` : ""}
        </div>
        <a class="download-btn carousel-btn"
           href="${escapeHtml(downloadUrl(item))}"
           ${isExternal(item) ? 'target="_blank" rel="noopener"' : 'download'}>
          ⬇ Baixar agora
        </a>
      </div>
    `;
    carouselEl.appendChild(slide);
  });

  // pontinhos
  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  carouselSlides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (idx === 0 ? " active" : "");
    dot.setAttribute("aria-label", "veja " + (idx + 1));
    dot.addEventListener("click", () => goTo(idx));
    dots.appendChild(dot);
  });
  carouselEl.appendChild(dots);

  // setas
  const prev = document.createElement("button");
  prev.className = "carousel-arrow prev";
  prev.innerHTML = "‹";
  prev.addEventListener("click", () => goTo(carouselIndex - 1));

  const next = document.createElement("button");
  next.className = "carousel-arrow next";
  next.innerHTML = "›";
  next.addEventListener("click", () => goTo(carouselIndex + 1));

  carouselEl.appendChild(prev);
  carouselEl.appendChild(next);

  startTimer();
}

function goTo(i) {
  const slides = carouselEl.querySelectorAll(".carousel-slide");
  const dots = carouselEl.querySelectorAll(".carousel-dot");
  if (!slides.length) return;
  carouselIndex = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle("active", idx === carouselIndex));
  dots.forEach((d, idx) => d.classList.toggle("active", idx === carouselIndex));
  resetTimer();
}

function startTimer() {
  carouselTimer = setInterval(() => goTo(carouselIndex + 1), 5000);
}

function resetTimer() {
  clearInterval(carouselTimer);
  startTimer();
}

carouselEl.addEventListener("mouseenter", () => clearInterval(carouselTimer));
carouselEl.addEventListener("mouseleave", startTimer);

/* ---------- linhas de itens ---------- */

function sortedItems(sectionId) {
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

function renderRowCard(item) {
  const card = document.createElement("a");
  card.className = "row-card";
  card.href = downloadUrl(item);
  card.setAttribute("download", "");
  card.innerHTML = `
    <div class="row-card-cover" style="background: ${coverStyle(item)}">
      <span class="cover-emoji">${item.icon}</span>
      <span class="cover-title">${escapeHtml(item.name)}</span>
    </div>
    <div class="row-card-info">
      <div class="row-card-name">${escapeHtml(item.name)}</div>
      <div class="row-card-meta">
        ${item.downloads ? `⬇ ${formatNum(item.downloads)}` : ""}${item.downloads && item.size ? " · " : ""}${item.size ? `${escapeHtml(item.size)}` : ""}
      </div>
    </div>
  `;
  return card;
}

function renderRows() {
  rowsContainer.innerHTML = "";
  for (const sec of SECTIONS) {
    const items = sortedItems(sec.id).filter(matchesFilter);
    if (!items.length) continue;

    const row = document.createElement("section");
    row.className = "row";
    row.innerHTML = `
      <div class="row-head">
        <div>
          <h2>${sec.title}</h2>
          <p class="section-sub">${sec.sub}</p>
        </div>
        <a class="ver-mais" href="catalog.html?sec=${sec.id}">Ver mais →</a>
      </div>
      <div class="row-scroll" data-section="${sec.id}"></div>
    `;

    const scroll = row.querySelector(".row-scroll");
    items.slice(0, 12).forEach((it) => scroll.appendChild(renderRowCard(it)));
    rowsContainer.appendChild(row);
  }

  const total = ITEMS.filter(matchesFilter).length;
  resultCount.textContent = `${total} item(s) encontrado(s)`;
  emptyState.hidden = total > 0;
}

/* ---------- categorias no topo ---------- */

function renderTopbar() {
  topbarNav.innerHTML = "";
  for (const cat of CATEGORIES) {
    const chip = document.createElement("button");
    chip.className = "category-chip" + (cat.id === currentCategory ? " active" : "");
    chip.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
    chip.addEventListener("click", () => {
      currentCategory = cat.id;
      renderTopbar();
      renderRows();
      renderCarousel();
    });
    topbarNav.appendChild(chip);
  }
}

/* ---------- busca ---------- */

searchInput.addEventListener("input", () => {
  currentQuery = searchInput.value;
  renderRows();
});

renderTopbar();
renderCarousel();
renderRows();
