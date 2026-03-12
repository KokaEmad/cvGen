import PreviewBullets from "./PreviewBullets.jsx";

export default function PreviewExperience({ items }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-baseline">
            <span className="font-semibold text-[12px] text-gray-900">{item.jobTitle || "Untitled Role"}</span>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">
              {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="italic text-[11px] text-gray-700">{item.company}</span>
            {item.location && <span className="text-[10px] text-gray-500">{item.location}</span>}
          </div>
          <PreviewBullets bullets={item.bullets} />
        </div>
      ))}
    </div>
  );
}
