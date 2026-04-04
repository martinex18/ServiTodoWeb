import { ChartArea, MapPin } from "lucide-react";
import CustomCard from "./CustomCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
    const { id, name, description, price, imageUrl, type, workerName, workerCity } = service;
    const navigate = useNavigate();
    return (
        <CustomCard
            header={
                <div className="relative">
                    <img src={imageUrl} alt={name} className="w-full h-44 object-cover" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-domicilio/50 backdrop-blur-sm rounded-full">
                        <MapPin size={14} className="text-primary" />
                        <span className="tracking-normal">{type === 'domicilio' ? 'Domicilio' : 'Local'}</span>
                    </div>
                </div>
            }

            body={
                <div className="space-y-3">
                    <div>
                        <div className="w-full mb-1">
                            <p className="text-primary font-semibold text-xs px-1">4.9 (128 reviews)</p>
                        </div>
                        <div className="h-24">
                            <h3 className="text-gray-900 text-sm font-bold px-1">{name}</h3>
                            <p className="text-primary font-bold text-sm px-1 py-0.5">
                                ${Number(price).toLocaleString('es-CO')}
                            </p>
                            <p className="text-sm text-gray-400 px-1 line-clamp-2">{description}</p>
                        </div>

                        <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {workerName?.charAt(0) || '?'}
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="text-gray-800 text-xs font-medium">{workerName}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-0.5">
                                    <MapPin size={12} />
                                    {workerCity}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }

            footer={
                <motion.button whileHover={{ scale: 1.04 }} onClick={() => navigate(`/service/${id}`, { state: { service } })} className="w-full py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark hover:cursor-pointer rounded-xl transition-colors">
                    Ver detalles
                </motion.button>
            }
        />
    )
}

export default ServiceCard;