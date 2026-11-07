#!/usr/bin/env python3
"""
Gera o data.js a partir dos arquivos na pasta /files.

Uso:
    python scripts/update_index.py

O script analisa o nome do arquivo para inferir a categoria:
    - palavras como game, jogo, minecraft, etc.        -> games
    - palavras como app, apk, ferramenta, tool, exe... -> apps / tools
    - tudo o resto                                     -> files

Adicionar um arquivo novo = jogar o arquivo na pasta /files e rodar o script.
"""

import datetime
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES_DIR = os.path.join(ROOT, "files")
DATA_JS = os.path.join(ROOT, "data.js")

GAMES_KEYWORDS = re.compile(r"game|jogo|jogos|minecraft|steam|emu|rom", re.I)
APPS_KEYWORDS = re.compile(r"app|apk|android|ios|iphone|ipas", re.I)
TOOLS_KEYWORDS = re.compile(r"tool|ferramenta|installer|install|setup|exe|dmg|pkg|archive|sdk|editor", re.I)

EXCLUDE_EXTS = {".txt", ".md"}  # não indexar arquivos de texto

CATEGORY_COLORS = {
    "games": ["#3d1e6d", "#7b2d9e"],
    "apps": ["#0b5e4d", "#138a6e"],
    "tools": ["#37474f", "#546e7a"],
    "files": ["#4e342e", "#795548"],
}


def human_size(path):
    size = os.path.getsize(path)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024:
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} TB"


def guess_category(name):
    if GAMES_KEYWORDS.search(name):
        return "games"
    if APPS_KEYWORDS.search(name):
        return "apps"
    if TOOLS_KEYWORDS.search(name):
        return "tools"
    return "files"


def guess_icon(category):
    return {
        "games": "🎮",
        "apps": "📱",
        "tools": "🛠️",
        "files": "📁",
    }.get(category, "📦")


def main():
    if not os.path.isdir(FILES_DIR):
        print("Pasta /files não encontrada.")
        sys.exit(1)

    items = []
    for fname in sorted(os.listdir(FILES_DIR)):
        fpath = os.path.join(FILES_DIR, fname)
        if not os.path.isfile(fpath):
            continue
        ext = os.path.splitext(fname)[1].lower()
        if ext in EXCLUDE_EXTS:
            continue
        cat = guess_category(fname)
        colors = CATEGORY_COLORS.get(cat, ["#161b22", "#1a2432"])
        items.append(
            "  {\n"
            f'    name: "{fname}",\n'
            f'    category: "{cat}",\n'
            f'    icon: "{guess_icon(cat)}",\n'
            f'    color: ["{colors[0]}", "{colors[1]}"],\n'
            f'    featured: false,\n'
            f'    description: "Arquivo adicionado automaticamente — edite esta linha no data.js se quiser.",\n'
            f'    size: "{human_size(fpath)}",\n'
            f'    downloads: 0,\n'
            f'    date: "{datetime.date.today().isoformat()}",\n'
            f'    file: "./files/{fname}",\n'
            "  },"
        )

    js = f"""// ============================================================
// ÍNDICE DE DOWNLOADS — GEADO AUTOMATICAMENTE
// Data: {datetime.date.today().isoformat()}
// Edite manualmente se quiser ajustar descrições, versões,
// número de downloads ou data de lançamento.
// Para regenerar: python scripts/update_index.py
// ============================================================

let ITEMS = [
{chr(10).join(items)}
];
"""
    with open(DATA_JS, "w", encoding="utf-8") as fh:
        fh.write(js)

    print(f"✅ {len(items)} item(s) escrito(s) em data.js")
    for it in items:
        name = re.search(r'name: "(.+)"', it).group(1)
        print(f"   - {name}")


if __name__ == "__main__":
    main()
