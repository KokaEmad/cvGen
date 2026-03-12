import { useCv } from "../../store/CvContext.jsx";
import PreviewPersonalInfo from "./PreviewPersonalInfo.jsx";
import PreviewSection from "./PreviewSection.jsx";

export default function PreviewPanel() {
  const { state } = useCv();

  return (
    <div className="h-full overflow-y-auto bg-gray-200 flex justify-center p-4 print:bg-white print:p-0">
      {/* A4 paper simulation */}
      <div
        id="resume-preview"
        className="bg-white shadow-lg w-[210mm] min-h-[297mm] px-[18mm] py-[14mm] print:shadow-none print:w-full print:min-h-0 print:px-0 print:py-0"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        <PreviewPersonalInfo info={state.personalInfo} />

        {state.sections.map((section) => (
          <PreviewSection key={section.id} section={section} />
        ))}

        {/* Empty-state hint (only visible while no content) */}
        {state.sections.length === 0 &&
          !state.personalInfo.name &&
          !state.personalInfo.summary && (
            <p className="text-center text-gray-300 text-sm mt-24">
              Start filling in the editor to see your resume here.
            </p>
          )}
      </div>
    </div>
  );
}
