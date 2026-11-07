# Nexus Downloads

Site de downloads de **jogos, apps, ferramentas e arquivos**, hospedado de graça no **GitHub Pages**.

## Como funciona

- `index.html` / `style.css` / `app.js` → página inicial com destaques
- `catalog.html` / `catalog.js` → página única que lista **todos** os itens de uma seção
- `data.js` → lista de itens para download (gerado automaticamente ou editável manualmente)
- `files/` → coloque todos os arquivos que quiser disponibilizar aqui
- `scripts/update_index.py` → regera `data.js` a partir do conteúdo de `files/`

## Página inicial — os 3 blocos de destaque

A página inicial mostra três seções, cada uma com os primeiros 6 itens e um botão **Ver mais**:

| Bloco | Ordem | Como funciona |
|---|---|---|
| 🔥 **MAIS BAIXADOS** | Itens com maior `downloads` | Defina o número de downloads em `data.js` |
| 🚀 **LANÇAMENTOS** | Itens mais recentes | Defina a `date` (YYYY-MM-DD) em `data.js` |
| 🎲 **GERAL** | Itens em ordem aleatória | Sempre novo na cada carregamento |

O botão **Ver mais →** abre `catalog.html?sec=...`, uma página única com **todos** os itens dessa seção, com busca e filtro por categoria.

**Busca e categorias no topo** da página inicial também funcionam — ao buscar ou escolher uma categoria, a página mostra os resultados na mesma tela (com botão "Voltar aos destaques").

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
Depois edite `data.js` para colocar a descrição, versão, tamanho, `downloads` e `date` de cada item.

**Opção B — manual:** edite `data.js` e adicione um item no formato:
```js
{
  name: "Meu Jogo",
  category: "games",      // games | apps | tools | files
  icon: "🎮",
  description: "Descrição curta do que é.",
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
2. Coloque todos os arquivos deste projeto na raiz do repositório:
   - `index.html`, `style.css`, `app.js`, `data.js`
   - `files/` (com seus arquivos de download)
   - `scripts/update_index.py`
   - o arquivo `.nojekyll` (já está no projeto)
3. Empurre para o GitHub:
   ```bash
   git add .
   git commit -m "iniciando o site de downloads"
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/nexus-downloads.git
   git push -u origin main
   ```
4. Acesse **Settings → Pages → Source = main branch → / (root)**
5. Espere 1-2 minutos e seu site vai rodar em:
   `https://<seu-usuario>.github.io/nexus-downloads/`

## Como adicionar um novo download

**Opção A — automático:**
```bash
# 1. jogue o arquivo na pasta files/
cp meu-jogo.zip files/

# 2. regenera o índice
python scripts/update_index.py

# 3. commit e push
git add .
git commit -m "adicionou meu-jogo.zip"
git push
```

**Opção B — manual:** edite `data.js` e adicione um item no formato:
```js
{
  name: "Meu Jogo",
  category: "games",      // games | apps | tools | files
  icon: "🎮",
  description: "Descrição curta do que é.",
  version: "1.0.0",       // opcional
  size: "12.3 MB",        // opcional
  file: "./files/meu-jogo.zip",
  // ou então um link externo:
  // url: "https://github.com/.../releases/download/...",
}
```

## Dica importante sobre limites do GitHub

- Arquivos **dentro do repositório** têm limite de **~100 MB** cada e o repo total pode ter limite de tamanho (alguns planos permitem mais, mas fique atento).
- Para arquivos **grandes**, use **GitHub Releases** e coloque o link no campo `url` do `data.js` (o botão de download vai abrir o link externo).
- Se o repositório ficar muito pesado, considere mover arquivos grandes para o Release e manter só o site no repo.

## Personalização

- Mude o nome/tema no `index.html` e `style.css`
- Adicione categorias novas em `CATEGORIES` (no `data.js`) e ajustando o CSS com classes `cat-<id>`
- Coloque seu link do repositório no footer (no `index.html`, adicione o `href` no `#repoLink`)
