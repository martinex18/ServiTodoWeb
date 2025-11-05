import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleView from "../screens/roles/RoleView";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes >
                <Route path = "/" element = {<RoleView />} />
            </Routes>
        </BrowserRouter>
    );
}