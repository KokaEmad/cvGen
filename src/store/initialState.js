import { nanoid } from "../utils/nanoid.js";

/** Default personal-info block. */
export const emptyPersonalInfo = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  summary: "",
};

/* ── Section-type templates ─────────────────────────────── */

export const sectionTemplates = {
  experience: {
    type: "experience",
    title: "Work Experience",
    newItem: () => ({
      id: nanoid(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    }),
  },
  education: {
    type: "education",
    title: "Education",
    newItem: () => ({
      id: nanoid(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
      bullets: [""],
    }),
  },
  skills: {
    type: "skills",
    title: "Skills",
    newItem: () => ({
      id: nanoid(),
      category: "",
      items: "",
    }),
  },
  projects: {
    type: "projects",
    title: "Projects",
    newItem: () => ({
      id: nanoid(),
      name: "",
      link: "",
      techStack: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    }),
  },
  certifications: {
    type: "certifications",
    title: "Certifications",
    newItem: () => ({
      id: nanoid(),
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    }),
  },
  languages: {
    type: "languages",
    title: "Languages",
    newItem: () => ({
      id: nanoid(),
      language: "",
      proficiency: "",
    }),
  },
  volunteer: {
    type: "volunteer",
    title: "Volunteer Experience",
    newItem: () => ({
      id: nanoid(),
      role: "",
      organization: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    }),
  },
  custom: {
    type: "custom",
    title: "Custom Section",
    newItem: () => ({
      id: nanoid(),
      text: "",
      bullets: [""],
    }),
  },
};

/** Build a brand-new section of a given type. */
export function createSection(type, customTitle) {
  const tpl = sectionTemplates[type];
  if (!tpl) throw new Error(`Unknown section type: ${type}`);
  return {
    id: nanoid(),
    type: tpl.type,
    title: customTitle || tpl.title,
    items: [],
  };
}

/** Initial CV state shipped on first load. */
export const initialState = {
  personalInfo: { ...emptyPersonalInfo },
  sections: [],
};
