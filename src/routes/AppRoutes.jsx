import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleView from "../screens/roles/RoleView";
import RegisterWorkerView from "../screens/Worker/RegisterWorker/RegisterWorkerView";
import HomeWorkerView from '../screens/Worker/home/HomeWorkerView'

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes >
                <Route path = "/" element = {<RoleView />} />
                <Route path = "/registerWorker" element = {<RegisterWorkerView />} />
                <Route path = "/homeWorker" element = {<HomeWorkerView />} />
            </Routes>
        </BrowserRouter>
    );
}