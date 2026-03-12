import PreviewBullets from "./PreviewBullets.jsx";

export default function PreviewProjects({ items }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-baseline">
            <span className="font-semibold text-[12px] text-gray-900">
              {item.name || "Untitled Project"}
              {item.link && (
                <span className="font-normal text-[10px] text-gray-500 ml-1">({item.link})</span>
              )}
            </span>
            <span className="text-[10px] text-gray-500 whitespace-nowrap">
              {[item.startDate, item.endDate].filter(Boolean).join(" – ")}
            </span>
          </div>
          {item.techStack && (
            <p className="text-[10px] italic text-gray-600">{item.techStack}</p>
          )}
          <PreviewBullets bullets={item.bullets} />
        </div>
      ))}
    </div>
  );
}
