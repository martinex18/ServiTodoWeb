import { useAuth } from "@/context/AuthContext";
import { createRequest } from "@/services/Request/createRequest";
import { Calendar, Clock, FileText, Loader2, MapPin, X } from "lucide-react";
import { useState } from "react";

const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

export default function RequestServiceModal({ open, onClose, service, worker }) {
    const { user } = useAuth();
    const [form, setForm] = useState({ date: '', time: '', address: '', notes: '' })
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.date || !form.time) {
            setError('La fecha y hora son obligatorias');
            return;
        }

        if (service?.type !== 'local' && !form.address) {
            setError('La dirección es obligatoria para servicios a domicilio.');
            return;
        }

        const selectedDate = new Date(`${form.date}T${form.time}`);
        if (selectedDate < new Date()) {
            setError('La fecha y hora deben ser en el futuro.')
            return;
        }

        setLoading(true);

        const response = await createRequest({
            service_id: service.id,
            service_name: service.name,
            worker_id: service.user_id,
            client_id: user.uid,
            client_name: user.name,
            client_phone: user.phone,
            date: form.date,
            time: form.time,
            address: form.address,
            notes: form.notes || "",
        });

        setLoading(false);

        if (response.success) {
            setSuccess(true);
            onClose();
            setForm({ date: '', time: '', address: '', notes: '' });
        } else {
            setError(response.error);
        }

    };

    const handleClose = () => {
        setForm({ date: '', time: '', address: '', notes: '' });
        setError('');
        setSuccess(false);
        onClose();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Solicitar servicio</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {success ? (
                    <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                            <span className="text-3xl">✅</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">¡Solicitud enviada!</h3>
                        <p className="text-sm text-gray-500">El trabajador recibirá tu solicitud y te notificará cuando la acepte.</p>
                        <button className="w-full mt-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors">
                            Entendido
                        </button>
                    </div>
                ) : (
                    <form className="px-6 py-5 space-y-4 overflow-y-auto">

                        <div className="bg-gray-50 rounded-xl p-3 bordefr border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
                                    {worker?.name?.charAt(0) || '?'}
                                </div>
                                <div className="flex-1 w-full">
                                    <p className="text-sm font-medium text-primary">{service?.name}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-2">
                                        <span>{worker?.name}</span> - <span>{worker?.city}</span>
                                    </p>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-medium text-white bg-primary/80 px-3 py-1 rounded-full">
                                    <MapPin size={14} />
                                    {service?.type === 'domicilio' ? 'Domicilio' : 'Local'}
                                </span>
                            </div>
                        </div>

                        {/* Fecha y hora */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Fecha</label>
                                <div className="relative">
                                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        className={`${inputClass} pl-10`}
                                        value={form.date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Hora</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="time"
                                        className={`${inputClass} pl-10`}
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dirección — solo si es domicilio o ambos */}
                        {service?.type !== 'Local' && (
                            <div>
                                <label className={labelClass}>Dirección</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Cra 45 #50-84"
                                        className={`${inputClass} pl-10`}
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Descripcion */}
                        <div>
                            <label className={labelClass}>Describa que necesita</label>
                            <div className="relative">
                                <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <textarea
                                    placeholder="Describe el problema o añade información adicional..."
                                    className={`${inputClass} pl-10 resize-none h-20`}
                                    value={form.notes}
                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Resumen */}
                        <div className="bg-gray-50 rounded-xl p-3 bordefr border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Resumen</p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-800">Servicio</p>
                                <p className="tetx-sm font-bold text-primary">${service?.price}</p>
                            </div>

                            <div className="flex items-center justify-between border-b pb-2.5">
                                <p className="text-sm font-medium text-gray-800">Domicilio</p>
                                <p className="tetx-sm font-bold text-primary">$5.000</p>
                            </div>

                            <div className="flex items-center justify-between pt-2.5">
                                <p className="text-sm font-medium text-gray-800">Precio total</p>
                                <p className="tetx-sm font-bold text-primary">${service?.price}</p>
                            </div>

                        </div>

                        {error && (
                            <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>
                        )}

                        {/* Botones */}
                        <div className="flex gap-3 pt-1">
                            <button type="button" onClick={handleClose} className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancelar</button>

                            <button type="submit" disabled={loading} onClick={handleSubmit} className="flex-1 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                                {loading ? <><Loader2 size={16} className="animate-spin" />Enviando...</> : 'Confirmar solicitud'}
                            </button>
                        </div>
                    </form>
                )
                }
            </div>
        </div>
    )
}