import Header from "../../../components/header/header";

const RegisterWorkerView = () => {
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
                position = 'static'
            />

            <div className="flex flex-col items-center justify-center min-h-screen bg-contain bg-center bg-white gap-6" style={{ backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)"}}>
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Unete como prestador de servicios</h2>
                    <p className="font-sans text-center mb-6 text-gray-600">Conectate con miles de clientes en tu ciudad</p>
                
                    <form action="" method="post">
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Nombre completo o del negocio</label>
                            <input type="text" placeholder="Vegeta 777 o Barberia 2.0" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Correo electronico</label>
                            <input type="email" placeholder="vegeta777@servitodo.com" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" />
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Numero de telefono</label>
                                <input type="number" placeholder="+57 300 000 0000" name="telefono" className="w-[280px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans"/>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Ciudad</label>
                                <input type="text" placeholder="Ingresa la ciudad" name="ciudad" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Tipo de servicio</label>
                            <input type="text" placeholder="Seleccione el tipo de servicio" name="servicio" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Contraseña</label>
                            <input type="password" placeholder="**********" name="contrasena" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Confirmar contraseña</label>
                            <input type="password" placeholder="**********" name="Confirmar_contrasena" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterWorkerView;