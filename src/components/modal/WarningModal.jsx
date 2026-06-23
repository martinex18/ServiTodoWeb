import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

const WarningModal = ({ isOpen, title, message = "", buttonText = "Continuar", buttonClose = "No", open, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                    />

                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
                            <div className="flex justify-center mb-5">
                                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center">
                                    <AlertTriangle size={48} className="text-amber-500" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 tracking-wide">{title}</h2>
                            <p className="text-gray-500 mt-3 leading-relaxed">{message}</p>

                            <div className="flex items-center gap-6">
                                <button className="w-full mt-6 py-3 rounded-xl bg-gray-400 text-white font-semibold hover:bg-gray-500 transition-colors cursor-pointer" onClick={onClose}>
                                    {buttonClose}
                                </button>
                                <button className="w-full mt-6 py-3 rounded-xl bg-green-500 text-white font-semibold tracking-wide hover:bg-green-600 transition-colors cursor-pointer" onClick={open}>
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WarningModal;