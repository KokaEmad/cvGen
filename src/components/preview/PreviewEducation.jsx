import PreviewBullets from "./PreviewBullets.jsx";

export default function PreviewEducation({ items }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-baseline">
            <span className="font-semibold text-[12px] text-gray-900">{item.degree || "Untitled Degree"}</span>
            {item.graduationDate && <span className="text-[10px] text-gray-500">{item.graduationDate}</span>}
          </div>
          <div className="flex justify-between items-baseline">
            <span className="italic text-[11px] text-gray-700">{item.institution}</span>
            {item.location && <span className="text-[10px] text-gray-500">{item.location}</span>}
          </div>
          {item.gpa && <p className="text-[10px] text-gray-600">GPA: {item.gpa}</p>}
          <PreviewBullets bullets={item.bullets} />
        </div>
      ))}
    </div>
  );
}
