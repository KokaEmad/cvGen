import { useCv } from "../../store/CvContext.jsx";

export default function CertificationsEditor({ section }) {
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
        <div key={item.id} className="border border-gray-200 rounded p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Certification</span>
            <button type="button" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="col-span-2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Certification Name" value={item.name} onChange={(e) => update(item.id, "name", e.target.value)} />
            <input className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Issuing Organization" value={item.issuer} onChange={(e) => update(item.id, "issuer", e.target.value)} />
            <input className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Date Obtained" value={item.date} onChange={(e) => update(item.id, "date", e.target.value)} />
            <input className="col-span-2 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" placeholder="Credential ID (optional)" value={item.credentialId} onChange={(e) => update(item.id, "credentialId", e.target.value)} />
          </div>
        </div>
      ))}
      <button type="button" onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Add Certification</button>
    </div>
  );
}
