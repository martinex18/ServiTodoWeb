import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
//import useNavigate from "react-router-dom";

const NotFound = () => {
    //const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen gap-6">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-lg text-gray-600">Página no encontrada</p>
            </div>
        </>
    );
}

export default NotFound;