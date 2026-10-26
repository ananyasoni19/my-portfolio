# Personal Portfolio Website

A responsive, beginner-friendly portfolio frontend built with plain HTML, CSS, and JavaScript. It is a static website and can be deployed to Vercel without a build step.

## Run it locally

From this folder, run `py -m http.server 8000` in a terminal, then open `http://localhost:8000` in a browser. No package install is required. (If `py` is unavailable, use `python -m http.server 8000`.)

## Personalize before publishing

The provided name, college, city, course/year, skills, email, and GitHub profile are filled in. The LinkedIn link and project repository/demo URLs remain placeholders until you provide them.

## What works

- Home, About Me, Skills, Projects, and Contact sections
- Five project cards with responsive layouts
- Search across project names and descriptions
- Technology filters for Python, JavaScript, and AI Tools
- Light/dark theme toggle; the choice is saved in this browser
- Responsive navigation menu on smaller screens
- Five linked mini-project pages; the book list saves to browser storage, and the quiz calculates and displays a final score
- Keyboard-friendly navigation, visible focus states, and reduced-motion support

## Chatbot: next stage

The chatbot API is intentionally not implemented. When it is added, keep provider credentials on a server-side endpoint (for example, a Vercel Function) and call that endpoint from the browser. Never put a secret API key in `script.js` or any other public frontend file.

## Mini-project pages

- `books.html`: add books, change reading status, filter the list, and delete entries. The list is stored in this browser.
- `quiz.html`: select answers, check explanations, move through five questions, and view or restart the score.
- `python-projects.html`: factorial, Fibonacci, and structure-to-dictionary examples.
- `code-improvement.html`: compare a messy Python example with a refactored version.
- `bug-fixing.html`: inspect a factorial bug, its correction, and the boundary-case explanation.

To try them, open `index.html` and select each project card. For consistent browser storage behavior, you can also run a local server from this folder and open its local address. No deployment is required for local testing.

## Deploy on Vercel

Import this folder/repository as a project in Vercel. It is a static site: use the project root, leave the framework preset as **Other**, and leave the build and output directory settings empty. Vercel serves `index.html` directly. A custom domain and real profile/project links can be added after deployment.
