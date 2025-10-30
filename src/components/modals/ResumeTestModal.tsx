// import { Clock, PlayCircle, AlertTriangle } from 'lucide-react';

// interface ResumeTestModalProps {
//   timeRemaining: number;
//   onResume: () => void;
//   onSubmitAndLeave: () => void;
//   showExitConfirm: boolean;
//   onHideExitConfirm: () => void;
// }

// export default function ResumeTestModal({ 
//   timeRemaining, 
//   onResume, 
//   onSubmitAndLeave,
//   showExitConfirm,
//   onHideExitConfirm
// }: ResumeTestModalProps) {
//   const formatTime = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
    
//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }
//     return `${minutes}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Exit confirmation modal (controlled by parent)
//   if (showExitConfirm) {
//     return (
//       <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <AlertTriangle className="w-8 h-8 text-red-600" />
//           </div>
          
//           <h2 className="text-2xl font-bold text-slate-900 mb-3">
//             Leave Test?
//           </h2>
          
//           <p className="text-slate-600 mb-6">
//             Going back will submit your test and you won&apos;t be able to continue. Do you want to proceed?
//           </p>
          
//           <div className="flex gap-3">
//             <button
//               onClick={onSubmitAndLeave}
//               className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
//             >
//               Submit & Leave
//             </button>
//             <button
//               onClick={onHideExitConfirm}
//               className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
//             >
//               Stay
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main resume modal
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
//         <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
//           <PlayCircle className="w-10 h-10 text-indigo-600" />
//         </div>
        
//         <h2 className="text-2xl font-bold text-slate-900 mb-3">
//           Resume Your Test
//         </h2>
        
//         <p className="text-slate-600 mb-6">
//           Your test session was restored. Click below to continue in fullscreen mode.
//         </p>
        
//         <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
//           <div className="flex items-center justify-center gap-2 text-indigo-900">
//             <Clock className="w-5 h-5" />
//             <div>
//               <p className="text-sm font-medium">Time Remaining</p>
//               <p className="text-2xl font-bold">{formatTime(timeRemaining)}</p>
//             </div>
//           </div>
//         </div>
        
//         <button
//           onClick={onResume}
//           className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//         >
//           Resume Test
//         </button>
        
//         <p className="text-xs text-slate-500 mt-4">
//           The test will enter fullscreen mode when you click resume
//         </p>
//       </div>
//     </div>
//   );
// }

import { Clock, PlayCircle, AlertTriangle } from 'lucide-react';

interface ResumeTestModalProps {
  timeRemaining: number;
  onResume: () => void;
  onSubmitAndLeave: () => void;
  showExitConfirm: boolean;
  onHideExitConfirm: () => void;
  onBackPressed: () => void;
}

export default function ResumeTestModal({ 
  timeRemaining, 
  onResume, 
  onSubmitAndLeave,
  showExitConfirm,
  onHideExitConfirm
}: ResumeTestModalProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Exit confirmation modal (controlled by parent)
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
              onClick={onHideExitConfirm}
              className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
            >
              Stay
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main resume modal
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <PlayCircle className="w-10 h-10 text-indigo-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Resume Your Test
        </h2>
        
        <p className="text-slate-600 mb-6">
          Your test session was restored. Click below to continue in fullscreen mode.
        </p>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-indigo-900">
            <Clock className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Time Remaining</p>
              <p className="text-2xl font-bold">{formatTime(timeRemaining)}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={onResume}
          className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Resume Test
        </button>
        
        <p className="text-xs text-slate-500 mt-4">
          The test will enter fullscreen mode when you click resume
        </p>
      </div>
    </div>
  );
}