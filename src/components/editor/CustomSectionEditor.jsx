import { useCv } from "../../store/CvContext.jsx";
import BulletList from "./BulletList.jsx";

export default function CustomSectionEditor({ section }) {
  const { dispatch } = useCv();
  const sid = section.id;

  const update = (itemId, field, value) =>
    dispatch({ type: "UPDATE_ITEM", payload: { sectionId: sid, itemId, field, value } });

  const addItem = () =>
    dispatch({ type: "ADD_ITEM", payload: { sectionId: sid } });

  const removeItem = (itemId) =>
    dispatch({ type: "REMOVE_ITEM", payload: { sectionId: sid, itemId } });

  return (
    <div className="space-y-4">
      {section.items.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Entry</span>
            <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
          </div>
          <input
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Heading / label"
            value={item.text}
            onChange={(e) => update(item.id, "text", e.target.value)}
          />
          <BulletList sectionId={sid} itemId={item.id} bullets={item.bullets} />
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Add Entry</button>
    </div>
  );
}
