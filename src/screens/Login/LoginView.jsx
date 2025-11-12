import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginWorker } from "../../services/worker/loginWorker";
import Header from "../../components/header/header";

const LoginView = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await loginWorker(form.email, form.password);
    setLoading(false);
    if (response.success) {

      // Guarda la información del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(response.user));

      setForm({
        email: "",
        password: "",
      });

      navigate('/home-worker');
    } else {
      setError(response.message);
    }
  };

  return (
    <>
      <Header
        links={[
          { name: "Features", to: "/" },
          { name: "Marketplace", to: "/" },
          { name: "Company", to: "/" },
        ]}
        backgroundColor="bg-[#5f8d92]"
        textColor="text-white"
        position="fixed"
      />

      <div
        className="flex flex-col items-center justify-center min-h-screen bg-contain bg-center bg-white pt-28 pb-16 px-4"
        style={{
          backgroundImage: "url(src/assets/imgbackground/backgroundExt.png)",
        }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Bienvenido de nuevo
          </h2>
          <p className="font-sans text-center mb-6 text-gray-600">
            Inicia sesión para continuar
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Correo electrónico
              </label>
              <input
                type="text"
                placeholder="usuario@correo.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="**********"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f8d92] placeholder:text-gray-400 font-sans"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-[#5f8d92] hover:text-[#4a6f73] font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="mb-4">
                <button
                  type="submit" disabled={loading}
                  className="mt-2 w-full bg-[#5f8d92] text-white font-semibold p-3 rounded-lg hover:bg-[#4a6f73] transition-colors"
                >
                  {loading ? 
                    (<div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                    </div>) : "Iniciar sesión"}
                </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          {/* Sección de registro */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              ¿No tienes una cuenta? Regístrate como:
            </p>

            <div className="flex items-center justify-center gap-6">
              <Link to="/register-client">
                <button className="flex flex-col items-center justify-center bg-white border-2 border-[#5f8d92] text-[#5f8d92] font-semibold px-6 py-4 rounded-2xl shadow-md hover:bg-[#5f8d92] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A3 3 0 017 17h10a3 3 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Cliente</span>
                </button>
              </Link>

              <Link to="/register-worker">
                <button className="flex flex-col items-center justify-center bg-white border-2 border-[#5f8d92] text-[#5f8d92] font-semibold px-6 py-4 rounded-2xl shadow-md hover:bg-[#5f8d92] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Trabajador</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;