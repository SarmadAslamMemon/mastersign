import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import EditorCanvas from "@/components/EditorCanvas";

export default function Editor() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign Design Editor</h1>
          <p className="text-lg text-gray-600 mb-6">
            Create custom signs with our professional design tool
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            onClick={() => setShowEditor(true)}
          >
            Open Editor
          </button>
        </div>

        {showEditor && (
          <div className="mt-8">
            <EditorCanvas />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 