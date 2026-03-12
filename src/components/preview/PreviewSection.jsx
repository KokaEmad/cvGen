import PreviewExperience from "./PreviewExperience.jsx";
import PreviewEducation from "./PreviewEducation.jsx";
import PreviewSkills from "./PreviewSkills.jsx";
import PreviewProjects from "./PreviewProjects.jsx";
import PreviewCertifications from "./PreviewCertifications.jsx";
import PreviewLanguages from "./PreviewLanguages.jsx";
import PreviewVolunteer from "./PreviewVolunteer.jsx";
import PreviewCustom from "./PreviewCustom.jsx";

const rendererMap = {
  experience: PreviewExperience,
  education: PreviewEducation,
  skills: PreviewSkills,
  projects: PreviewProjects,
  certifications: PreviewCertifications,
  languages: PreviewLanguages,
  volunteer: PreviewVolunteer,
  custom: PreviewCustom,
};

export default function PreviewSection({ section }) {
  const Renderer = rendererMap[section.type] || PreviewCustom;
  // Don't render empty sections
  if (section.items.length === 0) return null;

  return (
    <div className="mb-2">
      <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mb-1">
        {section.title}
      </h2>
      <Renderer items={section.items} />
    </div>
  );
}
