import { useState } from "react";
import { useCv } from "../../store/CvContext.jsx";

/** Wrapper card for each section in the editor — collapsible, movable, removable. */
export default function SectionCard({ section, children }) {
  const { dispatch } = useCv();
  const [collapsed, setCollapsed] = useState(false);

  const move = (dir) =>
    dispatch({
      type: "MOVE_SECTION",
      payload: { sectionId: section.id, direction: dir },
    });

  const remove = () =>
    dispatch({ type: "REMOVE_SECTION", payload: section.id });

  const rename = (title) =>
    dispatch({
      type: "UPDATE_SECTION_TITLE",
      payload: { sectionId: section.id, title },
    });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="text-gray-500 hover:text-gray-700 text-sm w-5 text-center"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "▸" : "▾"}
        </button>

        <input
          className="font-semibold text-lg flex-1 bg-transparent focus:outline-none focus:border-b focus:border-blue-400"
          value={section.title}
          onChange={(e) => rename(e.target.value)}
        />

        <button
          type="button"
          onClick={() => move(-1)}
          className="text-gray-400 hover:text-gray-700 text-sm"
          title="Move up"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="text-gray-400 hover:text-gray-700 text-sm"
          title="Move down"
        >
          ▼
        </button>
        <button
          type="button"
          onClick={remove}
          className="text-red-400 hover:text-red-600 text-sm ml-1"
          title="Remove section"
        >
          ✕
        </button>
      </div>

      {/* Body (collapsible) */}
      {!collapsed && <div>{children}</div>}
    </div>
  );
}
