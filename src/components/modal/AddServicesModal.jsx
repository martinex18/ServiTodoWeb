import { useState } from "react";
import { registerServices } from "../../services/worker/registerServices.js";
import { X, Loader2, ImageIcon, FolderOpen, Camera } from "lucide-react";
import { DAYS } from "@/services/days";
import { SUBCATEGORIES } from "@/services/subCategories.js";
import { useAuth } from "@/context/AuthContext";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "@/services/cloudinary/uploadImage.js";

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
    subcategory: "",
    description: "",
    schedule: { days: [], start: '', end: '' },
    type: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imagen, setImagen] = useState('');
  const [imagenPreview, setImagenPreview] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!imagen || !form.name || !form.subcategory || !form.description || !form.schedule || !form.type || !form.price) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.schedule.days.length === 0) {
      setError('Selecciona al menos un día disponible.');
      return;
    }

    if (!form.schedule.start || !form.schedule.end) {
      setError('Debes establecer el horario de inicio y fin.');
      return;
    }

    if (form.schedule.start >= form.schedule.end) {
      setError('La hora de fin debe ser mayor a la hora de inicio.')
      return;
    }

    if (!imagen) {
      setError('La imagen del servicio es obligatoria')
    }


    setError("");
    setLoading(true);

    let imageUrl = '';
    if (imagen) {
      const imageRes = await uploadImage(imagen);
      if (imageRes.success) {
        imageUrl = imageRes.url;
      } else {
        setError('Error subiendo la imagen.');
        setLoading(false);
        return;
      }
    }
    console.log('imageUrl:', imageUrl);
    const response = await registerServices({ ...form, imageUrl });
    setLoading(false);

    if (response.success) {
      setForm({ name: "", subcategory: "", description: "", schedule: { days: [], start: '', end: '' }, type: "", price: "" });
      onClose();
      resetForm();
    } else {
      setError(response.message);
    }
  };

  const resetForm = () => {
    onClose();
    setForm({ name: "", subcategory: "", description: "", schedule: { days: [], start: '', end: '' }, type: "", price: "" });
    setImagen('');
    setImagenPreview('');
    setError('');
    setLoading(false);
  }

  const toggleDay = (dayKey) => {
    const days = form.schedule.days.includes(dayKey)
      ? form.schedule.days.filter((d) => d !== dayKey)
      : [...form.schedule.days, dayKey];

    setForm({ ...form, schedule: { ...form.schedule, days } });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">

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
        <form onSubmit={handleRegister} className="px-6 py-5 space-y-4 overflow-y-auto">
          {/* Imagen */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">
            {imagenPreview ? (
              <div className="relative">
                <img src={imagenPreview} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
                <button type="button" onClick={() => { setImagen(null); setImagenPreview(null); }} className="absolute top-2 right-2 p-1 bg-white rounded-full shadow text-gray-500 hover:text-error transition-colors">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                {/* Dropzone */}
                <div {...getRootProps()} className="w-full flex flex-col items-center gap-2 cursor-pointer py-4">
                  <input {...getInputProps()} />
                  <ImageIcon size={28} className="text-gray-300" />
                  <p className="text-sm text-gray-400 text-center">
                    {isDragActive ? 'Suelta aqui...' : 'Arrasta una imagen aqui'}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400">o</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Botones */}
                <div className="flex gap-2 w-full">
                  <label className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) { setImagen(file); setImagenPreview(URL.createObjectURL(file)); }
                    }} />
                    <FolderOpen size={14} />
                    Seleccionar foto
                  </label>

                  {/* Desde el celular */}
                  <label className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors sm:hidden">
                    <input type="file" accept="image/*" capture='environment' className="hidden" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) { setImagen(file); setImagenPreview(URL.createObjectURL(file)); }
                    }} />
                    <Camera size={14} />
                    Tomar foto
                  </label>
                </div>
              </div>
            )}
          </div>

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

          {/* Subcategoría */}
          {SUBCATEGORIES[user.job] && (
            <div>
              <label className={labelClass}>Subcategoria</label>
              <select
                className={inputClass}
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
              >
                <option value="" disabled>Selecciona una subcategoria</option>
                {SUBCATEGORIES[user.job].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

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

          {/* Disponibilidad */}
          <div>
            <label className={labelClass}>Días y horarios</label>
            <div className="flex gap-2 flex-wrap mt-2">
              {DAYS.map((day) => (
                <button key={day.key} type="button" onClick={() => toggleDay(day.key)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${form.schedule.days.includes(day.key)
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-500 hover:border-primary"
                  }`}>
                  {day.label}
                </button>
              ))}
            </div>

            {/* Horarios */}
            {form.schedule.days.length > 0 && (
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1">
                  <label className={labelClass}>Hora inicio</label>
                  <input type="time" className={inputClass} value={form.schedule.start} onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, start: e.target.value } })} />
                </div>
                <span className="text-gray-400 mt-6">-</span>
                <div className="flex-1">
                  <label className={labelClass}>Hora fin</label>
                  <input type="time" className={inputClass} value={form.schedule.end} onChange={(e) => setForm({ ...form, schedule: { ...form.schedule, end: e.target.value } })} />
                </div>
              </div>
            )}
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
              onClick={() => { resetForm(); }}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Publicando...</> : "Publicar servicio"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}