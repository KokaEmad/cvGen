export default function PreviewSkills({ items }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-0.5">
      {items.map((item) => (
        <p key={item.id} className="text-[11px] text-gray-800 leading-[1.4]">
          {item.category && <span className="font-semibold">{item.category}: </span>}
          {item.items}
        </p>
      ))}
    </div>
  );
}
