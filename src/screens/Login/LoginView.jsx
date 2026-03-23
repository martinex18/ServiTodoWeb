import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Mail, Lock } from "lucide-react";
import { login } from "../../services/login";

const inputClass = "w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const LoginView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if( !emailRegex.test(form.email)) {
      setError("El formato del correo no es válido.");
      return false;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (!/[A-Z]/.test(form.password)){
      setError("La contraseña debe tener al menos una mayúscula.");
      return false;
    }

    if(!/[0-9]/.test(form.password)){
      setError("La contraseña debe tener al menos un número.");
    }

    if(!/[!@#$%^&*]/.test(form.password)){
      setError("La contraseña debe tener al menos un carácter especial.")
      return false;
    }

    return true;
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;
    setLoading(true);

    const response = await login(form.email, form.password);
    setLoading(false);

    if (response.success) {
      setForm({ email: "", password: "", });
      if (response.role === "worker") {
        navigate('/home-worker');
      } else {
        navigate('/home-customer');
      }

    } else {
      setError(response.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary px-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 -right-10 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative z-10 text-center">
          <Link to='/'><img src="src/assets/logo/logo.png" alt="ServiTodo" className="w-90 mx-auto mb-8 brightness-0 invert" /></Link>
          <h1 className="text-3xl font-bold text-white mb-4">
            Conectamos servicios <br /> con personas.
          </h1>
          <p className="text-white/70 text-base max-w-sm mx-auto">Encuentra el profesional que necesitas o expande tu negocio con ServiTodo</p>

          <div className="flex- items-center justify-center gap-8 mt-10">
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

      <div className="flex flex-col items-center justify-center px-6 py-12 bg-white lg:px-26" style={{ backgroundImage: 'url(src/assets/imgbackground/backgroundExt.png)' }}>
        <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="flex justify-center mb-8 lg:hidden">
            <Link to='/'><img src="src/assets/logo/logo.png" alt="ServiTodo" className="h-20" /></Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Bienvenido de nuevo</h2>
            <p className="text-gray-500 text-sm mt-1">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelClass}>Correo electrónico</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-40" />
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
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass}>Contraseña</label>
                <Link to='/forgot-password' className="text-xs text-primary hover:text-primary-dark transition-colors">¿Olvidaste tu contraseña?</Link>
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  className={inputClass}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading ? <> <Loader2 size={16} className="animate-spin" /> Iniciando sesión...</> : "Iniciar sesión"}
            </button>
          </form>

          {/* Registro */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center mb-4">¿No tienes una cuenta? Regístrate como:</p>

            {/* Móvil */}
            <div className="flex justify-center lg:hidden">
              <p className="text-sm text-gray-500">
                <Link to="/register-customer" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Cliente
                </Link>
                {" "}o{" "}
                <Link to="/register-worker" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Trabajador
                </Link>
              </p>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-center gap-4">
              <Link to="/register-customer">
                <button className="flex flex-col items-center justify-center bg-white border-2 border-primary text-primary font-semibold px-6 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A3 3 0 017 17h10a3 3 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Cliente</span>
                </button>
              </Link>
              <Link to="/register-worker">
                <button className="flex flex-col items-center justify-center bg-white border-2 border-primary text-primary font-semibold px-6 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Trabajador</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;