import { useCv } from "../../store/CvContext.jsx";

/** Renders add/remove/edit bullet points for an item. */
export default function BulletList({ sectionId, itemId, bullets }) {
  const { dispatch } = useCv();

  const update = (idx, value) =>
    dispatch({
      type: "UPDATE_BULLET",
      payload: { sectionId, itemId, bulletIndex: idx, value },
    });

  const add = () =>
    dispatch({ type: "ADD_BULLET", payload: { sectionId, itemId } });

  const remove = (idx) =>
    dispatch({
      type: "REMOVE_BULLET",
      payload: { sectionId, itemId, bulletIndex: idx },
    });

  return (
    <div className="mt-2 space-y-1">
      {bullets.map((b, idx) => (
        <div key={idx} className="flex items-start gap-1">
          <span className="mt-2 text-gray-400 text-xs">•</span>
          <textarea
            rows={1}
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Bullet point…"
            value={b}
            onChange={(e) => update(idx, e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="text-red-400 hover:text-red-600 text-lg leading-none px-1"
            title="Remove bullet"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-xs text-blue-600 hover:underline mt-1"
      >
        + Add bullet
      </button>
    </div>
  );
}
