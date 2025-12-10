import { useState } from "react";
import { registerServices } from "../../services/worker/registerServices.js";

export default function AddServicesModal({open, onClose}){
    const [form, setForm] = useState({
        name: '',
        category: '',
        description: '',
        type_rate: '',
        range_prices: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!form.name || !form.category || !form.description || !form.type_rate || !form.range_prices) {
            setError("Todos los campos son obligatorios");
            return;
        }
        setError('');
        setLoading(true);

        const response = await registerServices(form);
        setLoading(false);

        if(response.success){
            alert('Registro exitoso');
            setForm({
                name: '',
                category: '',
                description: '',
                type_rate: '',
                range_prices: '',
            });
        } else{
            setError(response.message);
        }
    }

    if (!open) return null;

    return(
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Crear nuevo servicio</h2>
                    <p className="font-sans text-center mb-6 text-gray-600">Conectate con miles de clientes en tu ciudad</p>
                
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="">
                                <label className="block text-gray-700 text-sm font-medium mb-1">Nombre del servicio</label>
                                <input type="text" placeholder="Reparacion de tuberia" name="Nombre" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                            </div>

                            <div className="">
                                <label className="text-gray-700 text-sm font-medium mb-1">Categoria</label>
                                <input type="text" placeholder="Escriba una categoria" name="Categoria" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}/>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Descripcion</label>
                            <textarea name="Descripcion" placeholder="Descripcion" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}></textarea>
                        </div>

                        <div className="flex items-center justify-between mb-10">
                            <div className="">
                                <label className="text-gray-700 text-sm font-medium mb-1">Tipo de tarifa</label>
                                <input type="text" placeholder="Seleccione el tipo de servicio" name="tipo de tarifa" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.type_rate} onChange={(e) => setForm({...form, type_rate: e.target.value})}/>
                            </div>

                            <div className="">
                                <label className="block text-gray-700 text-sm font-medium mb-1">Rango de precios (COP)</label>
                                <input type="number" placeholder="$50.000 100.000" name="rango de precios" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans" value={form.range_prices} onChange={(e) => setForm({...form, range_prices: e.target.value})}/>
                            </div>
                        </div>

                        <div className="flex justify-start gap-6">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancelar</button>

                            <button type="submit"className="px-4 py-2 bg-[#5f8d92] text-white rounded-lg hover:bg-[#4a6f73]" disabled={loading}>
                                {loading ? 
                                        (<div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                        </div>) : "Guardar"}
                            </button>
                        </div>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                </div>
            </div>
    );
}