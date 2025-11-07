export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                onClick={onClose}
                className="absolute top-0 left-0 w-full h-full bg-black opacity-50 bg-opacity-50 flex items-center justify-center"
            />
            <div className="bg-white rounded-xl shadow-xl w-[280px] max-w-full p-6 relative ">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                ✖
                </button>
                {children}
            </div>
        </div>
    )
}