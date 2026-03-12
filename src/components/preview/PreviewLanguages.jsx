export default function PreviewLanguages({ items }) {
  if (items.length === 0) return null;
  return (
    <p className="text-[11px] text-gray-800 leading-[1.4]">
      {items
        .map((item) =>
          item.language
            ? item.proficiency
              ? `${item.language} (${item.proficiency})`
              : item.language
            : null
        )
        .filter(Boolean)
        .join("  •  ")}
    </p>
  );
}
