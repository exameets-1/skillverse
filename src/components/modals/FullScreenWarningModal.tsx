interface FullscreenWarningModalProps {
  onReenterFullscreen: () => void;
}

export default function FullscreenWarningModal({ onReenterFullscreen }: FullscreenWarningModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-amber-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-amber-700">Fullscreen Disabled</h2>
        <p className="text-slate-700 mb-4">
          You have exited fullscreen mode. Please return to fullscreen immediately or your test may be submitted.
        </p>
        <button
          onClick={onReenterFullscreen}
          className="w-full bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          Re-enter Fullscreen
        </button>
      </div>
    </div>
  );
}