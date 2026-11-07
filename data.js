const CATEGORIES = [
  { id: "all",       label: "Todos",       icon: "📦" },
  { id: "games",     label: "Jogos",       icon: "🎮" },
  { id: "apps",      label: "Apps",        icon: "📱" },
  { id: "tools",     label: "Ferramentas", icon: "🛠️" },
  { id: "files",     label: "Arquivos",    icon: "📁" },
];

// Linhas de destaque da página inicial
const SECTIONS = [
  { id: "mais-baixados", title: "🔥 MAIS BAIXADOS", sub: "Os itens com o maior número de downloads" },
  { id: "lancamentos",   title: "🚀 LANÇAMENTOS",   sub: "Os itens postados mais recentemente" },
  { id: "geral",         title: "🎲 GERAL",         sub: "Todos os itens, em ordem aleatória" },
];

// ============================================================
// ÍNDICE DE DOWNLOADS
// ============================================================
// Cada item:
//   name        – nome de exibição
//   category    – games | apps | tools | files
//   icon        – emoji (age como "capa" do item)
//   color       – gradiente de cor da capa [início, fim]
//   featured    – true = aparece no carrossel de destaques
//   description – uma linha curta
//   version     – versão (opcional)
//   size        – tamanho (opcional, ex.: "12.3 MB")
//   downloads   – número de downloads (MAIS BAIXADOS)
//   date        – data de lançamento YYYY-MM-DD (LANÇAMENTOS)
//   file        – arquivo dentro da pasta /files
//   OR
//   url         – link externo (ex.: release do GitHub)
//
// Os itens abaixo são DEMONSTRAÇÃO — substitua pelos seus arquivos.
// Para regenerar a lista a partir dos arquivos da pasta /files:
//   python scripts/update_index.py
// ============================================================

let ITEMS = [
  // ---- DESTAQUES DO CARROSEL ----
  {
    name: "Minecraft (Java Edition)",
    category: "games",
    icon: "⛏️",
    color: ["#2b1547", "#7b3fa0"],
    featured: true,
    description: "Jogo de construção e exploração em mundo aberto.",
    version: "1.21",
    size: "55 MB",
    downloads: 15420,
    date: "2026-10-28",
    file: "./files/minecraft-java.zip",
  },
  {
    name: "Windows 10 ISO",
    category: "files",
    icon: "💿",
    color: ["#1e3a5f", "#3a7ca5"],
    featured: true,
    description: "Imagem oficial do sistema operacional Windows 10 22H2.",
    version: "22H2",
    size: "5.2 GB",
    downloads: 18230,
    date: "2026-07-12",
    file: "./files/windows10-iso.iso",
  },
  {
    name: "Galaxy Quest",
    category: "games",
    icon: "🚀",
    color: ["#3d1e6d", "#7b2d9e"],
    featured: true,
    description: "Explore galáxias perigosas e lute contra alienígenas implacáveis.",
    version: "1.4",
    size: "88 MB",
    downloads: 6450,
    date: "2026-10-08",
    file: "./files/galaxy-quest.zip",
  },
  // ---- JOGOS ----
  {
    name: "CyberRunner",
    category: "games",
    icon: "🏃",
    color: ["#6d1b1b", "#a52a2a"],
    description: "Corra por cidades neon e escape dos drones da corporação.",
    version: "2.0",
    size: "42 MB",
    downloads: 7600,
    date: "2026-10-15",
    file: "./files/cyberrunner.zip",
  },
  {
    name: "Among Us",
    category: "games",
    icon: "👨‍🚀",
    color: ["#7b1fa2", "#4a148c"],
    description: "Escolha entre tripulantes e impostores numa nave espacial.",
    version: "2026.2",
    size: "85 MB",
    downloads: 9870,
    date: "2026-09-15",
    file: "./files/among-us.zip",
  },
  {
    name: "Space Defenders",
    category: "games",
    icon: "🛸",
    color: ["#0a2a4a", "#1565c0"],
    description: "Defenda sua base contra ondas de naves inimigas.",
    version: "0.9.2",
    size: "24 MB",
    downloads: 4200,
    date: "2026-11-01",
    file: "./files/space-defenders.zip",
  },
  {
    name: "Pixel Dungeon",
    category: "games",
    icon: "🗡️",
    color: ["#3e2723", "#5d4037"],
    description: "RPG de exploração com masmorras procedurais.",
    version: "3.0",
    size: "18 MB",
    downloads: 3100,
    date: "2026-08-20",
    file: "./files/pixel-dungeon.zip",
  },
  {
    name: "Racing Rivals",
    category: "games",
    icon: "🏎️",
    color: ["#bf360c", "#e64a19"],
    description: "Corridas arcade com veículos customizados.",
    version: "1.2",
    size: "112 MB",
    downloads: 2800,
    date: "2026-09-25",
    file: "./files/racing-rivals.zip",
  },
  // ---- APPS ----
  {
    name: "WhatsApp Mod",
    category: "apps",
    icon: "💬",
    color: ["#0b5e4d", "#138a6e"],
    description: "Mensagens com temas, recursos extras e mais privacidade.",
    version: "24.10",
    size: "78 MB",
    downloads: 12340,
    date: "2026-10-10",
    file: "./files/whatsapp-mod.apk",
  },
  {
    name: "Photoshop 2024",
    category: "apps",
    icon: "🖌️",
    color: ["#1a237e", "#3949ab"],
    description: "Editor de imagens e design profissional.",
    version: "25.1",
    size: "3.4 GB",
    downloads: 8765,
    date: "2026-10-20",
    file: "./files/photoshop-2024.rar",
  },
  {
    name: "Canva Installer",
    category: "apps",
    icon: "🎨",
    color: ["#e65100", "#f57c00"],
    description: "Design gráfico fácil para iniciantes e profissionais.",
    version: "1.0",
    size: "210 MB",
    downloads: 5430,
    date: "2026-10-02",
    file: "./files/canva-installer.exe",
  },
  {
    name: "MusicPro",
    category: "apps",
    icon: "🎵",
    color: ["#4a148c", "#7b1fa2"],
    description: "Reprodutor de áudio com equalizador e recursos avançados.",
    version: "3.5",
    size: "32 MB",
    downloads: 4100,
    date: "2026-09-30",
    file: "./files/musicpro.apk",
  },
  {
    name: "NoteMaster",
    category: "apps",
    icon: "📒",
    color: ["#1b5e20", "#43a047"],
    description: "Anotações e listas de tarefas com sincronização.",
    version: "2.1",
    size: "14 MB",
    downloads: 2300,
    date: "2026-11-02",
    file: "./files/notemaster.apk",
  },
  // ---- FERRAMENTAS ----
  {
    name: "WinRAR 6.11",
    category: "tools",
    icon: "🗜️",
    color: ["#37474f", "#546e7a"],
    description: "Compactador de arquivos compatível com RAR e ZIP.",
    version: "6.11",
    size: "3.4 MB",
    downloads: 7120,
    date: "2026-08-30",
    file: "./files/winrar-6.11.exe",
  },
  {
    name: "VirtualBox",
    category: "tools",
    icon: "🖥️",
    color: ["#00695c", "#26a69a"],
    description: "Máquinas virtuais para testar sistemas operacionais.",
    version: "7.1",
    size: "128 MB",
    downloads: 4560,
    date: "2026-09-28",
    file: "./files/virtualbox.dmg",
  },
  {
    name: "VideoConverter",
    category: "tools",
    icon: "🎬",
    color: ["#263238", "#455a64"],
    description: "Converta vídeos entre MP4, MKV, AVI e mais.",
    version: "4.0",
    size: "65 MB",
    downloads: 3900,
    date: "2026-10-25",
    file: "./files/videoconverter.exe",
  },
  {
    name: "BackupPro",
    category: "tools",
    icon: "💾",
    color: ["#283593", "#5c6bc0"],
    description: "Backup automático de arquivos e pastas importantes.",
    version: "1.8",
    size: "19 MB",
    downloads: 2100,
    date: "2026-07-18",
    file: "./files/backuppro.exe",
  },
  // ---- ARQUIVOS ----
  {
    name: "Game Assets Pack",
    category: "files",
    icon: "🗃️",
    color: ["#4e342e", "#795548"],
    description: "Sprites, músicas e modelos para criar seus jogos.",
    version: "1.0",
    size: "240 MB",
    downloads: 2200,
    date: "2026-11-05",
    file: "./files/game-assets-pack.zip",
  },
];
