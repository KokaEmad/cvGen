import { useState } from "react";
import { useCv } from "../../store/CvContext.jsx";
import { createSection, sectionTemplates } from "../../store/initialState.js";
import SectionCard from "./SectionCard.jsx";
import ExperienceEditor from "./ExperienceEditor.jsx";
import EducationEditor from "./EducationEditor.jsx";
import SkillsEditor from "./SkillsEditor.jsx";
import ProjectsEditor from "./ProjectsEditor.jsx";
import CertificationsEditor from "./CertificationsEditor.jsx";
import LanguagesEditor from "./LanguagesEditor.jsx";
import VolunteerEditor from "./VolunteerEditor.jsx";
import CustomSectionEditor from "./CustomSectionEditor.jsx";

const editorMap = {
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  projects: ProjectsEditor,
  certifications: CertificationsEditor,
  languages: LanguagesEditor,
  volunteer: VolunteerEditor,
  custom: CustomSectionEditor,
};

const addableSections = Object.entries(sectionTemplates).map(([key, tpl]) => ({
  key,
  label: tpl.title,
}));

export default function SectionManager() {
  const { state, dispatch } = useCv();
  const [addType, setAddType] = useState("");

  const handleAdd = () => {
    if (!addType) return;
    const section = createSection(addType);
    dispatch({ type: "ADD_SECTION", payload: section });
    setAddType("");
  };

  return (
    <div className="space-y-4">
      {state.sections.map((section) => {
        const Editor = editorMap[section.type] || CustomSectionEditor;
        return (
          <SectionCard key={section.id} section={section}>
            <Editor section={section} />
          </SectionCard>
        );
      })}

      {/* Add Section controls */}
      <div className="flex gap-2">
        <select
          className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          value={addType}
          onChange={(e) => setAddType(e.target.value)}
        >
          <option value="">— Add a section —</option>
          {addableSections.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!addType}
          className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </div>
  );
}
