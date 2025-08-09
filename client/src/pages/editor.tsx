import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Maximize2, Minimize2 } from "lucide-react";
import { EditorLayout } from "@/components/editor/EditorLayout";

export default function Editor() {
  const [showLoader, setShowLoader] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Show editor immediately
  useEffect(() => {
    setShowLoader(false);
    setShowEditor(true);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-6"
              >
                <Loader2 className="h-16 w-16 text-white" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Loading Sign Design Studio
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-blue-200 text-lg"
              >
                Preparing your professional design tools...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showEditor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">Master Signs Design Studio</h1>
              <div className="h-4 w-px bg-white/30"></div>
              <span className="text-blue-200 text-sm">Professional Sign Design Tool</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => window.close()}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                title="Close Editor"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Editor Layout */}
          <div className="flex-1 overflow-hidden">
            <EditorLayout />
          </div>
        </motion.div>
      )}
    </div>
  );
} 