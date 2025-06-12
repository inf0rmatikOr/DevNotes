# DevNotes

**DevNotes** is a modern all-in-one note-taking app for developers.  
It features an integrated calendar, API client, customizable note editor, and AI chat. I made it just for fun so feel free to contribute :)

---

## Features

- **📝 Customizable Note Editor**  
  Write, edit, and organize your notes flexibly and clearly.

- **📅 Calendar**  
  Keep track of appointments, deadlines, and tasks.

- **🔗 API Client**  
  Test and document APIs directly within the app.

- **🤖 AI Chat**  
  Integrated AI support for quick answers and problem-solving.

---

## Tech Stack

- **Electron** (Desktop app)
- **Svelte + Vite + TypeScript** (UI, see [`/ui`](ui/))
- **TailwindCSS** (Styling)
- **Google Gemini Integration** (AI Chat)

---

## Development

- **Recommended IDE:**  
  [VS Code](https://code.visualstudio.com/) with the [Svelte Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

### Prerequisites

- [Node.js](https://nodejs.org/) (recommended: LTS)

### Clone & Start the Project

```bash
git clone https://github.com/inf0rmatikOr/DevNotes.git
cd DevNotes
npm install
# Install UI dependencies
cd ui
npm install
# Back to the main directory
cd ..
# Start the app
npm run app
# Start the web app (another terminal session)
cd ui
npm run dev
```

---

## Contributing

Pull requests and issues are welcome!  
Please refer to the [Code of Conduct](CODE_OF_CONDUCT.md) if available.

---

## License

[Apache-2.0](LICENSE)