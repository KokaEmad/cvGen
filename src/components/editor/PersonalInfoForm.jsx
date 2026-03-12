import { useCv } from "../../store/CvContext.jsx";

const fields = [
  { key: "name", label: "Full Name", placeholder: "John Doe" },
  { key: "title", label: "Professional Title", placeholder: "Software Engineer" },
  { key: "email", label: "Email", placeholder: "john@example.com", type: "email" },
  { key: "phone", label: "Phone", placeholder: "+1 234 567 8901", type: "tel" },
  { key: "location", label: "Location", placeholder: "New York, NY" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/johndoe" },
  { key: "website", label: "Website / Portfolio", placeholder: "johndoe.dev" },
];

export default function PersonalInfoForm() {
  const { state, dispatch } = useCv();
  const info = state.personalInfo;

  const update = (key, value) =>
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: { [key]: value } });

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h2 className="font-semibold text-lg">Personal Information</h2>

      <div className="grid grid-cols-2 gap-3">
        {fields.map((f) => (
          <div key={f.key} className={f.key === "name" ? "col-span-2" : ""}>
            <label className="block text-xs text-gray-500 mb-0.5">
              {f.label}
            </label>
            <input
              type={f.type || "text"}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder={f.placeholder}
              value={info[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-0.5">
          Professional Summary
        </label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="Brief overview of your professional background…"
          value={info.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </div>
    </div>
  );
}
