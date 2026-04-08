import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import Header from "@/components/header/header";
import { getWorkersById } from "@/services/worker/getWorkersById";
import { MapPin, ChevronLeft, Calendar, Clock, Briefcase, Star } from "lucide-react";
import { DAYS } from "@/services/days";
import { useAuth } from "@/context/AuthContext";
import RequestServiceModal from "@/components/modal/RequestServiceModal";

const ServiceDetailsView = () => {
    const { logout } = useAuth();
    const { state } = useLocation();
    const service = state?.service;
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openRequest, setOpenRequest] = useState(false);

    useEffect(() => {
        const fetchWorker = async () => {
            if (!service?.user_id) return;

            const response = await getWorkersById(service.user_id);
            if (response.success) {
                setWorker(response.worker);
            }
        };
        fetchWorker();
        setLoading(false);
    }, [service]);

    const totalPrice = () => {
        let total = Number(service?.price) + 5000;
        return total;
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <>
            <Header
                links={[
                    { name: "Inicio", to: "/home-customer" },
                    { name: "Mis solicitudes", to: "/" },
                    { name: "Perfil", to: "/" },
                ]}
                backgroundColor="bg-primary"
                textColor="text-white"
                position="fixed"
                rightContent={
                    <button
                        onClick={handleLogout}
                        className="text-white text-sm font-semibold hover:opacity-70 transition-opacity cursor-pointer"
                    >
                        Cerrar sesión <span aria-hidden="true">&rarr;</span>
                    </button>
                }
            />
            {loading ? (
                <div className="min-h-screen pt-20 pb-16">
                    <h1>Cargando los detalles del servicio...</h1>
                </div>
            ) :
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    exit={{ x: '100%', opacity: 0 }}
                    className="min-h-screen bg-gray-50 pt-20 pb-16"
                >
                    <div className="px-6 md:px-10 py-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-md text-gray-500 hover:text-primary hover:cursor-pointer transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Volver
                        </button>
                    </div>

                    <div className="px-6 md:px-10">
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-white bg-primary/80 px-3 py-1 rounded-full mb-3">
                                <MapPin size={16} />
                                {service?.type === 'domicilio' ? 'Domicilio' : 'Local'}
                            </span>
                            <h1 className="text-primary text-3xl font-bold">{service?.name}</h1>
                            <p className="text-md text-gray-500 mt-1">{service?.subcategory}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-5">
                                {/* Imagen */}
                                <div className="rounded-xl overflow-hidden border border-gray-100">
                                    <img src={service?.imageUrl} alt={service?.name} className="w-full h-80 object-cover" />
                                </div>

                                {/* Descripcion */}
                                <div className="p-2">
                                    <h2 className="font-semibold text-gray-900 mb-2">Descripción general del servicio</h2>
                                    <p className="text-md text-gray-600 leading-relaxed">{service?.description}</p>
                                </div>

                                {/* Disponibilidad */}
                                <div className="p-2">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calendar size={20} className="text-primary" />
                                        <h2 className="text-md font-semibold text-gray-900">Disponibilidad</h2>
                                    </div>

                                    <div className="flex gap-2 flex-wrap mb-3">
                                        {service?.schedule?.days.map((dayKey) => {
                                            const dayLabel = DAYS.find(d => d.key === dayKey)?.label || dayKey;
                                            return (
                                                <span key={dayKey} className="px-3 py-1.5 bg-primary-light text-primary text-xs font-medium rounded-lg">{dayLabel}</span>
                                            )
                                        })}
                                    </div>
                                    {service?.schedule?.start && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock size={14} className="text-primary" />
                                            <span>{service?.schedule.start} - {service?.schedule.end}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Worker info */}
                                {worker && (
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
                                        <h2 className="text-md font-semibold text-gray-900 mb-4">Prestador de servicio</h2>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
                                                {worker?.name?.charAt(0) || '?'}
                                            </div>

                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{worker?.name}</p>
                                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase size={12} /> {worker?.job}
                                                    </span>
                                                    -
                                                    <span>{worker.exp} de experiencia</span>
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center gap-1 my-0.5"> <MapPin size={12} /> {worker?.city}</p>
                                                <p className="text-sm text-primary flex items-center gap-2">
                                                    <span className="flex items-center gap-1">
                                                        <Star size={12} /> 4.9 (128 reviews)
                                                    </span>
                                                    -
                                                    <span>Verificado</span>
                                                </p>
                                            </div>

                                            <button className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 bg-primary-light hover:bg-primary hover:text-white hover:cursor-pointer rounded-xl transition-all">
                                                Ver perfil
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h2>Ubicacion del negocio</h2>
                                        {worker?.location && (
                                            <a
                                                href={`https://www.google.com/maps?q=${worker.location.lat},${worker.location.lng}`} target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p className="text-sm text-gray-500 hover:cursor-pointer">Ver en Google Maps</p>
                                            </a>
                                        )}
                                    </div>

                                    {!worker?.location ? (
                                        <div className="text-center bg-white rounded-xl h-90 flex items-center justify-center">
                                            <h2>El trabajador no tiene un punto fisico</h2>
                                        </div>
                                    ) :
                                        <>
                                            <div className="rounded-xl overflow-hidden h-90 relative z-0">
                                                <MapContainer
                                                    center={[worker.location.lat, worker.location.lng]}
                                                    zoom={15}
                                                    className="w-full h-full"
                                                >
                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                    <Marker position={[worker.location.lat, worker.location.lng]}>
                                                        <Popup>
                                                            {worker.address}
                                                        </Popup>
                                                    </Marker>
                                                </MapContainer>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                                <MapPin size={12} /> {worker?.address}, {worker?.city}, Colombia
                                            </p>
                                        </>
                                    }

                                </div>
                            </div>

                            <aside className="space-y-4">
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
                                    <div className="mb-5">
                                        <p className="text-sm text-gray-400 mb-1">Precio total del servicio</p>
                                        <span className="flex gap-1 items-baseline-last">
                                            <p className="text-3xl font-bold text-primary">${Number(totalPrice()).toLocaleString('es-CO')}</p>
                                            <p className="text-sm text-gray-400">COP</p>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl mb-5">
                                        <div className="w-full px-2 text-sm">
                                            <div className="flex items-center justify-between border-b-2 pb-2">
                                                <p className="text-gray-600">Servicio</p>
                                                <p className="text-primary">${Number(service?.price).toLocaleString('es-CO')}</p>
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <p className="text-sm text-gray-600">Domicilio</p>
                                                <p className="text-sm text-primary">${'5.000'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 bg-primary text-white hover:bg-primary-dark hover:cursor-pointer text-sm font-semibold rounded-xl transition-colors mb-3" onClick={() => setOpenRequest(true)}>
                                        Solicitar servicio
                                    </button>
                                    <button className="w-full py-3 border border-primary/30 text-primary text-sm font-semibold rounded-xl hover:bg-primary-light hover:cursor-pointer transition-colors mb-3">
                                        Contactar a {worker?.name}
                                    </button>

                                    <p className="w-full py-3 text-xs font-semibold text-center flex items-center flex-col leading-relaxed text-gray-500">
                                        <span>Solicitarlo es gratis.</span>
                                        <span>Solo pagas una vez que el trabajo esté terminado.</span>
                                    </p>
                                </div>
                            </aside>
                        </div>
                    </div>
                </motion.div>
            }
            {openRequest && (
                <RequestServiceModal
                    open={openRequest}
                    onClose={() => setOpenRequest(false)}
                    service={service}
                    worker={worker}
                />
            )}
        </>
    );
}

export default ServiceDetailsView;