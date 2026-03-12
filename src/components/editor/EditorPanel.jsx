import PersonalInfoForm from "./PersonalInfoForm.jsx";
import SectionManager from "./SectionManager.jsx";

export default function EditorPanel() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 print:hidden">
      <PersonalInfoForm />
      <SectionManager />
    </div>
  );
}
