import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const PublicLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenRoutes = [
    "/searching-worker",
  ];

  const shouldHideLayout = hiddenRoutes.includes(location.pathname);

  if (shouldHideLayout) {
    return <Outlet />;
  }

  return (
    <>
      <Header
        rightContent={
          <div className="flex items-center gap-3">
            <button
              className="text-sm font-medium text-gray-600 hover:text-primary"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </button>

            <button
              className="px-5 py-2.5 bg-primary text-white rounded-xl"
              onClick={() => navigate("/register-worker")}
            >
              Ofrece tus servicios
            </button>
          </div>
        }
      />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;