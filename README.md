# Battleships
A small Battleships game. This repository originally contained a terminal version in `battleships.py` and now includes a simple browser UI.

Play the UI

- Open `index.html` directly in a browser, or serve the folder and visit `http://localhost:8000`:

```bash
# from the repository root
python3 -m http.server 8000

# then open http://localhost:8000 in your browser
```

Notes
- The UI is implemented in `index.html` with styles in `static/style.css` and logic in `static/script.js`.
- Rules match the original script: 5x5 board, one hidden ship, 5 turns to find it.

