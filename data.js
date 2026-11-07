const CATEGORIES = [
  { id: "all",       label: "Todos",       icon: "📦" },
  { id: "games",     label: "Jogos",       icon: "🎮" },
  { id: "apps",      label: "Apps",        icon: "📱" },
  { id: "tools",     label: "Ferramentas", icon: "🛠️" },
  { id: "files",     label: "Arquivos",    icon: "📁" },
];

// Imagens genéricas por categoria
const ITEM_IMAGES = {
  games: "images/icon-games.svg",
  apps: "images/icon-apps.svg",
  tools: "images/icon-tools.svg",
  files: "images/icon-files.svg",
  default: "images/icon-default.svg",
};

function itemImage(it) {
  return ITEM_IMAGES[it.category] || ITEM_IMAGES.default;
}

// ============================================================
// GÊNEROS (subcategorias) por PLATAFORMA
// ============================================================
const GENRES = {
  games: ["Ação", "Aventura", "RPG", "Estratégia", "Esportes", "Plataforma", "Corrida", "Social"],
  apps: ["Comunicação", "Música", "Fotografia", "Produtividade", "Social", "Entretenimento"],
  tools: ["Compactação", "Virtualização", "Conversão", "Backup", "Sistema"],
  files: ["ISO", "Pacotes", "Recursos", "Modelos"],
};

// Linhas de destaque da página inicial
const SECTIONS = [
  { id: "mais-baixados", title: "🔥 MAIS BAIXADOS", sub: "Os itens com o maior número de downloads" },
  { id: "lancamentos",   title: "🚀 LANÇAMENTOS",   sub: "Os itens postados mais recentemente" },
  { id: "geral",         title: "🎲 GERAL",         sub: "Todos os itens, em ordem aleatória" },
];

// Idiomas disponíveis no filtro
const LANGUAGES = [
  { id: "pt",   label: "Português",  icon: "🇧🇷" },
  { id: "en",   label: "Inglês",     icon: "🇬🇧" },
  { id: "es",   label: "Espanhol",   icon: "🇪🇸" },
  { id: "fr",   label: "Francês",    icon: "🇫🇷" },
  { id: "de",   label: "Alemão",     icon: "🇩🇪" },
  { id: "ja",   label: "Japonês",    icon: "🇯🇵" },
  { id: "zh",   label: "Chinês",     icon: "🇨🇳" },
  { id: "ru",   label: "Russo",      icon: "🇷🇺" },
  { id: "it",   label: "Italiano",   icon: "🇮🇹" },
];

// Tipos de arquivo disponíveis no filtro
const ITEM_TYPES = [
  { id: "apk",  label: "APK" },
  { id: "exe",  label: "EXE" },
  { id: "zip",  label: "ZIP" },
  { id: "rar",  label: "RAR" },
  { id: "iso",  label: "ISO" },
  { id: "dmg",  label: "DMG" },
];

// ============================================================
// ÍNDICE DE DOWNLOADS
// ============================================================
// Cada item:
//   name        – nome de exibição
//   category    – games | apps | tools | files (PLATAFORMA)
//   genre       – gênero/subcategoria (ex.: "Ação", "Comunicação")
//   image       – imagem do ícone
//   color       – gradiente de cor da capa
//   featured    – true = aparece no carrossel
//   description – descrição completa
//   version     – versão
//   size        – tamanho
//   downloads   – número de downloads
//   date        – data YYYY-MM-DD
//   language    – array de idiomas (ex.: ["pt", "en"])
//   type        – tipo de arquivo (apk | exe | zip | rar | iso | dmg)
//   file        – arquivo em /files
//   OR url      – link externo
// ============================================================

let ITEMS = [
  // ---- DESTAQUES ----
  {
    name: "Minecraft (Java Edition)",
    category: "games", genre: "Aventura",
    color: ["#2b1547", "#7b3fa0"], featured: true,
    description: "Minecraft é um jogo de construção e exploração em mundo aberto onde você pode construir tudo o que imaginar, explorar mundos gerados proceduralmente e sobreviver. Uma experiência infinita de criatividade e aventura.",
    version: "1.21", size: "55 MB", downloads: 15420, date: "2026-10-28",
    language: ["pt", "en", "es"], type: "zip",
    file: "./files/minecraft-java.zip",
  },
  {
    name: "Windows 10 ISO",
    category: "files", genre: "ISO",
    color: ["#1e3a5f", "#3a7ca5"], featured: true,
    description: "Imagem oficial do sistema operacional Windows 10 versão 22H2. Ideal para instalação limpa do sistema em computadores novos ou recuperação do sistema.",
    version: "22H2", size: "5.2 GB", downloads: 18230, date: "2026-07-12",
    language: ["pt", "en", "es", "fr", "de"], type: "iso",
    file: "./files/windows10-iso.iso",
  },
  {
    name: "Galaxy Quest",
    category: "games", genre: "Aventura",
    color: ["#3d1e6d", "#7b2d9e"], featured: true,
    description: "Explore galáxias perigosas, colete recursos e lute contra alienígenas implacáveis em Galaxy Quest. Uma aventura de ficção científica com missões, naves e muito perigo.",
    version: "1.4", size: "88 MB", downloads: 6450, date: "2026-10-08",
    language: ["pt", "en"], type: "zip",
    file: "./files/galaxy-quest.zip",
  },
  // ---- JOGOS ----
  {
    name: "CyberRunner", category: "games", genre: "Ação",
    color: ["#6d1b1b", "#a52a2a"],
    description: "Corra por cidades neon e escape dos drones da corporação em CyberRunner. Um jogo de ação e ritmo com trilha sonora eletrônica e perseguições infinitas.",
    version: "2.0", size: "42 MB", downloads: 7600, date: "2026-10-15",
    language: ["pt", "en", "es", "de"], type: "zip",
    file: "./files/cyberrunner.zip",
  },
  {
    name: "Among Us", category: "games", genre: "Social",
    color: ["#7b1fa2", "#4a148c"],
    description: "Escolha entre tripulantes e impostores numa nave espacial. Descubra quem são os impostores antes que eleseliminem a tripulação. Jogo de dedução social para até 10 jogadores.",
    version: "2026.2", size: "85 MB", downloads: 9870, date: "2026-09-15",
    language: ["pt", "en", "es", "fr", "de", "ja"], type: "zip",
    file: "./files/among-us.zip",
  },
  {
    name: "Space Defenders", category: "games", genre: "Estratégia",
    color: ["#0a2a4a", "#1565c0"],
    description: "Defenda sua base contra ondas de naves inimigas em Space Defenders. Estratégia e ação espacial com armas e upgrades desbloqueáveis.",
    version: "0.9.2", size: "24 MB", downloads: 4200, date: "2026-11-01",
    language: ["pt", "en"], type: "zip",
    file: "./files/space-defenders.zip",
  },
  {
    name: "Pixel Dungeon", category: "games", genre: "RPG",
    color: ["#3e2723", "#5d4037"],
    description: "RPG de exploração com masmorras procedurais. Encontre tesouros, lute contra monstros e sobreviva ao perigo. Um clássico em estilo pixel.",
    version: "3.0", size: "18 MB", downloads: 3100, date: "2026-08-20",
    language: ["pt", "en", "ja"], type: "zip",
    file: "./files/pixel-dungeon.zip",
  },
  {
    name: "Racing Rivals", category: "games", genre: "Corrida",
    color: ["#bf360c", "#e64a19"],
    description: "Corridas arcade rápidas com veículos customizados. Compita contra o relógio e desbloqueie carros e pistas novas.",
    version: "1.2", size: "112 MB", downloads: 2800, date: "2026-09-25",
    language: ["pt", "en", "es", "it"], type: "zip",
    file: "./files/racing-rivals.zip",
  },
  // ---- APPS ----
  {
    name: "WhatsApp Mod", category: "apps", genre: "Comunicação",
    color: ["#0b5e4d", "#138a6e"],
    description: "Aplicativo de mensagens com temas, recursos extras e mais privacidade. Personalize a interface e aproveite funções adicionais.",
    version: "24.10", size: "78 MB", downloads: 12340, date: "2026-10-10",
    language: ["pt", "en", "es", "fr", "de", "it"], type: "apk",
    file: "./files/whatsapp-mod.apk",
  },
  {
    name: "Photoshop 2024", category: "apps", genre: "Fotografia",
    color: ["#1a237e", "#3949ab"],
    description: "Editor de imagens e design profissional. Crie e edite fotos, banners e ilustrações com as ferramentas mais completas do mercado.",
    version: "25.1", size: "3.4 GB", downloads: 8765, date: "2026-10-20",
    language: ["pt", "en", "es", "fr", "de", "ja", "zh", "ru", "it"], type: "rar",
    file: "./files/photoshop-2024.rar",
  },
  {
    name: "Canva Installer", category: "apps", genre: "Produtividade",
    color: ["#e65100", "#f57c00"],
    description: "Ferramenta de design gráfico fácil para iniciantes e profissionais. Crie artefatos visuais em minutos com modelos prontos.",
    version: "1.0", size: "210 MB", downloads: 5430, date: "2026-10-02",
    language: ["pt", "en", "es", "fr", "de"], type: "exe",
    file: "./files/canva-installer.exe",
  },
  {
    name: "MusicPro", category: "apps", genre: "Música",
    color: ["#4a148c", "#7b1fa2"],
    description: "Reprodutor de áudio com equalizador e recursos avançados. Suporta todos os formatos principais e organiza sua biblioteca automaticamente.",
    version: "3.5", size: "32 MB", downloads: 4100, date: "2026-09-30",
    language: ["pt", "en", "es", "fr", "de", "ja", "it"], type: "apk",
    file: "./files/musicpro.apk",
  },
  {
    name: "NoteMaster", category: "apps", genre: "Produtividade",
    color: ["#1b5e20", "#43a047"],
    description: "Anotações e listas de tarefas com sincronização. Organize suas ideias, estudos e tarefas do dia a dia.",
    version: "2.1", size: "14 MB", downloads: 2300, date: "2026-11-02",
    language: ["pt", "en", "es", "fr", "de", "ja", "zh", "ru", "it"], type: "apk",
    file: "./files/notemaster.apk",
  },
  // ---- FERRAMENTAS ----
  {
    name: "WinRAR 6.11", category: "tools", genre: "Compactação",
    color: ["#37474f", "#546e7a"],
    description: "Compactador de arquivos compatível com RAR e ZIP. Extraia e crie arquivos compactados com alta taxa de compressão.",
    version: "6.11", size: "3.4 MB", downloads: 7120, date: "2026-08-30",
    language: ["pt", "en", "es", "fr", "de", "ja", "zh", "ru", "it"], type: "exe",
    file: "./files/winrar-6.11.exe",
  },
  {
    name: "VirtualBox", category: "tools", genre: "Virtualização",
    color: ["#00695c", "#26a69a"],
    description: "Máquinas virtuais para testar sistemas operacionais. Crie ambientes virtuais isolados e seguros no seu computador.",
    version: "7.1", size: "128 MB", downloads: 4560, date: "2026-09-28",
    language: ["pt", "en", "es", "fr", "de", "ja", "zh", "ru", "it"], type: "dmg",
    file: "./files/virtualbox.dmg",
  },
  {
    name: "VideoConverter", category: "tools", genre: "Conversão",
    color: ["#263238", "#455a64"],
    description: "Converta vídeos entre MP4, MKV, AVI e mais. Rápido, simples e com qualidade preservada.",
    version: "4.0", size: "65 MB", downloads: 3900, date: "2026-10-25",
    language: ["pt", "en", "es", "fr", "de", "it"], type: "exe",
    file: "./files/videoconverter.exe",
  },
  {
    name: "BackupPro", category: "tools", genre: "Backup",
    color: ["#283593", "#5c6bc0"],
    description: "Backup automático de arquivos e pastas importantes. Proteja seus dados com agendamento e restauração fácil.",
    version: "1.8", size: "19 MB", downloads: 2100, date: "2026-07-18",
    language: ["pt", "en", "es", "fr", "de"], type: "exe",
    file: "./files/backuppro.exe",
  },
  // ---- ARQUIVOS ----
  {
    name: "Game Assets Pack", category: "files", genre: "Recursos",
    color: ["#4e342e", "#795548"],
    description: "Pacote de recursos para criação de jogos: sprites, músicas, modelos e efeitos. Use em seus projetos e acelere o desenvolvimento.",
    version: "1.0", size: "240 MB", downloads: 2200, date: "2026-11-05",
    language: ["pt", "en"], type: "zip",
    file: "./files/game-assets-pack.zip",
  },
];
