# Nexus Downloads

Site de downloads de **jogos, apps, ferramentas e arquivos**, hospedado de graça no **GitHub Pages**.

## Como funciona

- `index.html` / `style.css` / `app.js` → a página do site (estática, sem dependências)
- `data.js` → lista de itens para download (gerado automaticamente ou editável manualmente)
- `files/` → coloque todos os arquivos que quiser disponibilizar aqui
- `scripts/update_index.py` → regera `data.js` a partir do conteúdo de `files/`

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
