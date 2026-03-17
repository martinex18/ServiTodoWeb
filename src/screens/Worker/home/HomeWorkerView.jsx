import { useEffect, useState } from "react";
import { EditIcon, User2Icon, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext'

import Header from "../../../components/header/header";
import AddServicesModal from "../../../components/modal/addServicesModal";
import { getWorkerServices } from "@/services/worker/getWorkerServices";



const HomeWorkerView = () => {
    
    const { user, logout } = useAuth();
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getWorkerServices(user.uid);
            if(response.success) setServices(response.services);
            setLoadingServices(false);
        }
        fetchData();
    }, [user.uid]);

    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }
    
    return(
        <>
            <Header 
                links = {[
                {name: 'Solicitudes', to: '/'},
                {name: 'Reservas', to: '/'},
                {name: 'Mis servicios', to: '/'},
                ]}
                backgroundColor = 'bg-primary'
                textColor = 'text-white'
                position = 'fixed'
                rightContent={
                    <button onClick={handleLogout} className="text-white text-sm font-semibold hover:opacity-70 transition-opacity hover:cursor-pointer">
                        Cerrar sesion <span aria-hidden="true">&rarr;</span>
                    </button>
                }
            />

            <div className="min-h-screen bg-contain bg-center bg-gray-50 pt-28 pb-16 px-10">
                <div className="flex flex-col mb-8 gap-1.5">
                    <h1 className="text-2xl font-semibold text-gray-800">{`Hola, ${user?.name || 'Usuario'}`}</h1>
                    <p className="text-gray-500">Aqui tienes un resumen de tu actividad</p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Solicitudes de servicios</h2>
                        <div className="space-y-3">
                            {loadingServices ? (
                                <p className="text-muted">Cargando...</p>
                            ): services.length === 0 ? (
                                <p className="text-muted">No tienes servicios publicados</p>
                            ) : (
                                services.map((serv) => (
                                <div key={serv.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {serv.name} - {serv.category}
                                        </p>
                                        <p className="text-sm text-muted">
                                            ${serv.price} · {serv.type}
                                        </p>
                                    </div>
                                    <button className="text-blue-600 text-sm font-medium hover:underline">
                                        Ver detalles
                                    </button>
                                </div>
                                ))
                            )
                            }
                        </div>
                        <button className="mt-5 w-md bg-primary text-white py-2 rounded-lg hover:bg-primaryS">
                            Ver Todas las Solicitudes
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold mb-4">Acciones Rápidas</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center gap-2 bg-gray-100 p-2 rounded-lg text-left hover:bg-gray-200"> <EditIcon size={27} /> Gestionar mis servicios </button>
                                <button className="w-full flex items-center gap-2 bg-gray-100 p-2 rounded-lg text-left hover:bg-gray-200" onClick={() => setOpenModal(true)}><Plus size={27}/> Ofrecer un servicio </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddServicesModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    )
}

export default HomeWorkerView;