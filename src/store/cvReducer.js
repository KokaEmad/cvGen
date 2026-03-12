import { sectionTemplates } from "./initialState.js";

/*
  Action types:
    UPDATE_PERSONAL_INFO   — patch personalInfo fields
    ADD_SECTION            — add a new section of a given type
    REMOVE_SECTION         — remove section by id
    UPDATE_SECTION_TITLE   — rename a section
    MOVE_SECTION           — reorder section (direction: -1 up, +1 down)
    ADD_ITEM               — add an item to a section
    REMOVE_ITEM            — remove an item from a section
    UPDATE_ITEM            — patch an item's field(s)
    ADD_BULLET             — add a bullet to an item
    REMOVE_BULLET          — remove a bullet from an item by index
    UPDATE_BULLET          — update a bullet's text by index
*/

export function cvReducer(state, action) {
  switch (action.type) {
    /* ── Personal info ──────────────────────── */
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    /* ── Sections ───────────────────────────── */
    case "ADD_SECTION":
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };

    case "REMOVE_SECTION":
      return {
        ...state,
        sections: state.sections.filter((s) => s.id !== action.payload),
      };

    case "UPDATE_SECTION_TITLE":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.payload.sectionId
            ? { ...s, title: action.payload.title }
            : s
        ),
      };

    case "MOVE_SECTION": {
      const { sectionId, direction } = action.payload;
      const idx = state.sections.findIndex((s) => s.id === sectionId);
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= state.sections.length) return state;
      const arr = [...state.sections];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return { ...state, sections: arr };
    }

    /* ── Items inside a section ─────────────── */
    case "ADD_ITEM": {
      const { sectionId } = action.payload;
      return {
        ...state,
        sections: state.sections.map((s) => {
          if (s.id !== sectionId) return s;
          const tpl = sectionTemplates[s.type];
          return { ...s, items: [...s.items, tpl.newItem()] };
        }),
      };
    }

    case "REMOVE_ITEM": {
      const { sectionId, itemId } = action.payload;
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
            : s
        ),
      };
    }

    case "UPDATE_ITEM": {
      const { sectionId, itemId, field, value } = action.payload;
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.map((i) =>
                  i.id === itemId ? { ...i, [field]: value } : i
                ),
              }
            : s
        ),
      };
    }

    /* ── Bullets inside an item ─────────────── */
    case "ADD_BULLET": {
      const { sectionId, itemId } = action.payload;
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.map((i) =>
                  i.id === itemId
                    ? { ...i, bullets: [...i.bullets, ""] }
                    : i
                ),
              }
            : s
        ),
      };
    }

    case "REMOVE_BULLET": {
      const { sectionId, itemId, bulletIndex } = action.payload;
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.map((i) =>
                  i.id === itemId
                    ? {
                        ...i,
                        bullets: i.bullets.filter(
                          (_, idx) => idx !== bulletIndex
                        ),
                      }
                    : i
                ),
              }
            : s
        ),
      };
    }

    case "UPDATE_BULLET": {
      const { sectionId, itemId, bulletIndex, value } = action.payload;
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.map((i) =>
                  i.id === itemId
                    ? {
                        ...i,
                        bullets: i.bullets.map((b, idx) =>
                          idx === bulletIndex ? value : b
                        ),
                      }
                    : i
                ),
              }
            : s
        ),
      };
    }

    default:
      return state;
  }
}
