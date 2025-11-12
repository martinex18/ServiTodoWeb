import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleView from "../screens/roles/RoleView";
import RegisterWorkerView from "../screens/Worker/RegisterWorker/RegisterWorkerView";
import HomeWorkerView from '../screens/Worker/home/HomeWorkerView'
import LoginView from "../screens/Login/LoginView";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes >
                <Route path = "/" element = {<RoleView />} />
                <Route path = "/login" element = {<LoginView />} />
                <Route path = "/register-worker" element = {<RegisterWorkerView />} />
                <Route path = "/home-worker" element = {<HomeWorkerView />} />
            </Routes>
        </BrowserRouter>
    );
}