import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { useState, useEffect } from "react";
import { Avatar, LinearProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import searchingAnimation from "@/assets/animation/Searching.json";
import { ChevronRight, Headset } from "lucide-react";
import { cancelRequest } from "@/services/Request/cancelRequest";
import WorkerFound from "@/components/cards/WorkerFound/WorkerFound";
import { findWorker } from "@/services/worker/findWorker";
import { sendRequestNotification } from "@/services/whatsapp/sendRequestNotification";

const SearchingWorkerView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const requestId = location.state?.requestId;
    const category = location.state?.category;
    const description = location.state?.description;
    const address = location.state?.address;
    const [searchStatus, setSearchStatus] = useState('searching');
    const [worker, setWorker] = useState(null);
    const [progress, setProgress] = useState(0);

    const searchWorker = async () => {
        try {
            setSearchStatus('searching');
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return prev;
                    return prev + 10;
                })
            }, 100);

            const result = await findWorker(category);

            if (!result.success || result.workers.length === 0) {
                setSearchStatus('not-found');
                return;
            }

            for (const worker of result.workers) {
                await sendRequestNotification(
                    `+57${worker.phone}`,
                    category,
                    description,
                    address,
                );
            }

            setTimeout(() => {
                clearInterval(interval);
                setProgress(100);
                setWorker(result.workers[0]);
                setSearchStatus('found');
            }, 3000);
        } catch (error) {
            console.log("Error al buscar worker:", error);
            setSearchStatus('error');
        }
    }

    useEffect(() => {
        searchWorker();
    }, []);

    const handleCancel = async () => {
        const result = await cancelRequest(requestId);

        if (!result.success) {
            return;
        }
        navigate('/request-service');
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
            {searchStatus === 'searching' && (
                <div className="bg-gray-50 px-4 py-8 md:py-10">
                    <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 text-center">
                        <div className="w-52 md:w-60 -mb-2">
                            <Lottie animationData={searchingAnimation} loop />
                        </div>

                        <div className="space-y-2 max-w-md">
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Estamos buscando la mejor opción para ti</h1>
                            <p className="text-gray-500 text-sm leading-relaxed">Analizando perfiles certificados cerca de tu ubicación para garantizar un servicio rápido y seguro.</p>
                        </div>

                        {/* Barra de carga */}
                        <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-primary">Conectando...</p>
                                <span className="text-xs text-gray-400">{progress}%</span>
                            </div>
                            <LinearProgress variant="determinate" value={progress} />

                            <div className="flex items-center gap-3 mt-4">
                                <div className="p-2 rounded-md bg-blue-200">
                                    <Headset size={18} className="text-primary" />
                                </div>
                                <div className="flex flex-col items-start text-left">
                                    <p className="text-sm text-gray-900 font-semibold">Validando disponibilidad</p>
                                    <p className="text-xs text-gray-500">Estamos enviado tu solicitud de servicio</p>
                                </div>
                            </div>
                        </div>

                        {/* Sugerencia para completar perfil */}
                        <div className="w-full max-w-md flex items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center gap-3">
                                <Avatar sx={{ width: 46, height: 46, bgcolor: '#5f8d92' }} />
                                <div className="flex flex-col items-start text-left">
                                    <p className="text-sm text-gray-900 font-semibold">
                                        Completar perfil
                                    </p>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        Mejora tu experiencia mientras encontramos tu profesional ideal
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-primary shrink-0" />
                        </div>

                        <button className="text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer" onClick={handleCancel}>Cancelar búsqueda</button>
                    </div>
                </div>
            )}

            {searchStatus === 'found' && <WorkerFound worker={worker} />}
            <Footer />
        </>
    );
}

export default SearchingWorkerView;