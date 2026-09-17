# Ascendency Local Setup

This project is a simple static website for the Ascendency platform and Botema experience.

## 1. Open the project folder

```bash
cd "/project folder"
```

## 2. Start a local web server

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open in your browser:

```text
http://localhost:8000
```

## 3. View the Botema page

The Botema experience is in the `botema` folder. You can also serve that folder directly:

```bash
cd "/project folder"
python3 -m http.server 8005
```

Then open:

```text
http://localhost:8005
```

## 4. If port 8000 is busy

Use another port, for example:

```bash
python3 -m http.server 8001
```

Then open the new URL shown in the terminal.

## 5. Files you may edit

- `index.html` — main Ascendency landing page
- `styles.css` — overall site styling
- `script.js` — front-end interactions
- `botema/index.html` — Botema landing page
- `botema/styles.css` — Botema theme and styling
- `botema/script.js` — Botema chat behavior

## 6. Notes

This is a static website, so there is no install step or build process required. If you just want to preview it locally, a simple Python HTTP server is enough.
