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
//   description – descrição completa do item
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
    description: "Minecraft é um jogo de construção e exploração em mundo aberto onde você pode construir tudo o que imaginar, explorar mundos gerados proceduralmente e sobreviver. Uma experiência infinita de criatividade e aventura.",
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
    description: "Imagem oficial do sistema operacional Windows 10 versão 22H2. Ideal para instalação limpa do sistema em computadores novos ou recuperação do sistema.",
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
    description: "Explore galáxias perigosas, colete recursos e lute contra alienígenas implacáveis em Galaxy Quest. Uma aventura de ficção científica com missões, naves e muito perigo.",
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
    description: "Corra por cidades neon e escape dos drones da corporação em CyberRunner. Um jogo de ação e ritmo com trilha sonora eletrônica e perseguições infinitas.",
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
    description: "Escolha entre tripulantes e impostores numa nave espacial. Descubra quem são os impostores antes que eleseliminem a tripulação. Jogo de dedução social para até 10 jogadores.",
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
    description: "Defenda sua base contra ondas de naves inimigas em Space Defenders. Estratégia e ação espacial com armas e upgrades desbloqueáveis.",
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
    description: "RPG de exploração com masmorras procedurais. Encontre tesouros, lute contra monstros e sobreviva ao perigo. Um clássico em estilo pixel.",
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
    description: "Corridas arcade rápidas com veículos customizados. Compita contra o relógio e desbloqueie carros e pistas novas.",
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
    description: "Aplicativo de mensagens com temas, recursos extras e mais privacidade. Personalize a interface e aproveite funções adicionais.",
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
    description: "Editor de imagens e design profissional. Crie e edite fotos, banners e ilustrações com as ferramentas mais completas do mercado.",
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
    description: "Ferramenta de design gráfico fácil para iniciantes e profissionais. Crie artefatos visuais em minutos com modelos prontos.",
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
    description: "Reprodutor de áudio com equalizador e recursos avançados. Suporta todos os formatos principais e organiza sua biblioteca automaticamente.",
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
    description: "Anotações e listas de tarefas com sincronização. Organize suas ideias, estudos e tarefas do dia a dia.",
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
    description: "Compactador de arquivos compatível com RAR e ZIP. Extraia e crie arquivos compactados com alta taxa de compressão.",
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
    description: "Máquinas virtuais para testar sistemas operacionais. Crie ambientes virtuais isolados e seguros no seu computador.",
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
    description: "Converta vídeos entre MP4, MKV, AVI e mais. Rápido, simples e com qualidade preservada.",
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
    description: "Backup automático de arquivos e pastas importantes. Proteja seus dados com agendamento e restauração fácil.",
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
    description: "Pacote de recursos para criação de jogos: sprites, músicas, modelos e efeitos. Use em seus projetos e acelere o desenvolvimento.",
    version: "1.0",
    size: "240 MB",
    downloads: 2200,
    date: "2026-11-05",
    file: "./files/game-assets-pack.zip",
  },
];
