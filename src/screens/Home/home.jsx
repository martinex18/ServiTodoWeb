import Header from '@/components/header/header';
import React from 'react'

const Home = () => {
    return (
        <>
            <Header
                links={[
                    { name: 'Solicitudes', to: '/request' },
                    { name: 'Reservas', to: '/' },
                    { name: 'Mis servicios', to: '/' },
                ]}
                backgroundColor='bg-primary'
                textColor='text-white'
                position='fixed'
                rightContent={
                    <div className='flex items-center gap-4'>
                        <button className="text-white text-sm font-semibold hover:opacity-70 transition-opacity hover:cursor-pointer">
                            Iniciar sesión
                        </button>
                        <button className="text-white text-sm font-semibold hover:opacity-70 transition-opacity hover:cursor-pointer">
                            Ofrece tus servicios
                        </button>
                    </div>
                }
            />
            <div className='min-h-screen bg-gray-50 pt-24 pb-16 px-4 md:px-8 lg:px-12'>
                <div>
                    <h1>Encuentra el servicio que necesitas, rápido y confiable</h1>
                    <p>Servicios verificados y confiables. Accede a los mejores profesionales en minutos con garantía de satisfacción.</p>
                    <div className='flex items-center gap-6'>
                        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Solicitar servicio
                        </button>
                        <button className="text-black bg-secondary hover:bg-green-700 font-bold py-2 px-4 rounded">
                            Buscar por mi cuenta
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;