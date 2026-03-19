import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkers } from "../../../services/worker/getWorkers";
import { getCategories } from "../../../services/getCategories";
import { Search, Star, MapPin, TrendingUp } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../../components/header/header";

const WorkerCard = ({ name, service, rating, reviews, city, tag }) => (
  <div className="hover:shadow-md transition-shadow">
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg text-gray-600">
            <div className="bg-primary text-white font-bold">
              {name.charAt(0)}
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{service}</p>
          </div>
        </div>
        <span
          className={tag === "Popular"
            ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
            : "bg-primary-light text-primary hover:bg-primary-light"
          }
        >
          {tag}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={14} /> {city}
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {rating} <span className="text-gray-400">({reviews})</span>
        </span>
      </div>

      <button className="w-full bg-primary hover:bg-primary text-white">
        Ver perfil
      </button>
    </div>
  </div>
);

const HomeCustomerView = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(true);

  const [categories, setCategories] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
        const [ workersRes, categoriesRes ] = await Promise.all([
          getWorkers(),
          getCategories(),
        ]);
        if(workersRes.success) setWorkers(workersRes.workers);
        if(categoriesRes.success) setCategories(categoriesRes.categories);
        setLoadingWorkers(false);
    };
    fetchData();
  }, []);

  const filteredWorkers = workers.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.job.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory ? w.job === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Header
        links={[
          { name: "Inicio", to: "/home-customer" },
          { name: "Mis solicitudes", to: "/" },
          { name: "Historial", to: "/" },
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

      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-6 md:px-12">

        {/* Saludo */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {`Hola, ${user?.name || "Usuario"} 👋`}
          </h1>
          <p className="text-gray-500">¿Qué servicio necesitas hoy?</p>
        </div>

        {/* Buscador */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
          <input
            placeholder="Buscar servicio o prestador..."
            className="pl-12 py-6 rounded-xl shadow-sm border-gray-200 focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categorías</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all
                  ${selectedCategory === cat.name
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary"
                  }`}
              >
                <span className="text-xs font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Destacados */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Destacados</h2>
          </div>
          { loadingWorkers ? (
            <p className="text-gray-400">Cargando...</p>
           ) : filteredWorkers.length === 0 ? (
            <p className="text-gray-400">No se encontraron trabajadores.</p>
           ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredWorkers.slice(0, 3).map((w) => (
                    <WorkerCard key={w.id} {...w} service={w.job} tag={"Destacado"}/>
                ))}
            </div>
           )}
        </div>

        {/* Más solicitados */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-gray-800">Más solicitados</h2>
            </div>
            {loadingWorkers ? (
                <p className="text-gray-400">Cargando...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredWorkers.slice(3, 6).map((w) => (
                    <WorkerCard key={w.id} {...w} service={w.job} tag="Popular" />
                    ))}
                </div>
            )}
        </div>

      </div>
    </>
  );
};

export default HomeCustomerView;