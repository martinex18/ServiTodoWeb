import { Link } from "react-router-dom";

import Header from "../../components/header/header";
import SwitchRole from "../../components/switch/switch";

const RoleView = () => {
    return (
      <>
      <Header
        links = {[
          {name: 'Features', to: '/'},
          {name: 'Marketplace', to: '/'},
          {name: 'Company', to: '/'},
        ]}
        backgroundColor = 'bg-[#5f8d92]'
        textColor = 'text-white'
        position = 'absolute'
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

          {/* Switch */}
          <div className="flex flex-col items-center">
            <div className="h-5" />
            <SwitchRole />
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* Iniciar sesión */}
            <button className="flex items-center gap-2 px-3 py-2 text-blue-600 text-sm font-medium hover:text-blue-800 transition">
              <i className="fas fa-sign-in-alt text-black"></i>
              <span className="cursor-pointer">Iniciar sesión</span>
            </button>

            {/* Registrarse */}
            <button className="flex items-center gap-2 px-3 py-2 text-blue-600 text-sm font-medium hover:text-blue-800 transition">
              <span className="cursor-pointer"><Link to='registerWorker'>Registrarse</Link></span>
            </button>
          </div>
        </div>
      </>
    )
}

export default RoleView;
