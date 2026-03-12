/** Shared bullet-point list used by several preview renderers. */
export default function PreviewBullets({ bullets }) {
  const filled = bullets.filter((b) => b.trim());
  if (filled.length === 0) return null;
  return (
    <ul className="list-disc ml-5 mt-0.5 text-[11px] leading-[1.45] text-gray-800">
      {filled.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}
