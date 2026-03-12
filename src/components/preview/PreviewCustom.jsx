import PreviewBullets from "./PreviewBullets.jsx";

export default function PreviewCustom({ items }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          {item.text && (
            <p className="font-semibold text-[12px] text-gray-900">{item.text}</p>
          )}
          <PreviewBullets bullets={item.bullets} />
        </div>
      ))}
    </div>
  );
}
