//import { getWorkerRequests } from "@/services/worker/getWorkerRequests";
import Header from "@/components/header/header";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getWorkerRequests } from "@/services/worker/getWorkerRequests";
import { Avatar, Tooltip } from "@mui/material";
import { BanknoteIcon, Calendar, Clock, Info, MapPin, Store, Van, X } from "lucide-react";
import { motion } from "framer-motion";
import { updateRequest } from "@/services/request/updateRequest";

const RequestView = () => {

    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const serviceTypeConfig = {
        domicilio: {
            label: "Domicilio",
            icon: Van,
            bg: "bg-domicilio",
        },
        local: {
            label: "Local",
            icon: Store,
            bg: "bg-local",
        },
    };
    const type = serviceTypeConfig[selectedRequest?.service_type] || {};
    const Icon = type.icon;

    /*const formatTime = (timestamp) => {
        if (!timestamp) return '-';

        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

        return new Intl.DateTimeFormat('es-CO', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    } */

    useEffect(() => {
        if (!user?.uid) return;
        const fetchRequest = async () => {
            setLoading(true);
            try {
                const response = await getWorkerRequests(user?.uid);

                if (response.success) {
                    setRequests(response.requests);
                }
            } catch (error) {
                console.error('Error obteniendo solicitudes', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequest();
    }, [user?.uid]);

    const handleStatus = async (status) => {
        if (!selectedRequest) return null;

        try {
            const response = await updateRequest(selectedRequest.id, status);

            if (response.success) {
                setRequests((prev) =>
                    prev.map((req) =>
                        req.id === selectedRequest.id ? { ...req, status } : req
                    )
                );

                setSelectedRequest((prev) => ({
                    ...prev,
                    status,
                }));
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Header links={[
                { name: "Inicio", to: "/home-worker" },
                { name: "Mis solicitudes", to: "/requests" },
                { name: "Perfil", to: "/profile" },
            ]}
                backgroundColor="bg-primary"
                textColor="text-white"
                position="fixed"
                rightContent={
                    <button
                        //onClick={handleLogout}
                        className="text-white text-sm font-semibold hover:opacity-70 transition-opacity cursor-pointer"
                    >
                        Cerrar sesión <span aria-hidden="true">&rarr;</span>
                    </button>
                }
            />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8 lg:px-12">
                {/* Saludo */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Solicitudes de servicio
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Gestiona tus solicitudes</p>
                </div>
                <div className={`grid grid-cols-1 gap-6 transition-all duration-300 ${selectedRequest ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
                    {/* Tabla */}
                    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-5 transition-all duration-300 ${selectedRequest ? "lg:col-span-2" : "lg:col-span-1"}`}>
                        <table className="w-full">
                            <thead className="text-left text-sm font-semibold text-gray-500 px-6 py-4">
                                <tr className="border-b-2 border-gray-100">
                                    <th className="font-semibold px-6 py-4">Cliente</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4">Servicio</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4">Dirección</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4">Fecha</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4">Hora</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 px-6 py-4">Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan='6' className="text-center py-6 text-sm text-gray-400">
                                            No hay solicitudes aun
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((req) => (
                                        <tr key={req?.id} onClick={() => setSelectedRequest(req)} className="border-b border-gray-100 hover:bg-primary-light transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar alt="customer" sx={{ bgcolor: '#5f8d92' }}>{req?.client_name?.charAt(0) || ''}</Avatar>
                                                    <p className="text-sm font-medium text-gray-900">{req?.client_name || '-'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {req?.service_name || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {req?.address || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {req?.date || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {req?.time || '-'}
                                            </td>
                                            <td className="px-4 py-4 text-sm capitalize">
                                                <div className={` ${req?.status == 'pendiente' ? 'bg-pending-bg' : 'bg-unknown-bg'}  px-2 py-1 rounded-full`}>
                                                    {req?.status || '-'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {selectedRequest && (
                        <motion.aside initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
                                {/* img */}
                                <div className="flex items-center gap-3">
                                    <Avatar alt="usuario" sx={{ width: 80, height: 80, bgcolor: '#5f8d92' }}>{selectedRequest?.client_name?.charAt(0) || ''}</Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-xl text-gray-900">{selectedRequest?.client_name || '-'}</h2>
                                        <p className='flex items-center gap-1 capitalize'>
                                            <MapPin size={18} />
                                            <span>{selectedRequest?.client_city || '-'}</span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRequest(null)}
                                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="my-4">
                                    <p className={`inline-flex items-center gap-1.5 text-xs font-medium text-white ${type.bg} px-3 py-1 rounded-full tracking-wider`}>
                                        {Icon && <Icon size={16} />}
                                        {type.label || '-'}
                                    </p>
                                </div>

                                <div className="bg-gray-200 py-2 px-4 rounded-2xl">
                                    <p className="mb-2">Nota</p>
                                    <p className="">{selectedRequest?.notes || '-'}</p>
                                </div>

                                <div className="flex flex-col mt-4 gap-4">
                                    <div className="flex items-center gap-4">
                                        <Calendar size={22} className="text-primary" />
                                        <p className="flex flex-col">
                                            <span className="text-xs font-medium text-gray-700">Fecha</span>
                                            <span className="text-sm font-bold">{selectedRequest?.date || '-'}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Clock size={22} className="text-primary" />
                                        <p className="flex flex-col">
                                            <span className="text-xs font-medium text-gray-700">Hora</span>
                                            <span className="text-sm font-bold">{selectedRequest?.time || '-'}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <MapPin size={22} className="text-primary" />
                                        <p className="flex flex-col">
                                            <span className="text-xs font-medium text-gray-700">Dirección</span>
                                            <span className="flex items-center gap-3">
                                                <span className="text-sm font-bold capitalize cursor-pointer">{selectedRequest?.address || '-'}</span>
                                                <Tooltip title='Click sobre la dirección para ver más detallado' placement="top" arrow>
                                                    <Info size={16} />
                                                </Tooltip>
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <BanknoteIcon size={22} className="text-primary" />
                                        <p className="flex flex-col">
                                            <span className="text-xs font-medium text-gray-700">Precio</span>
                                            <span className="text-sm font-bold">{selectedRequest?.service_price || '-'}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center mt-3 gap-4 py-2 px-2">
                                    <button type="button" className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer disabled:hover:bg-gray-200 disabled:opacity-60" disabled={selectedRequest?.status === 'aceptado' || selectedRequest?.status === 'cancelado'} onClick={() => handleStatus('cancelado')}>
                                        Cancelar
                                    </button>

                                    <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors disabled:hover:bg-primary disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer " disabled={selectedRequest?.status === 'aceptado' || selectedRequest?.status === 'cancelado'} onClick={() => handleStatus('aceptado')}>
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </div>
            </div>
        </>
    )
}

export default RequestView;