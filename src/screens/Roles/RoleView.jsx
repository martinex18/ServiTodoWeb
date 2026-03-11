import { Link } from "react-router-dom";

import Header from "../../components/header/header";

const RoleView = () => {
    return (
      <>
      <Header
        links = {[
          {name: 'Sobre nosotros', to: '/'},
          {name: 'Contacto', to: '/'},
          {name: 'Company', to: '/'},
        ]}
        backgroundColor = 'bg-primary'
        textColor = 'text-primary-foreground'
        position = 'fixed'
      />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background bg-contain bg-center gap-8"
        style={{
          backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)"
        }}>
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="src\assets\logo\logo.png"
              alt="Logo"
              className="w-auto h-auto object-contain" />
          </div>

          {/* Registrarse */}
          <div className="flex items-center justify-center gap-6">
            <Link to='/register-customer'>
              <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-primary text-primary font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A3 3 0 017 17h10a3 3 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-bold">Registrarme como Cliente</span>
              </button>
            </Link>

            <Link to='register-worker'>
              <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-primary text-primary font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">Registrarme como Trabajador</span>
              </button>
            </Link>
          </div>

          {/* Iniciar sesión */}
          <Link to='/login'>
            <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-primary text-primary font-semibold px-10 py-6 rounded-2xl shadow-md hover:bg-primary hover:text-white transition-all duration-300">
                <span className="font-bold">Iniciar sesión</span>
            </button>
          </Link>
        </div>
      </>
    )
}

export default RoleView;
