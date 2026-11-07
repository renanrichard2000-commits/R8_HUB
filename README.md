# Nexus Downloads

Site de downloads de **jogos, apps, ferramentas e arquivos**, com visual estilo Steam, hospedado de graça no **GitHub Pages**.

## Como funciona

- `index.html` / `style.css` / `app.js` → página inicial estilo Steam
- `item.html` / `item.js` → **página única de cada item** (clique em qualquer item)
- `catalog.html` / `catalog.js` → página única que lista **todos** os itens de uma seção
- `data.js` → lista de itens para download (gerado automaticamente ou editável manualmente)
- `files/` → coloque todos os arquivos que quiser disponibilizar aqui
- `scripts/update_index.py` → regera `data.js` a partir do conteúdo de `files/`

## Página inicial (estilo Steam)

- **Barra superior fixa** com logo, categorias (Todos/Jogos/Apps/Ferramentas/Arquivos) e busca
- **Carrossel de destaques** (destaque do momento) — gira automaticamente a cada 5s, com setas e pontinhos
- **Linhas horizontais** roláveis: 🔥 MAIS BAIXADOS · 🚀 LANÇAMENTOS · 🎲 GERAL
- Cada item tem capa colorida (emoji + gradiente definido em `color`)
- Botão **Ver mais →** em cada linha abre `catalog.html?sec=...` com **todos** os itens da seção

## Página de cada item (item.html?id=N)

**Toda e qualquer item tem uma página própria**, igual ao Steam:

- Capa colorida com ícone
- Nome do item
- Metas (categoria, versão, tamanho, downloads, data)
- **DESCRIÇÃO** completa
- Botão **⬇ Baixar agora**
- Nome do arquivo disponível
- **MAIS ITENS DA CATEGORIA** (itens relacionados clicáveis)

Clicar em qualquer item na página inicial ou no catálogo abre sua página própria.

## Como adicionar um novo download

**Opção A — automático:**
```bash
# 1. jogue o arquivo na pasta files/
cp meu-jogo.zip files/

# 2. regenera o índice (novos itens começam com 0 downloads e data atual)
python scripts/update_index.py

# 3. commit e push
git add .
git commit -m "adicionou meu-jogo.zip"
git push
```
Depois edite `data.js` para colocar a descrição, versão, tamanho, `downloads`, `date`, `color` e `featured` de cada item.

**Opção B — manual:** edite `data.js` e adicione um item no formato:
```js
{
  name: "Meu Jogo",
  category: "games",      // games | apps | tools | files
  icon: "🎮",
  color: ["#2b1547", "#7b3fa0"],   // gradiente da capa
  featured: true,                    // true = aparece no carrossel
  description: "Descrição completa do item.",
  version: "1.0.0",       // opcional
  size: "12.3 MB",        // opcional
  downloads: 1500,        // número de downloads (MAIS BAIXADOS)
  date: "2026-11-06",     // YYYY-MM-DD (LANÇAMENTOS)
  file: "./files/meu-jogo.zip",
  // ou então um link externo:
  // url: "https://github.com/.../releases/download/...",
}
```

## Passo a passo para colocar no GitHub

1. Crie um repositório novo (ex.: `nexus-downloads`)
2. Coloque todos os arquivos deste projeto na raiz do repositório
3. Empurre para o GitHub:
   ```bash
   git add .
   git commit -m "site de downloads"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/nexus-downloads.git
   git push -u origin main
   ```
4. Acesse **Settings → Pages → Source = main branch → / (root)**
5. Site online em `https://<seu-usuario>.github.io/nexus-downloads/`

## Dica importante sobre limites do GitHub

- Arquivos **dentro do repositório** têm limite de **~100 MB** cada.
- Para arquivos **grandes**, use **GitHub Releases** e coloque o link no campo `url` do `data.js` (o botão de download vai abrir o link externo).
- Se o repositório ficar muito pesado, considere mover arquivos grandes para o Release e manter só o site no repo.

## Personalização

- **Capas:** ajuste `color` (gradiente) e `icon` (emoji) de cada item
- **Destaques:** coloque `featured: true` nos itens que devem aparecer no carrossel
- **Categorias:** edite `CATEGORIES` no `data.js`
- **Linhas:** edite `SECTIONS` no `data.js`
- **Nome/tema:** mude em `index.html` e `style.css`
