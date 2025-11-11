import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/header/header";
import { registerWorker } from "../../../services/worker/registerWorker";

const RegisterWorkerView = () => {

    const [form, setForm] = useState({
        name: '',
        id_number: '',
        phone: '',
        city: '',
        job: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // setLoading(true);
    const response = await registerWorker(form);
    // setLoading(false);

    if (response.success) {
      alert("✅ Registro exitoso");
      setForm({
        name: "",
        id_number: "",
        phone: "",
        city: "",
        job: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setError(response.message);
    }
  };

    return(
        <>
            <Header
                links = {[
                {name: 'Features', to: '/'},
                {name: 'Marketplace', to: '/'},
                {name: 'Company', to: '/'},
                ]}
                backgroundColor = 'bg-[#5f8d92]'
                textColor = 'text-white'
                position = 'fixed'
            />

            <div className="flex flex-col items-center justify-center min-h-screen bg-contain bg-center bg-white gap-6 pt-28 pb-16 px-4" style={{ backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)"}}>
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Unete como prestador de servicios</h2>
                    <p className="font-sans text-center mb-6 text-gray-600">Conectate con miles de clientes en tu ciudad</p>
                
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Nombre completo o del negocio</label>
                            <input type="text" placeholder="Juan Carlos o Barberia" name="Nombre" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                        </div>

                        <div className="mb-6">
                            <label className="">Numero de identificacion</label>
                            <input type="number" placeholder="1234567" name="identificacion" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.id_number} onChange={(e) => setForm({...form, id_number: e.target.value})}/>
                        </div>
                        

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Numero de telefono</label>
                                <input type="number" placeholder="+57 300 000 0000" name="telefono" className="w-[280px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}/>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Ciudad</label>
                                <input type="text" placeholder="Ingresa la ciudad" name="ciudad" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})}/>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Tipo de servicio</label>
                            <input type="text" placeholder="Seleccione el tipo de servicio" name="servicio" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.job} onChange={(e) => setForm({...form, job: e.target.value})}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Correo electronico</label>
                            <input type="email" placeholder="juancarlos@servitodo.com" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                            <input type="password" placeholder="**********" name="contrasena" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Confirmar contraseña</label>
                            <input type="password" placeholder="**********" name="Confirmar_contrasena" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} />
                        </div>

                        <div className="mb-4">
                            <Link to='/homeWorker'>
                                <button type="submit" className="mt-6 w-full bg-[#5f8d92] text-white font-semibold p-3 rounded-lg hover:bg-[#4a6f73] transition-colors">Registrarse</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterWorkerView;