import { AlertTriangle, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TabSwitchWarningModalProps {
  onReturn: () => void;
  onSubmitAndLeave: () => void;
  warningCount: number;
}

export default function TabSwitchWarningModal({ 
  onReturn, 
  onSubmitAndLeave,
  warningCount 
}: TabSwitchWarningModalProps) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Handle back button press
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
      setShowExitConfirm(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Exit confirmation modal
  if (showExitConfirm) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Leave Test?
          </h2>
          
          <p className="text-slate-600 mb-6">
            Going back will submit your test and you won&apos;t be able to continue. Do you want to proceed?
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onSubmitAndLeave}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Submit & Leave
            </button>
            <button
              onClick={() => setShowExitConfirm(false)}
              className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
            >
              Stay
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine severity based on warning count
  const isFirstWarning = warningCount === 1;
  const isFinalWarning = warningCount >= 2;

  // Main tab switch warning modal
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            isFinalWarning ? 'bg-red-100' : 'bg-orange-100'
          }`}>
            {isFinalWarning ? (
              <AlertTriangle className="w-10 h-10 text-red-600" />
            ) : (
              <Eye className="w-10 h-10 text-orange-600" />
            )}
          </div>
        </div>

        <h2 className={`text-2xl font-bold mb-3 ${
          isFinalWarning ? 'text-red-700' : 'text-orange-700'
        }`}>
          {isFinalWarning ? '⚠️ Final Warning!' : 'Warning: Tab Switch Detected'}
        </h2>

        <p className="text-slate-700 mb-4 leading-relaxed">
          {isFinalWarning ? (
            <>
              You have switched tabs/windows <strong>{warningCount} times</strong>. 
              One more violation and your test will be <strong className="text-red-600">automatically submitted</strong>.
            </>
          ) : (
            <>
              You switched away from the test window. This is your <strong>first warning</strong>. 
              Repeated violations will result in automatic test submission.
            </>
          )}
        </p>

        <div className={`rounded-xl p-4 mb-6 ${
          isFinalWarning ? 'bg-red-50 border border-red-200' : 'bg-orange-50 border border-orange-200'
        }`}>
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${
              isFinalWarning ? 'text-red-600' : 'text-orange-600'
            }`} />
            <p className={`font-semibold ${
              isFinalWarning ? 'text-red-900' : 'text-orange-900'
            }`}>
              Warnings: {warningCount} / 3
            </p>
          </div>
          <div className="mt-2 flex gap-1 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full ${
                  i <= warningCount
                    ? isFinalWarning && i === warningCount
                      ? 'bg-red-500'
                      : 'bg-orange-500'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={onReturn}
          className={`w-full py-4 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl ${
            isFinalWarning
              ? 'bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              : 'bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
          }`}
        >
          Return to Test
        </button>

        <p className="text-xs text-slate-500 mt-4">
          Stay focused on the test window to avoid disqualification
        </p>
      </div>
    </div>
  );
}