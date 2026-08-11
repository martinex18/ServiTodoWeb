import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { BadgeCheck, Banknote, Gauge } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='min-h-screen bg-gray-50 pb-16 px-4 md:px-8 lg:px-12'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex flex-col items-start gap-4 max-w-2xl'>
                        <p className='text-sm font-semibold mt-4 text-primary uppercase tracking-widest'>
                            SERVICIOS DE CONSERJERÍA PREMIUM
                        </p>

                        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 leading-tight'>
                            Encuentra el servicio que necesitas, rápido y confiable
                        </h1>

                        <p className="text-gray-600 max-w-lg">
                            Servicios verificados y confiables. Accede a los mejores profesionales en minutos con garantía de satisfacción.
                        </p>

                        <div className='flex items-center gap-6 mt-2 flex-wrap'>
                            <button className="px-6 py-3 bg-primary text-white hover:bg-primary-dark text-sm font-semibold rounded-lg transition-colors cursor-pointer" onClick={() => navigate('/request-service')}>
                                Solicitar servicio
                            </button>

                            <button className="px-6 py-3 bg-white text-primary border border-primary hover:bg-primary hover:text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer">
                                Buscar por mi cuenta
                            </button>
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-2 sm:grid-cols-3 my-10 gap-4 items-stretch'>
                        <img src="https://crespomantenimientos.com/wp-content/uploads/2024/01/Como-limpiar-oficinas-con-gente-trabajando-scaled.jpg" alt="" />
                        <div className='grid grid-cols-2 gap-4'>
                            <img src="https://st4.depositphotos.com/13193658/29654/i/450/depositphotos_296544920-stock-photo-happy-multicultural-programmers-giving-high.jpg" alt="" />
                            <img src="https://static.vecteezy.com/system/resources/previews/001/266/740/non_2x/two-people-working-on-laptops-in-an-office-free-photo.jpg" alt="" />
                            <img src="https://plus.unsplash.com/premium_photo-1681989488343-802c4946eeae?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8" alt="" />
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 my-10 gap-4">
                        <div className="flex flex-col items-start justify-center p-6 bg-white gap-4 rounded-md shadow-lg shadow-gray-300">
                            <span className='p-2 rounded-lg bg-blue-200'>
                                <BadgeCheck size={40} className='text-blue-500' />
                            </span>
                            <p className="font-black text-gray-900 text-2xl">Seguro al 100%</p>
                            <p className="text-gray-500 text-sm">Cada profesional en nuestra red
                                pasa por una verificación
                                exhaustiva de antecedentes y
                                habilidades.</p>
                        </div>
                        <div className="flex flex-col items-start justify-center p-6 bg-white gap-4 rounded-md shadow-lg shadow-gray-300">
                            <span className='p-2 rounded-lg bg-blue-200'>
                                <Gauge size={40} className='text-green-500' />
                            </span>
                            <p className="font-black text-gray-900 text-3xl">Respuesta rapida</p>
                            <p className="text-gray-500 text-sm">Encuentra y reserva un profesional
                                en menos de 5 minutos. Sin
                                esperas, sin complicaciones.</p>
                        </div>
                        <div className="flex flex-col items-start justify-center p-6 bg-white gap-4 rounded-md shadow-lg shadow-gray-300">
                            <span className='p-2 rounded-lg bg-red-200'>
                                <Banknote size={40} className='text-red-500' />
                            </span>
                            <p className="font-black text-gray-900 text-3xl">Precios justos</p>
                            <p className="text-gray-500 text-sm">Tarifas transparentes desde el
                                inicio. Sin cargos ocultos y pagos
                                seguros a través de la plataforma.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;