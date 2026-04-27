import SideBar from "./SideBar/SideBar";
import { useState } from "react";

const Layout = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    return(
        <div className="flex">
            <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

            <main className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
                {children}
            </main>
        </div>
    )
}

export default Layout;