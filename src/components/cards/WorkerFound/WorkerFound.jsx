import { BadgeCheck, MapPin, Shield, Star } from "lucide-react";

const WorkerFound = ({ worker }) => {
    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4 mt-2.5">
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-900">Trabajador encontrado</h1>
                <p className="text-gray-500 mt-1">Hemos encontrado un profesional que se ajusta a tus necesidades.</p>
            </div>
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-2">
                {/* Imagen */}
                <div className="md:w-2/5 h-64 md:h-auto">
                    <img
                        src="https://www.cafedelescritor.com/wp-content/uploads/fotos-calidad-gratis.jpg"
                        alt="Foto del trabajador"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Información */}
                <div className="md:w-3/5 p-6">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {worker?.name}
                            </h2>

                            <div className="flex items-center gap-2 mt-2 bg-gray-200 px-2 py-0.5 rounded-md">
                                <Star size={16} className="text-yellow-500" />
                                <span className="font-medium">4.8</span>
                            </div>
                        </div>

                        <p className="text-primary font-medium">
                            {worker?.workerData?.category}
                        </p>

                        <div className="flex items-center gap-2 text-gray-500 mt-2">
                            <MapPin size={16} />
                            <span>{worker?.city}</span>
                        </div>

                        <p className="text-gray-600 mt-4 leading-relaxed">
                            Especialista en reparación de fugas, instalación de sanitarios
                            y mantenimiento residencial con más de 5 años de experiencia.
                        </p>
                    </div>

                    <div className="flex flex-col justify-between gap-4 mt-6">
                        <button className="px-5 py-3 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-dark transition-all cursor-pointer">
                            Solicitar servicio
                        </button>

                        <button className="px-5 py-3 text-primary font-medium hover:text-primary-dark transition-colors cursor-pointer">
                            Ver más opciones
                        </button>
                    </div>

                </div>
            </div>
            <div className="w-full">
                <p className="text-gray-500 text-sm mt-0.5">
                    * El trabajador mostrado es una sugerencia basada en tus preferencias y ubicación. Puedes solicitar el servicio o explorar más opciones.
                </p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 my-5 gap-4">
                <div className="flex items-start justify-center p-4 bg-white gap-4 rounded-md shadow-lg shadow-gray-300">
                    <div className="p-2 rounded-lg bg-green-200">
                        <BadgeCheck size={24} className='text-green-500' />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="font-semibold text-gray-900">Identidad verificada</h2>
                        <p className="text-gray-600 text-sm">{worker?.name} ha pasasdo todas nuestras pruebas de seguridad.</p>
                    </div>
                </div>
                <div className="flex items-start justify-center p-4 bg-white gap-4 rounded-md shadow-lg shadow-gray-300">
                    <div className="p-2 rounded-lg bg-blue-200">
                        <Shield size={24} className='text-blue-500' />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="font-semibold text-gray-900">Protección ServiTodo</h2>
                        <p className="text-gray-600 text-sm">Tu pago está protegido hasta que el trabajo termine.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default WorkerFound;