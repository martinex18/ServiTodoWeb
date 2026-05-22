import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const SuccessModal = ({ isOpen, title, message = "", buttonText = "Continuar", onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle2 size={48} className="text-green-500" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                            <p className="text-gray-500 mt-3 leading-relaxed">{message}</p>

                            <button className="w-full mt-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors cursor-pointer" onClick={onClose}>
                                {buttonText}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;