import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
//import useNavigate from "react-router-dom";

const NotFound = () => {
    //const navigate = useNavigate();
    return (
        <>
            <Header
                backgroundColor='bg-white/70 backdrop-blur-md border-b border-gray-100'
                textColor='text-gray-600'
                rightContent={
                    <div className='flex items-center gap-3'>
                        <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" >
                            Iniciar sesión
                        </button>
                        <button className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow-md cursor-pointer">
                            Ofrece tus servicios
                        </button>
                    </div>
                }
            />
            <div className="flex flex-col items-center justify-center h-screen gap-6">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600">Página no encontrada</p>
            </div>
            <Footer />
        </>
    );
}

export default NotFound;