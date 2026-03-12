import { useCv } from "../../store/CvContext.jsx";
import BulletList from "./BulletList.jsx";

export default function VolunteerEditor({ section }) {
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
            <span className="text-xs text-gray-400 uppercase tracking-wide">Volunteer Entry</span>
            <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="col-span-2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Role" value={item.role} onChange={(e) => update(item.id, "role", e.target.value)} />
            <input className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Organization" value={item.organization} onChange={(e) => update(item.id, "organization", e.target.value)} />
            <div className="flex gap-2">
              <input className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Start Date" value={item.startDate} onChange={(e) => update(item.id, "startDate", e.target.value)} />
              <input className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="End Date" value={item.endDate} onChange={(e) => update(item.id, "endDate", e.target.value)} />
            </div>
          </div>
          <BulletList sectionId={sid} itemId={item.id} bullets={item.bullets} />
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Add Volunteer Experience</button>
    </div>
  );
}
