import { CvProvider } from "./store/CvContext.jsx";
import AppHeader from "./components/AppHeader.jsx";
import EditorPanel from "./components/editor/EditorPanel.jsx";
import PreviewPanel from "./components/preview/PreviewPanel.jsx";

export default function App() {
  return (
    <CvProvider>
      <div className="h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Editor — left side */}
          <div className="md:w-1/2 md:border-r border-gray-200 bg-gray-50">
            <EditorPanel />
          </div>
          {/* Live Preview — right side */}
          <div className="md:w-1/2">
            <PreviewPanel />
          </div>
        </main>
      </div>
    </CvProvider>
  );
}
