export default function PreviewCertifications({ items }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.id} className="text-[11px] text-gray-800">
          <span className="font-semibold">{item.name || "Untitled"}</span>
          {item.issuer && <span> — {item.issuer}</span>}
          {item.date && <span className="text-gray-500 ml-1">({item.date})</span>}
          {item.credentialId && (
            <span className="text-[10px] text-gray-500 ml-1">
              ID: {item.credentialId}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
