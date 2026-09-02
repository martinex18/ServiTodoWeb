import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, MapPin, TrendingUp } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../../components/header/header";
import ServiceCard from "@/components/cards/ServiceCard";
import { getServices } from "@/services/getServices";
import { getWorkersById } from "@/services/worker/getWorkersById";
import ServiceCardSkeleton from "@/components/cards/skeleton/ServiceCardSkeleton";

const HomeCustomerView = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingServices, setLoadingServices] = useState(true);

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await getServices();

        if (servicesRes.success) {
          const serviceWithWorker = await Promise.all(
            servicesRes.services.map(async (s) => {
              try {
                const workerRes = await getWorkersById(s.user_id);

                return {
                  ...s,
                  workerName: workerRes.worker?.name || 'Trabajador',
                  workerCity: workerRes.worker?.city || "Ubicación",
                  workerJob: workerRes.worker?.job || '',
                  workerPhone: workerRes.worker?.phone || '',
                };
              } catch {
                return { ...s }
              }
            })
          );

          setServices(serviceWithWorker);
        }
      } catch (error) {
        console.error("Error cargando servicios:", error);
      } finally {
        setLoadingServices(false);
      }
    };
    fetchData();
  }, []);

  const filteredServices = services.filter((s) => {
    const matchSearch =
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.workerName || '').toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory
      ? s.category === selectedCategory
      : true;
    return matchSearch && matchCategory;
  });

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

      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8 lg:px-12">
        {/* Saludo */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hola, {user?.name || "Usuario"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">¿Qué servicio necesitas hoy?</p>
        </div>

        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Buscar servicio o prestador..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Categorías</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-xs font-medium border-2 whitespace-nowrap transition-all ${selectedCategory === null
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-primary"
                }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border-2 whitespace-nowrap transition-all ${selectedCategory === cat.name
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Destacados */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-primary fill-primary" />
              <h2 className="text-base font-semibold text-gray-900">Destacados</h2>
            </div>
            <button className="text-xs text-primary font-medium hover:text-primary-dark transition-colors">
              Ver todos
            </button>
          </div>

          {/*loadingServices ? (
            <motion.div initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : filteredServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm font-medium text-gray-500">No se encontraron servicios</p>
              <p className="text-xs text-gray-400 mt-1">Intenta con otra categoría o búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center sm:justify-items-start">
              {filteredServices.map((s) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                />
              ))}
            </div>
          )*/}
        </div>

      </div>
    </>
  );
};

export default HomeCustomerView;