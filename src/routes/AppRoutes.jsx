import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PrivateRoute from "../components/PrivateRoute";
import RoleView from "../screens/Roles/RoleView";
import RegisterWorkerView from "../screens/Worker/RegisterWorker/RegisterWorkerView";
import HomeWorkerView from "../screens/Worker/home/HomeWorkerView";
import LoginView from "../screens/Login/LoginView";
import RegisterCustomerView from "../screens/Customer/RegisterCustomer/RegisterCustomerView";
import AuthRedirectRoute from "../components/AuthRedirectRoute";
import HomeCustomerView from "@/screens/Customer/Home/HomeCustomerView";
import ServiceDetailsView from "@/screens/Customer/ServiceDetails/ServiceDetailsView";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AuthRedirectRoute>
            <RoleView />
          </AuthRedirectRoute>
        } />

        <Route path="/login" element={
          <AuthRedirectRoute>
            <LoginView />
          </AuthRedirectRoute>
        } />

        <Route path="/register-worker" element={
          <AuthRedirectRoute>
            <RegisterWorkerView />
          </AuthRedirectRoute>
        } />

        <Route path="/register-customer" element={<RegisterCustomerView />} />

        <Route
          path="/home-worker"
          element={
            <PrivateRoute>
              <HomeWorkerView />
            </PrivateRoute>
          }
        />

        <Route
          path="/home-customer"
          element={
            <PrivateRoute>
              <HomeCustomerView />
            </PrivateRoute>
          }
        />

        <Route
          path="/service/:id"
          element={
            <PrivateRoute>
              <ServiceDetailsView />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
