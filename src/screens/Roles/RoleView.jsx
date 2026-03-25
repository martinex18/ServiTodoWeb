import { Link } from "react-router-dom";
import { User, Briefcase } from "lucide-react";

const RoleView = () => {
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

      <div className="flex flex-col items-center justify-center px-6 py-12 bg-white lg:px-26" style={{
        backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)"
      }}>
        <div className="w-full max-w-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img src="src/assets/logo/logo.png" alt="ServiTodo" className="w-auto h-auto object-contain" />
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">¿Cómo quieres comenzar?</h2>
            <p className="text-gray-500 text-sm mt-1">Elige tu rol para continuar</p>
          </div>

          {/* Registrarse */}
          <div className="flex items-center justify-center gap-6">
            <Link to='/register-customer'>
              <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-primary text-primary font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <User size={30} />
                <span className="text-sm mt-0.5">Registrarme como Cliente</span>
                <span className="text-xs font-normal mt-1 opacity-70">Solicita servicios</span>
              </button>
            </Link>

            <Link to='/register-worker'>
              <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-primary text-primary font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <Briefcase size={30} />
                <span className="text-sm mt-0.5">Registrarme como Trabajador</span>
                <span className="text-xs font-normal mt-1 opacity-70">Ofrece tus servicios</span>
              </button>
            </Link>
          </div>

          {/* Iniciar sesión */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link to='/login' className="text-primary hover:text-primary-dark font-medium transition-colors"> Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleView;
