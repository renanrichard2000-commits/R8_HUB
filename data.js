const CATEGORIES = [
  { id: "all",       label: "Todos",       icon: "📦" },
  { id: "games",     label: "Jogos",       icon: "🎮" },
  { id: "apps",      label: "Apps",        icon: "📱" },
  { id: "tools",     label: "Ferramentas", icon: "🛠️" },
  { id: "files",     label: "Arquivos",    icon: "📁" },
];

// Destaques da página inicial — edite se quiser
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
//   icon        – emoji
//   description – uma linha curta
//   version     – versão (opcional)
//   size        – tamanho (opcional, ex.: "12.3 MB")
//   downloads   – número de downloads (para o bloco MAIS BAIXADOS)
//   date        – data de lançamento no formato YYYY-MM-DD (LANÇAMENTOS)
//   file        – arquivo dentro da pasta /files
//   OR
//   url         – link externo (ex.: release do GitHub)
//
// Os itens abaixo são DEMONSTRAÇÃO — substitua pelos seus arquivos.
// Para regenerar a lista a partir dos arquivos da pasta /files:
//   python scripts/update_index.py
// ============================================================

let ITEMS = [
  {
    name: "Windows 10 ISO",
    category: "files",
    icon: "💿",
    description: "Imagem oficial do sistema operacional Windows 10 22H2.",
    version: "22H2",
    size: "5.2 GB",
    downloads: 18230,
    date: "2026-07-12",
    file: "./files/windows10-iso.iso",
  },
  {
    name: "Minecraft (Java Edition)",
    category: "games",
    icon: "⛏️",
    description: "Jogo de construção e exploração em mundo aberto.",
    version: "1.21",
    size: "55 MB",
    downloads: 15420,
    date: "2026-10-28",
    file: "./files/minecraft-java.zip",
  },
  {
    name: "WhatsApp Mod",
    category: "apps",
    icon: "💬",
    description: "Aplicativo de mensagens com temas e recursos extras.",
    version: "24.10",
    size: "78 MB",
    downloads: 12340,
    date: "2026-10-10",
    file: "./files/whatsapp-mod.apk",
  },
  {
    name: "Among Us",
    category: "games",
    icon: "👨‍🚀",
    description: "Jogo de dedução social para até 10 jogadores online.",
    version: "2026.2",
    size: "85 MB",
    downloads: 9870,
    date: "2026-09-15",
    file: "./files/among-us.zip",
  },
  {
    name: "Photoshop 2024",
    category: "apps",
    icon: "🖌️",
    description: "Editor de imagens e design profissional.",
    version: "25.1",
    size: "3.4 GB",
    downloads: 8765,
    date: "2026-10-20",
    file: "./files/photoshop-2024.rar",
  },
  {
    name: "WinRAR 6.11",
    category: "tools",
    icon: "🗜️",
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
    description: "Máquinas virtuais para testar sistemas operacionais.",
    version: "7.1",
    size: "128 MB",
    downloads: 4560,
    date: "2026-09-28",
    file: "./files/virtualbox.dmg",
  },
  {
    name: "Canva Installer",
    category: "apps",
    icon: "🎨",
    description: "Ferramenta de design gráfico para iniciantes.",
    version: "1.0",
    size: "210 MB",
    downloads: 5430,
    date: "2026-10-02",
    file: "./files/canva-installer.exe",
  },
  {
    name: "NullSpace Emulator",
    category: "games",
    icon: "🕹️",
    description: "Emulador multiplataforma para jogos retro.",
    version: "3.1.2",
    size: "12 MB",
    downloads: 3210,
    date: "2026-11-01",
    file: "./files/nullspace-emu.zip",
  },
  {
    name: "Game Assets Pack",
    category: "files",
    icon: "🗃️",
    description: "Pacote de recursos (sprites, músicas, modelos) para jogos.",
    version: "1.0",
    size: "240 MB",
    downloads: 2200,
    date: "2026-11-05",
    file: "./files/game-assets-pack.zip",
  },
];
