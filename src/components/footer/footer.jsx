import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Marca */}
                    <div>
                        <h1 className="text-lg font-bold text-primary">ServiTodo</h1>
                        <p className="text-sm text-gray-500 mt-2 max-w-xs">
                            Conectamos personas con profesionales confiables de forma rápida y segura.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 mb-3">
                            Información
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-gray-900 transition-colors">Privacidad</Link></li>
                            <li><Link to="/" className="hover:text-gray-900 transition-colors">Términos</Link></li>
                            <li><Link to="/" className="hover:text-gray-900 transition-colors">Soporte</Link></li>
                        </ul>
                    </div>

                    {/* Acción */}
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 mb-3">
                            ¿Eres profesional?
                        </h2>
                        <p className="text-sm text-gray-500 mb-3">
                            Únete a ServiTodo y empieza a recibir clientes.
                        </p>
                        <Link
                            to="/register-worker"
                            className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Ofrecer servicios
                        </Link>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-gray-300 pt-6 text-center text-xs text-gray-400">
                    © 2026 ServiTodo. Todos los derechos reservados.
                </div>

            </div>
        </footer>
    );
};

export default Footer;