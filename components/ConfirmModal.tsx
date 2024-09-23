export interface ConfirmModalProps {
  confirmFunction: () => void;
  cancelFunction: () => void;
}

const ConfirmModal = ({ confirmFunction, cancelFunction }:ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
          <p className="text-gray-700 mb-6">Are you sure you want to delete this entry?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={confirmFunction}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={cancelFunction}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
  )
}
export default ConfirmModal