import { useCv } from "../../store/CvContext.jsx";

const proficiencyLevels = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"];

export default function LanguagesEditor({ section }) {
  const { dispatch } = useCv();
  const sid = section.id;

  const update = (itemId, field, value) =>
    dispatch({ type: "UPDATE_ITEM", payload: { sectionId: sid, itemId, field, value } });

  const addItem = () =>
    dispatch({ type: "ADD_ITEM", payload: { sectionId: sid } });

  const removeItem = (itemId) =>
    dispatch({ type: "REMOVE_ITEM", payload: { sectionId: sid, itemId } });

  return (
    <div className="space-y-2">
      {section.items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Language"
            value={item.language}
            onChange={(e) => update(item.id, "language", e.target.value)}
          />
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={item.proficiency}
            onChange={(e) => update(item.id, "proficiency", e.target.value)}
          >
            <option value="">Proficiency…</option>
            {proficiencyLevels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-lg leading-none px-1">×</button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Add Language</button>
    </div>
  );
}
