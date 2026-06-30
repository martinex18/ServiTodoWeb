import Lottie from "lottie-react";
import WokerNotFoundAnimation from "@/assets/animation/Notfound.json";
import { Headset } from "lucide-react";

const WorkerNotFound = () => {
    return (
        <>
            <div className="bg-gray-50 px-4 py-8 md:py-10">
                <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 text-center">
                    <div className="w-52 md:w-60">
                        <Lottie animationData={WokerNotFoundAnimation} loop />
                    </div>

                    <div className="space-y-4 max-w-">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">No pudimos encontrar un trabajdor en este momento</h1>
                        <p className="text-gray-500 text-sm leading-relaxed">No te preocupes, estarán disponibles pronto. Podemos ayudarte a realizar tu servicio.</p>
                    </div>

                    <div className="flex flex-col items-center p-6 bg-white gap-4 rounded-md shadow-lg shadow-gray-300">
                        <span className='p-2 rounded-lg bg-red-200'>
                            <Headset size={30} className='text-red-500' />
                        </span>
                        <p className="font-bold text-gray-900 text-2xl">Hablar con soporte</p>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">¿No encontraste un profesional disponible?
                            Nuestro equipo de soporte está listo para ayudarte y encontrar la mejor
                            solución para ti.</p>
                        <button className="px-6 py-3 bg-primary text-white hover:bg-primary-dark text-sm font-semibold rounded-lg transition-colors cursor-pointer">
                            Contactar soporte
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorkerNotFound;