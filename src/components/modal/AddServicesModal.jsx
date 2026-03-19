import { useEffect, useState } from "react";
import { registerServices } from "../../services/worker/registerServices.js";
import { getCategories } from "@/services/getCategories.js";
import { X, Loader2 } from "lucide-react";

const ServicesTypes = [
  { value: "domicilio", label: "Domicilio" },
  { value: "local", label: "Local" },
  { value: "ambos", label: "Ambos" },
];

const inputClass = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

export default function AddServicesModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    type: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.description || !form.type || !form.price) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    setLoading(true);

    const response = await registerServices(form);
    setLoading(false);

    if (response.success) {
      setForm({ name: "", category: "", description: "", type: "", price: "" });
      onClose();
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.success) setCategories(response.categories);
    };
    fetchCategories();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Crear nuevo servicio</h2>
            <p className="text-sm text-gray-500 mt-0.5">Conéctate con miles de clientes</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="px-6 py-5 space-y-4">

          {/* Nombre */}
          <div>
            <label className={labelClass}>Nombre del servicio</label>
            <input
              type="text"
              placeholder="Ej: Reparación de tuberías"
              className={inputClass}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className={labelClass}>Categoría</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              placeholder="Describe tu servicio con detalle..."
              className={`${inputClass} resize-none h-24`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Tipo y Precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tipo de servicio</label>
              <select
                className={inputClass}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="" disabled>Seleccionar</option>
                {ServicesTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Precio (COP)</label>
              <input
                type="number"
                placeholder="Ej: 50000"
                className={inputClass}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Guardando...</> : "Guardar servicio"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}