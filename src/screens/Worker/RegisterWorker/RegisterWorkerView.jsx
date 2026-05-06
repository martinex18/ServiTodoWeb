import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Mail, Lock, ChevronLeft, User, Briefcase, IdCard, Phone, MapPin, Calendar, ChevronRight } from "lucide-react";
import { registerWorker } from "../../../services/auth/register/registerWorker";
import { getCategories } from "@/services/getCategories.js";
import { getTypeId } from "@/services/getTypeId.js";

const inputClass = "w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-4000 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const RegisterWorkerView = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [typeId, setTypeId] = useState([]);
    const [form, setForm] = useState({ name: '', type_id: '', id_number: '', birthdate: '', phone: '', city: '', job: '', exp: '', hasLocal: false, address: '', email: '', password: '', confirmPassword: '' })
    let navigate = useNavigate();

    const [step, setStep] = useState(1);

    const validateForm = () => {
        if (!form.name || !form.type_id || !form.id_number || !form.birthdate || !form.phone || !form.city || !form.job || !form.exp || !form.email || !form.password || !form.confirmPassword) {
            setError("Todos los campos son obligatorios.");
            return false;
        }

        if (!/[0-9]/.test(form.id_number)) {
            setError('El formato del numero de identificacion debe ser numerico.');
            return false;
        }

        if (form.id_number.length < 6) {
            setError('El numero de identificacion tiene que tener 6 o más digitos.');
            return false;
        }

        if (!/[0-9]/.test(form.phone)) {
            setError('El formato del numero de telefono debe ser numerico.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("El formato del correo no es válido.");
            return false;
        }

        if (form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }

        if (!/[A-Z]/.test(form.password)) {
            setError("La contraseña debe tener al menos una mayúscula.");
            return false;
        }

        if (!/[0-9]/.test(form.password)) {
            setError("La contraseña debe tener al menos un número.");
            return false;
        }

        if (!/[!@#$%^&*]/.test(form.password)) {
            setError("La contraseña debe tener al menos un carácter especial.")
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return false;
        }

        const today = new Date();
        const birth = new Date(form.birthdate);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const isUnderage = age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birth.getDate());

        if (isUnderage) {
            setError('Debes ser mayor de 18 años para registrarte.');
            return false;
        }

        return true;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typeIdRes, jobsRes] = await Promise.all([
                    getTypeId(),
                    getCategories(),
                ]);
                if (typeIdRes.success) setTypeId(typeIdRes.typeID);
                if (jobsRes.success) setJobs(jobsRes.categories);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos: ', error);
            }
        };
        fetchData();
    }, []);

    const handleNext = () => {
        setError('');
        if (!form.name || !form.type_id || !form.id_number || !form.birthdate || !form.phone || !form.city || !form.job || !form.exp) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        setStep(2);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;
        setLoading(true);

        const response = await registerWorker(form);
        setLoading(false);

        if (response.success) {
            setForm({ name: '', type_id: '', id_number: '', birthdate: '', phone: '', city: '', job: '', exp: '', hasLocal: false, address: '', email: '', password: '', confirmPassword: '' });
            navigate('/home-worker');
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Branding */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-primary px-12 relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
                <Link to='/' className="absolute top-6 left-6 z-10 text-white hover:opacity-70 transition-opacity">
                    <ChevronLeft size={50} />
                </Link>
                <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full bg-white/5" />
                <div className="absolute top-1/2 -right-10 w-40 h-40 rounded-full bg-white/5" />

                <div className="relative z-10 text-center">
                    <Link to='/'><img src="src/assets/logo/logo.png" alt="ServiTodo" className="w-90 mx-auto mb-8 brightness-0 invert" /></Link>
                    <h1 className="text-3xl font-bold text-white mb-4">
                        Conectamos servicios <br /> con personas.
                    </h1>
                    <p className="text-white/70 text-base max-w-sm mx-auto">Encuentra el profesional que necesitas o expande tu negocio con ServiTodo</p>

                    <div className="flex items-center justify-center gap-8 mt-10">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">500+</p>
                            <p className="text-white/60 text-xs mt-1">Trabajadores</p>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">1.2k</p>
                            <p className="text-white/60 text-xs mt-1">Clientes</p>
                        </div>
                        <div className="w-px h-10 bg-white/20" />
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">20+</p>
                            <p className="text-white/60 text-xs mt-1">Categorías</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Formualrio */}
            <div className="flex flex-col items-center justify-center px-6 py-12 bg-white lg:px-26" style={{ backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)" }}>
                <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link to='/'><img src="src/assets/logo/logo.png" alt="ServiTodo" className="h-20" /></Link>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold text-gray-900">Unete como prestador de servicios</h2>
                        <p className="text-gray-500 text-sm mt-1">Conectate con miles de clientes en tu ciudad</p>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === 1 ? 'bg-primary text-white' : 'bg-primary-light text-primary'}`}>1</div>
                        <div className="flex-1 h-px bg-gray-200" />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {step === 1 && (
                            <>
                                <div>
                                    <label className={labelClass}>Nombre completo / Negocio</label>
                                    <div className="relative">
                                        <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="text" placeholder="Nombre" name="Nombre" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    </div>
                                </div>

                                <div className="lg:flex items-center justify-between gap-3">
                                    <div>
                                        <label className={labelClass}>Tipo de identificación</label>
                                        <div className="relative">
                                            <IdCard size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select className={inputClass} value={form.type_id} onChange={(e) => setForm({ ...form, type_id: e.target.value })}
                                            >
                                                <option value="" disabled>Seleccione una identificación</option>
                                                {typeId.map((id) => (
                                                    <option key={id.id} value={id.id}>{id.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Numero de identificación</label>
                                        <div className="relative">
                                            <IdCard size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input placeholder="1234567" className={inputClass} value={form.id_number} onChange={(e) => setForm({ ...form, id_number: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Fecha de nacimiento</label>
                                    <div className="relative">
                                        <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="date" className={inputClass} value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Numero de telefono</label>
                                    <div className="relative">
                                        <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input placeholder="30000000" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Ciudad</label>
                                    <div className="relative">
                                        <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input placeholder="Barranquilla" className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                                    </div>
                                </div>

                                <div className="lg:flex items-center justify-between gap-3">
                                    <div>
                                        <label className={labelClass}>Tipo de servicio</label>
                                        <div className="relative">
                                            <Briefcase size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select className={inputClass} value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })}
                                            >
                                                <option value="" disabled>Selecciona una categoría</option>
                                                {jobs.map((j) => (
                                                    <option key={j.id} value={j.name}>{j.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Años de experiencia</label>
                                        <div className="relative">
                                            <Briefcase size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="text" placeholder="2 años" className={inputClass} value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="hasLocal" className="w-4 h-4 accent-primary" checked={form.hasLocal} onChange={(e) => setForm({ ...form, hasLocal: e.target.checked, address: '' })} />
                                    <label className='text-sm font-medium text-gray-700' htmlFor="hasLocal">¿Tienes un punto fisico?</label>
                                </div>

                                {form.hasLocal && (
                                    <div>
                                        <label className={labelClass}>Dirección</label>
                                        <div className="relative">
                                            <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="text" placeholder="Cra 45 # 5084" className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div>
                                    <label className={labelClass}>Correo electrónico</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="usuario@ejemplo.com"
                                            value={form.email}
                                            className={inputClass}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Contraseña</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-4000" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={form.password}
                                            className={inputClass}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Confirmar contraseña</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-4000" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={form.confirmPassword}
                                            className={inputClass}
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 1 ? (
                            <>
                                {error && (
                                    <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>
                                )}
                                <button type="button" className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2" onClick={handleNext}>
                                    Siguiente
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                {error && (
                                    <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>
                                )}
                                <div className="flex gap-3">
                                    <button type="button" className="w-25 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2" onClick={() => setStep(1)}>
                                        <ChevronLeft size={20} />
                                        Atras
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                                        {loading ? <> <Loader2 size={16} className="animate-spin" /> Registrando...</> : "Registrar"}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterWorkerView;