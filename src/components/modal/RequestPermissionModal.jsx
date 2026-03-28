import { Bell, BellOff, ChevronRight, ArrowUp } from "lucide-react";

export default function RequestPermissionModal({ open, onClose, onAccept }) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4 pt-4 sm:items-end sm:justify-start sm:pt-0 sm:pb-6 sm:pl-6">
            <div className="fixed inset-0 bg-black/20 sm:hidden" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xs animate-fade-in">
                <div className="hidden sm:flex items-center gap-2 px-4 pt-4 text-primary">
                    <ArrowUp size={16} className="animate-bounce" />
                    <span className="text-xs font-medium text-gray-500">El permiso aparece arriba</span>
                </div>

                <div className="flex items-start pt-4 px-4 gap-3 sm:pt-2 pb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                        <Bell size={20} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">Activa las notificaciones</p>
                        <p className="text-gray-500 text-sm leading-relaxed">Entérate cuando un cliente solicite tus servicios en tiempo real.</p>
                    </div>
                </div>

                <div className="flex gap-2 px-4 pb-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                        <BellOff size={12} />
                        Ahora no
                    </button>

                    <button
                        type="button"
                        onClick={onAccept}
                        className="flex-1 py-2 text-xs font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-1">
                        <Bell size={12} />
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}