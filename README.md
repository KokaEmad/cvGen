# CV Generator — ATS-Friendly Resume Builder

A fully client-side, split-screen CV/resume generator built with **React** and **Tailwind CSS**. Generates clean, ATS-friendly PDFs that are easy for applicant tracking systems to parse.

---

## Features

- **Split-screen editor** — left side for inputs, right side for live preview
- **Personal info** — name, title, email, phone, location, LinkedIn, website, summary
- **Dynamic sections** — add, remove, reorder, and rename:
  - Work Experience
  - Education
  - Skills (category-based)
  - Projects
  - Certifications
  - Languages
  - Volunteer Experience
  - Custom (free-form)
- **Bullet points** — add/remove per entry in experience, education, projects, volunteer, and custom sections
- **Real-time preview** — updates instantly as you type
- **PDF export** — one-click download via jsPDF, ATS-friendly selectable text, A4 format
- **ATS-friendly layout** — single column, standard serif fonts, clear headings, no tables/images
- **Print-friendly** — `Ctrl+P` prints only the resume preview
- **No backend** — everything runs in-browser; nothing is sent to a server

---

## Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| UI framework   | React 18 (hooks + Context API)  |
| Styling        | Tailwind CSS 3                  |
| PDF generation | jsPDF                           |
| Build tool     | Vite 6                          |
| Deployment     | GitHub Pages (via GitHub Actions) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cvGen.git
cd cvGen

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173/cvGen/](http://localhost:5173/cvGen/) in your browser.

### Build for Production

```bash
npm run build
# Output → dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## Deployment to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that **automatically builds and deploys** on every push to `main`.

### Setup

1. Go to your repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the workflow will build and deploy to `https://<your-username>.github.io/cvGen/`.

> **Note:** The Vite `base` path in `vite.config.js` is set to `/cvGen/`. Change it to match your repository name if different.

---

## Project Structure

```text
cvGen/
├── .github/workflows/deploy.yml   # GitHub Actions deployment
├── src/
│   ├── components/
│   │   ├── AppHeader.jsx           # Top bar with Download PDF button
│   │   ├── editor/                 # Left-side editor components
│   │   │   ├── EditorPanel.jsx
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── SectionManager.jsx
│   │   │   ├── SectionCard.jsx
│   │   │   ├── BulletList.jsx
│   │   │   ├── ExperienceEditor.jsx
│   │   │   ├── EducationEditor.jsx
│   │   │   ├── SkillsEditor.jsx
│   │   │   ├── ProjectsEditor.jsx
│   │   │   ├── CertificationsEditor.jsx
│   │   │   ├── LanguagesEditor.jsx
│   │   │   ├── VolunteerEditor.jsx
│   │   │   └── CustomSectionEditor.jsx
│   │   └── preview/                # Right-side live preview components
│   │       ├── PreviewPanel.jsx
│   │       ├── PreviewPersonalInfo.jsx
│   │       ├── PreviewSection.jsx
│   │       ├── PreviewBullets.jsx
│   │       ├── PreviewExperience.jsx
│   │       ├── PreviewEducation.jsx
│   │       ├── PreviewSkills.jsx
│   │       ├── PreviewProjects.jsx
│   │       ├── PreviewCertifications.jsx
│   │       ├── PreviewLanguages.jsx
│   │       ├── PreviewVolunteer.jsx
│   │       └── PreviewCustom.jsx
│   ├── store/
│   │   ├── CvContext.jsx           # React Context + useReducer
│   │   ├── cvReducer.js            # All state actions
│   │   └── initialState.js         # Data model & section templates
│   ├── utils/
│   │   ├── exportPdf.js            # jsPDF PDF generator
│   │   └── nanoid.js               # Tiny ID generator
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind directives + print styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## License

MIT
