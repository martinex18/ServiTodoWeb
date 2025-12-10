import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import RoleView from "../screens/Roles/RoleView";
import RegisterWorkerView from "../screens/Worker/RegisterWorker/RegisterWorkerView";
import HomeWorkerView from "../screens/Worker/home/HomeWorkerView";
import LoginView from "../screens/Login/LoginView";
import RegisterCustomerView from "../screens/Customer/RegisterCustomer/RegisterCustomerView";
import AuthRedirectRoute from "../components/AuthRedirectRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}
