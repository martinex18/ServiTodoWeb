import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleView from "../screens/Roles/RoleView";
import RegisterWorkerView from "../screens/Worker/RegisterWorker/RegisterWorkerView";
import HomeWorkerView from '../screens/Worker/home/HomeWorkerView'
import LoginView from "../screens/Login/LoginView";
import RegisterCustomerView from "../screens/Customer/RegisterCustomer/RegisterCustomerView";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes >
                <Route path = "/" element = {<RoleView />} />
                <Route path = "/login" element = {<LoginView />} />
                <Route path = "/register-worker" element = {<RegisterWorkerView />} />
                <Route path = "/home-worker" element = {<HomeWorkerView />} />

                <Route path = "/register-customer" element = {<RegisterCustomerView />} />
            </Routes>
        </BrowserRouter>
    );
}