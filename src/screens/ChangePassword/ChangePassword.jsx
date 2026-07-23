import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { LockIcon, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const inputClass = "w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const ChangePassword = () => {
    const navigate = useNavigate();


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

            <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <LockIcon size={40} className="text-blue-600" />
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">
                                ¿Olvidaste tu contraseña?
                            </h1>

                            <p className="mt-3 text-gray-500 leading-relaxed">
                                No te preocupes. Ingresa el correo electrónico asociado a tu cuenta y
                                te enviaremos un enlace para restablecer tu contraseña.
                            </p>
                        </div>

                        <div className="mt-8 space-y-2">
                            <label htmlFor="email" className={labelClass}>
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" name="email" placeholder="ejemplo@correo.com" className={inputClass} />
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg">
                                Enviar enlace
                            </button>

                            <button className="w-full text-gray-600 hover:text-blue-600 transition font-medium">
                                Volver al inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ChangePassword;