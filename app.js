const topbarNav = document.getElementById("categories");
const carouselEl = document.getElementById("carousel");
const rowsContainer = document.getElementById("rows");
const searchInput = document.getElementById("search");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("empty");
const genreBar = document.getElementById("genreBar");
const genreChips = document.getElementById("genreChips");

let currentCategory = "all";   // plataforma selecionada
let currentGenre = "all";      // gênero selecionado
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

function matchesFilter(it) {
  const okCat = currentCategory === "all" || it.category === currentCategory;
  const okGenre = currentGenre === "all" || it.genre === currentGenre;
  const q = currentQuery.trim().toLowerCase();
  const okQ =
    !q ||
    (it.name || "").toLowerCase().includes(q) ||
    (it.description || "").toLowerCase().includes(q);
  return okCat && okGenre && okQ;
}

/* ---------- gêneros ---------- */

function renderGenreBar() {
  if (currentCategory === "all") {
    genreBar.hidden = true;
    currentGenre = "all";
    return;
  }

  genreBar.hidden = false;
  const genres = GENRES[currentCategory] || [];

  genreChips.innerHTML = "";

  const allChip = document.createElement("button");
  allChip.className = "genre-chip" + (currentGenre === "all" ? " active" : "");
  allChip.textContent = "Todos";
  allChip.addEventListener("click", () => {
    currentGenre = "all";
    renderGenreBar();
    renderRows();
    renderCarousel();
  });
  genreChips.appendChild(allChip);

  for (const g of genres) {
    const chip = document.createElement("button");
    chip.className = "genre-chip" + (currentGenre === g ? " active" : "");
    chip.textContent = g;
    chip.addEventListener("click", () => {
      currentGenre = g;
      renderGenreBar();
      renderRows();
      renderCarousel();
    });
    genreChips.appendChild(chip);
  }
}

/* ---------- carrossel ---------- */

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
      <img class="carousel-emoji" src="${itemImage(item)}" alt="${escapeHtml(item.name)}" />
      <div class="carousel-content">
        <span class="carousel-tag">⭐ DESTAQUE DO MOMENTO</span>
        <h2>${escapeHtml(item.name)}</h2>
        <p class="carousel-desc">${escapeHtml(item.description || "")}</p>
        <div class="carousel-meta">
          <span class="badge cat-${escapeHtml(item.category)}">${escapeHtml(catLabel(item))}</span>
          <span class="badge genre-badge">${escapeHtml(item.genre || "—")}</span>
          ${item.size ? `<span class="badge">${escapeHtml(item.size)}</span>` : ""}
          ${item.downloads ? `<span class="badge">⬇ ${formatNum(item.downloads)} downloads</span>` : ""}
        </div>
        <a class="download-btn carousel-btn" href="item.html?id=${ITEMS.indexOf(item)}">📄 Ver detalhes</a>
      </div>
    `;
    carouselEl.appendChild(slide);
  });

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

/* ---------- linhas ---------- */

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
  card.href = `item.html?id=${ITEMS.indexOf(item)}`;
  card.innerHTML = `
    <div class="row-card-cover" style="background: ${coverStyle(item)}">
      <img class="cover-emoji" src="${itemImage(item)}" alt="${escapeHtml(item.name)}" />
      <span class="cover-title">${escapeHtml(item.name)}</span>
    </div>
    <div class="row-card-info">
      <div class="row-card-name">${escapeHtml(item.name)}</div>
      <div class="row-card-meta">
        <span class="genre-mini">${escapeHtml(item.genre || "—")}</span>
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

/* ---------- topbar (plataformas) ---------- */

function renderTopbar() {
  topbarNav.innerHTML = "";
  for (const cat of CATEGORIES) {
    const chip = document.createElement("button");
    chip.className = "category-chip" + (cat.id === currentCategory ? " active" : "");
    chip.innerHTML = `<span>${cat.icon}</span> ${cat.label}`;
    chip.addEventListener("click", () => {
      currentCategory = cat.id;
      renderTopbar();
      renderGenreBar();
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
renderGenreBar();
renderCarousel();
renderRows();
