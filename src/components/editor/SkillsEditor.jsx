import { useCv } from "../../store/CvContext.jsx";

export default function SkillsEditor({ section }) {
  const { dispatch } = useCv();
  const sid = section.id;

  const update = (itemId, field, value) =>
    dispatch({ type: "UPDATE_ITEM", payload: { sectionId: sid, itemId, field, value } });

  const addItem = () =>
    dispatch({ type: "ADD_ITEM", payload: { sectionId: sid } });

  const removeItem = (itemId) =>
    dispatch({ type: "REMOVE_ITEM", payload: { sectionId: sid, itemId } });

  return (
    <div className="space-y-3">
      {section.items.map((item) => (
        <div key={item.id} className="flex items-start gap-2">
          <input
            className="w-1/3 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Category (e.g. Languages)"
            value={item.category}
            onChange={(e) => update(item.id, "category", e.target.value)}
          />
          <input
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Comma-separated skills (e.g. Python, JavaScript, Go)"
            value={item.items}
            onChange={(e) => update(item.id, "items", e.target.value)}
          />
          <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-lg leading-none px-1">×</button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Add Skill Category</button>
    </div>
  );
}
