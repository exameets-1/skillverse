interface ExitModalProps {
  onSubmitAndLeave: () => void;
  onStay: () => void;
}

export default function ExitModal({ onSubmitAndLeave, onStay }: ExitModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-2 text-slate-900">Leave Test?</h2>
        <p className="text-slate-600 mb-4">
          Going back will submit your test. Do you want to continue?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onSubmitAndLeave}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Submit & Leave
          </button>
          <button
            onClick={onStay}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Stay
          </button>
        </div>
      </div>
    </div>
  );
}