import SuccessModal from "@/components/modal/SuccessModal";
import { loginClient } from "@/services/auth/login/loginClient";
import { registerCustomer } from "@/services/auth/register/registerCustomer";
import { verifyOTP } from "@/services/auth/verifyOTP";
import { createRequest } from "@/services/request/createRequest";
import { ArrowLeft, ArrowRight, Loader2, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserVerification = ({ phone, form, confirmationResult, onBack }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [requestId, setRequestId] = useState(null);

    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            setLoading(true);

            if (code.length !== 6) {
                setError('Ingrese el codigo de 6 digitos');
                return;
            }

            const otpResult = await verifyOTP(
                confirmationResult,
                code
            );

            if (!otpResult.success) {
                setError(otpResult.message);
                return;
            }

            const loginResult = await loginClient(
                confirmationResult,
                code,
                {
                    name: form.name,
                    phone: `+57${form.phone}`,
                },
            );

            if (!loginResult.success) {
                setError(loginResult.message);
                return;
            }

            const registerResult = await registerCustomer(
                {
                    name: form.name,
                    phone: `+57${form.phone}`,
                },
                otpResult.user
            );

            if (!registerResult.success) {
                setError(registerResult.message);
                return;
            }

            // registro de solicitud
            const requestResult = await createRequest({
                clientId: otpResult.user.uid,
                clientName: form.name,
                clientPhone: `+57${form.phone}`,

                serviceCategory: form.category,
                serviceDescription: form.notes,
                serviceAddress: form.address,
                serviceDate: form.date,
            });

            if (!requestResult.success) {
                setError(requestResult.message);
                return;
            } else {
                setRequestId(requestResult.id);
                setShowSuccess(true);
            }
        } catch (error) {
            console.error("Error al verificar el código: ", error);
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
                <button type="button" onClick={handleVerify} className="w-full flex items-center justify-center gap-3 px-5 py-3 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-all shadow-sm hover:shadow-md cursor-pointer">
                    {loading ? <> <Loader2 size={18} className="animate-spin" /> </> : "Buscar mi mejor opción"}
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

            <SuccessModal 
                isOpen={showSuccess}
                title="Solicitud enviada"
                message="Tu solicitud ha sido enviada exitosamente."
                buttonText="Continuar"
                onClose={() => {
                    setShowSuccess(false);
                    navigate('/searching-worker', {
                        state: {
                            requestId: requestId,
                            category: form.category,
                        },
                    });
                }}
            />
        </div>
    );
}

export default UserVerification;