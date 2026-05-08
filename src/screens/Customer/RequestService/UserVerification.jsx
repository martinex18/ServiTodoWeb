import { registerCustomer } from "@/services/auth/register/registerCustomer";
import { verifyOTP } from "@/services/auth/verifyOTP";
import { createRequest } from "@/services/request/createRequest";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserVerification = ({ phone, onVerify, onBack }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerify = async (code) => {
        try {
            setLoading(true);
            
            if (code.length !== 6) {
                setError('Ingrese el codigo de 6 digitos');
                return;
            }
            onVerify(code);
            setError('');

            // valida OTP
            const otpResult = await verifyOTP(confirmationCode, code);

            if (!otpResult.success) {
                setError(otpResult.message);
                return;
            }

            // registro de client
            await registerCustomer(
                otpResult.user,
                {
                    name: form.name,
                    phone: form.phone,
                }
            );

            // registro de solicitud
            await createRequest({
                clientId: otpResult.user.uid,
                clientName: form.name,
                clientPhone: form.phone,

                serviceDescription: form.service,
                serviceAddress: form.address,
                serviceDate: form.date,
            });

            navigate('/serarching-worker');
        } catch (error) {
            setError('Error al verificar el código. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-green-100 rounded-full mb-3">
                    <Phone className="text-green-600" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Verifica tu número</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Enviamos un código a <span className="font-medium text-gray-700">{phone}</span>
                </p>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Código de 6 dígitos"
                    className="w-full text-center text-lg tracking-widest py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>

            {error && (
                <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
            )}

            <div className="flex flex-col items-center gap-2">
                <button
                    type="button"
                    onClick={handleVerify}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                    Buscar mi mejor opción
                    <ArrowRight size={16} />
                </button>

                <button type="button" className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm text-gray-600 bg-gray-50 font-medium rounded-md hover:bg-gray-100 transition cursor-pointer" onClick={onBack}>
                    <ArrowLeft size={16} />
                    Editar información
                </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
                ¿No recibiste ningún código?{" "}
                <span className="text-primary font-medium cursor-pointer hover:underline">
                    Reenviar
                </span>
            </p >
        </div>
    );
}

export default UserVerification;