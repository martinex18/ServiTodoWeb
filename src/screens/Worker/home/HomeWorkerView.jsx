import { useEffect, useState } from "react";
import { EditIcon, Plus, Briefcase, ChevronRight, Tag, MapPin } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext'
import Header from "../../../components/header/header";
import AddServicesModal from "../../../components/modal/addServicesModal";
import { getWorkerServices } from "@/services/worker/getWorkerServices";
import { DAYS } from "@/services/days";

const typeColors = {}

const HomeWorkerView = () => {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const fetchServices = async () => {
    const response = await getWorkerServices(user.uid);
    if (response.success) setServices(response.services);
    setLoadingServices(false);
  }

  useEffect(() => {
    fetchServices();
  }, [user.uid]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <>
      <Header
        links={[
          { name: 'Solicitudes', to: '/' },
          { name: 'Reservas', to: '/' },
          { name: 'Mis servicios', to: '/' },
        ]}
        backgroundColor='bg-primary'
        textColor='text-white'
        position='fixed'
        rightContent={
          <button onClick={handleLogout} className="text-white text-sm font-semibold hover:opacity-70 transition-opacity hover:cursor-pointer">
            Cerrar sesion <span aria-hidden="true">&rarr;</span>
          </button>
        }
      />

      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6 md:px-10">

        {/* Saludo */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">{`Hola, ${user?.name || 'Usuario'}`}</h1>
          <p className="text-gray-500 mt-1">Aqui tienes un resumen de tu actividad</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Servicios publicados */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                <h2 className="text-base font-semibold text-gray-900">Mis servicios publicados</h2>
              </div>
              <span className="text-xs font-medium text-primary bg-primary-light px-2.5 py-1 rounded-full">
                {services.length} {services.length === 1 ? 'servicio' : 'servicios'}
              </span>
            </div>

            <div className="p-4 space-y-3">
              {loadingServices ? (
                <div className="flex items-center justify-center py-10">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : services.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
                    <Briefcase size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No tienes servicios publicados</p>
                  <p className="text-xs text-gray-400 mt-1">Agregar tu primer servicio para empezar</p>
                </div>
              ) : (
                services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                        <Briefcase size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{service.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center font-medium gap-1 text-xs text-gray-500">
                            <Tag size={12} /> {service.subcategory}
                          </span>
                          <span className="text-gray-4  00 font-medium">-</span>
                          <span className="text-xs font-medium text-gray-500">
                            ${Number(service.price).toLocaleString('es-CO')}
                          </span>
                          <span className='text-xs font-medium text-gray-500'>
                            {service.schedule.days.map(dayKey => DAYS.find(d => d.key === dayKey)?.label).join(', ')} · {service.schedule.start} - {service.schedule.end}
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[service.type] || 'bg-gray-100 text-gray-500'}`}>
                            {service.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opcaity-100 transition-opacity">
                      Ver detalles <ChevronRight size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
            {services.length > 0 && (
              <div className="px-4 pb-4">
                <button className="w-full py-2.5 text-sm font-medium text-primary border border-primary/20 bg-primary-light hover:bg-primary hover:text-white rounded-xl transition-all">
                  Ver todos mis servicios
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Acciones rapidas</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-primary-light flex items-center justify-center transition-colors">
                    <EditIcon size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Gestionar mis servicios</span>
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-primary-light flex items-center justify-center transition-colors">
                    <Plus size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Ofrecer un servicio</span>
                </button>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Resumen</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Servicios publicados</span>
                  <span className="text-sm font-semibold text-gray-900">{services.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Solicitudes activas</span>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Servicios completados</span>
                  <span className="text-sm font-semibold text-gray-900">0</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AddServicesModal
        open={openModal}
        onClose={() => { setOpenModal(false); fetchServices(); }}
      />
    </>
  )
}

export default HomeWorkerView;