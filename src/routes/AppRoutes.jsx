import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PrivateRoute from "../components/PrivateRoute";
import RoleView from "../screens/Roles/RoleView";
import RegisterWorkerView from "../screens/Worker/RegisterWorker/RegisterWorkerView";
import LoginView from "../screens/Login/LoginView";
import RegisterCustomerView from "../screens/Customer/RegisterCustomer/RegisterCustomerView";
import AuthRedirectRoute from "../components/AuthRedirectRoute";
import HomeCustomerView from "@/screens/Customer/Home/HomeCustomerView";
import ServiceDetailsView from "@/screens/Customer/ServiceDetails/ServiceDetailsView";
import RequestView from "@/screens/Worker/Request/RequestView";
import Home from "@/screens/Home/home";
import HomeWorkerView from "@/screens/Worker/Home/HomeWorkerView";
import RequestService from "@/screens/Customer/RequestService/RequestService";
import ScrollTop from "@/components/scrollTop";
import SearchingWorkerView from "@/screens/Customer/SearchingWorker/SearchingWorkerView";
import NotFound from "@/screens/NotFound/NotFound";
import ResetPassword from "@/screens/ResetPassword/ResetPassword";
import PublicLayout from "@/layouts/PublicLayout";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route element={
          <AuthRedirectRoute>
            <PublicLayout />
          </AuthRedirectRoute>
        }>
          {/* AuthRedirectRoutes */}
          <Route path="/" element={
            <Home />
          } />

          {/*<Route path="/register-customer" element={
              <RegisterCustomerView />
          } /> */}

          {/* <Route path="/role" element={
              <RoleView />
            } />
          */}

          <Route path="/request-service" element={
            <RequestService />
          } />

          <Route path="/searching-worker" element={
            <SearchingWorkerView />
          } />

          <Route path="/forgot-password" element={
            <ResetPassword />
          } />
        </Route>

        <Route path="/login" element={
          <LoginView />
        } />

        <Route path="/register-worker" element={
          <RegisterWorkerView />
        } />

        {/* Private Routes */}
        {/* <Route
          path="/home-customer"
          element={
            <PrivateRoute>
              <HomeCustomerView />
            </PrivateRoute>
          }
        /> */}

        <Route
          path="/home-worker"
          element={
            <PrivateRoute>
              <HomeWorkerView />
            </PrivateRoute>
          }
        />

        <Route
          path="/request"
          element={
            <PrivateRoute>
              <RequestView />
            </PrivateRoute>
          }
        />

        <Route
          path="/service/:name/:id"
          element={
            <PrivateRoute>
              <ServiceDetailsView />
            </PrivateRoute>
          }
        />

        <Route path="*" element={
          <NotFound />
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
