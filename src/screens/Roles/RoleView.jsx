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
        backgroundColor = 'bg-[#5f8d92]'
        textColor = 'text-white'
        position = 'fixed'
      />
        <div className="flex flex-col items-center justify-center min-h-screen bg-contain bg-center bg-white gap-6"
        style={{
          backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)"
        }}>
          <div className="flex justify-center">
            <img
              src="src\assets\logo\logo.png"
              alt="Logo"
              className="w-auto h-auto object-contain" />
          </div>

          <div className="flex items-center justify-center gap-6">

            {/* Registrarse */}
            <Link to='/'>
              <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-[#5f8d92] text-[#5f8d92] font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-[#5f8d92] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A3 3 0 017 17h10a3 3 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-bold">Registrarme como Cliente</span>
              </button>
            </Link>

            <Link to='register-worker'>

            <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-[#5f8d92] text-[#5f8d92] font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-[#5f8d92] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold">Registrarme como Trabajador</span>
            </button>

            </Link>
          </div>

          {/* Iniciar sesión */}
          <Link to='/login'>
            <button className="flex flex-col items-center justify-center cursor-pointer bg-white border-2 border-[#5f8d92] text-[#5f8d92] font-semibold px-8 py-6 rounded-2xl shadow-md hover:bg-[#5f8d92] hover:text-white transition-all duration-300">
                <span className="font-bold">Iniciar sesión</span>
            </button>
          </Link>
        </div>
      </>
    )
}

export default RoleView;
