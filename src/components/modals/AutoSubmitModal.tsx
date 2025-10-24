interface AutoSubmitModalProps {
  message: string;
}

export default function AutoSubmitModal({ message }: AutoSubmitModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-red-700">Test Auto-Submitted</h2>
        <p className="text-slate-700 mb-4">
          {message}
        </p>
        <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}