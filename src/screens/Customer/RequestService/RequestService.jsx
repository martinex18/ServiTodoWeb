import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { LinearProgress } from "@mui/material";
import { ArrowRight, BadgeCheck, Calendar, MapPin, Medal, Phone, ToolCase, User, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVerification from "./UserVerification";
import { motion } from "framer-motion";

const inputClass = "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const RequestService = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ service: '', date: '', address: '', name: '', phone: '' });

    const handleNext = () => {
        setError('');

        /*if (!form.service || !form.date || !form.address || !form.phone) {
            setError("Completa todos los campos para continuar");
            return;
        }

        if (form.phone.length < 10) {
            setError("Ingresa un número válido");
            return;
        }*/

        setStep(2);
    }

    return (
        <>
            <Header
                backgroundColor='bg-white/70 backdrop-blur-md border-b border-gray-100'
                textColor='text-gray-600'
                rightContent={
                    <div className='flex items-center gap-3'>
                        <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/login')}>
                            Iniciar sesión
                        </button>
                        <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow-md cursor-pointer" onClick={() => navigate('/register-worker')}>
                            Ofrece tus servicios
                        </button>
                    </div>
                }
            />

            <div className="min-h-screen bg-gray-50 pb-16 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">

                    <div className="mt-6 max-w-xl mx-auto">
                        <p className="text-sm text-gray-500 flex justify-between mb-2">
                            <span>Paso {step} de 2</span>
                            <span className="font-medium text-primary">Solicitud rapida</span>
                        </p>
                        <LinearProgress variant="determinate" value={step === 1 ? 50 : 100} />
                    </div>
                    {step === 1 && (
                        <>
                            <div className="flex flex-col items-center mt-12 text-center">
                                <h1 className="text-3xl font-semibold text-gray-900">Cuéntanos qué necesitas</h1>
                                <p className="text-gray-500 mt-2">Te recomendaremos el mejor profesional en segundos ⚡</p>
                            </div>

                            <div className="mt-10">
                                <motion.div className="bg-white max-w-xl mx-auto rounded-2xl shadow-sm border border-gray-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <form className="px-6 py-6 space-y-5">
                                        <div>
                                            <label className={labelClass}>¿Que servicio necesitas?</label>
                                            <div className="relative">
                                                <ToolCase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input className={`${inputClass} text-base py-4`} placeholder="Ej. Necesito un plomero para una fuga" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>¿Cuando lo necesitas?</label>
                                                <div className="relative">
                                                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="date"
                                                        className={inputClass}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={form.date}
                                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className={labelClass}>Tu ubicación</label>
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Ej. Cra 45 #50-84"
                                                        className={inputClass}
                                                        value={form.address}
                                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>Nombre</label>
                                            <div className="relative">
                                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Ej. Roberto Martinez"
                                                    className={inputClass}
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>Número de WhatsApp</label>
                                            <div className="relative">
                                                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Ej. 312 266 4124"
                                                    className={inputClass}
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">Te contactaremos por este medio para confirmar detalles.</p>
                                        </div>

                                        {error && (
                                            <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>
                                        )}
                                        <button type="button" className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-all shadow-sm hover:shadow-md cursor-pointer" onClick={handleNext}>
                                            Siguiente
                                            <ArrowRight size={18} />
                                        </button>
                                        <p className="text-sm text-gray-400 text-center">⏱ Toma menos de 1 minuto</p>


                                    </form>
                                </motion.div>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <div className="mt-10">
                            <motion.div className="max-w-xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <UserVerification
                                    phone={form.phone}
                                    onBack={() => setStep(1)}
                                    onVerify={(code) => {
                                        console.log('Codigo: ', code);
                                        //validar codigo
                                    }}
                                />
                            </motion.div>
                        </div>
                    )}

                    <div className="flex justify-center flex-wrap gap-20 mt-12 text-sm text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                            <span className='p-2 rounded-lg bg-blue-200'>
                                <BadgeCheck className='text-blue-500' />
                            </span>
                            <p>Seguro</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className='p-2 rounded-lg bg-blue-200'>
                                <Zap className='text-blue-500' />
                            </span>
                            <p >Rapido</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className='p-2 rounded-lg bg-blue-200'>
                                <Medal className='text-blue-500' />
                            </span>
                            <p >Calificado</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RequestService;