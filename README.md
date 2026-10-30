# Khit portfolio — Mini Khit, real AI version

This is the complete existing blue HTML/CSS/JS portfolio with a **Flask backend connected to the OpenAI Responses API**. No fixed reply patterns; Mini Khit answers visitor messages dynamically while referring to `portfolio_knowledge.md`.

## How to run (Windows / VS Code)
1. Extract ZIP and open this folder in VS Code.
2. In terminal: `py -m venv .venv` (or `python -m venv .venv`).
3. Activate: `.venv\Scripts\activate` in Command Prompt, or `.venv\Scripts\Activate.ps1` in PowerShell.
4. Install: `python -m pip install -r requirements.txt`.
5. Copy `.env.example` to `.env` and paste **your own OpenAI API key**, obtainable from https://platform.openai.com/api-keys. API usage is billed separately from ChatGPT subscriptions.
6. Run: `python app.py`.
7. Open **http://127.0.0.1:5000** (NOT Live Server / double-click HTML; the AI endpoint needs Flask).
8. Click Mini Khit's circular avatar at bottom-right and ask a question.

## How to improve the AI
- Update `portfolio_knowledge.md` to add verified project summaries, screenshots/demos, contribution details, tools, lessons learned and approved public achievements.
- Edit the `SYSTEM` instructions in `app.py` to adjust voice (more or less playful) and the answer length.
- Try `test_questions.md` to check natural answers and guard against hallucinations.
- This is **prompt + knowledge grounding, not fine-tuning**. It is generally the right starting point for a portfolio bot. No training data set is necessary yet.
- The frontend sends the last six conversation turns for continuity. Refreshing the browser clears history.

## Before public deployment
- `.env` and `portfolio_knowledge.md` are not served to visitors as files, but knowledge may be reflected in responses. Only put facts suitable for public sharing in the knowledge file.
- Set a paid-usage budget in the OpenAI dashboard. Public launch should add authentication or rate limiting, usage caps, abuse monitoring, and server-side logging controls to prevent API bill abuse.
- Never commit `.env` or put API keys in client-side HTML/JS.
- Use a production WSGI server rather than Flask debug mode. Static hosting such as GitHub Pages alone cannot run this backend.
- Real personal cartoon image is not included; replace the placeholder in `assets/cartoon-avatar.svg` when ready.
