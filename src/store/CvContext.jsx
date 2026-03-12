import { createContext, useContext, useReducer } from "react";
import { initialState } from "./initialState.js";
import { cvReducer } from "./cvReducer.js";

const CvContext = createContext(null);

export function CvProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, initialState);
  return (
    <CvContext.Provider value={{ state, dispatch }}>
      {children}
    </CvContext.Provider>
  );
}

/** Convenience hook — use anywhere inside CvProvider. */
export function useCv() {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCv must be used within <CvProvider>");
  return ctx;
}
