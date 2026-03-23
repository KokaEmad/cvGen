export default function PreviewPersonalInfo({ info }) {
  const { name, title, email, phone, location, linkedin, website, summary } = info;
  const contactParts = [email, phone, location, linkedin, website].filter(Boolean);

  // Don't show anything if completely empty
  if (!name && contactParts.length === 0 && !summary) return null;

  return (
    <div className="text-center mb-8">
      {name && (
        <h1 className="text-[22px] font-bold tracking-wide text-gray-900 leading-snug">
          {name}
        </h1>
      )}
      {title && (
        <p className="text-[12px] text-gray-600 mt-0.5">{title}</p>
      )}
      {contactParts.length > 0 && (
        <p className="text-[10px] text-gray-600 mt-1 leading-snug">
          {contactParts.join("  |  ")}
        </p>
      )}
      {summary && (
        <>
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5 mt-3 mb-1 text-left">
            Professional Summary
          </h2>
          <p className="text-[11px] text-gray-700 text-left leading-[1.45]">{summary}</p>
        </>
      )}
    </div>
  );
}
