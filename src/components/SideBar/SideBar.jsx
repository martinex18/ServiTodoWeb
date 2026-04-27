import { ArrowLeft, Briefcase, ClipboardCheck, LayoutDashboard, Settings, SquareArrowRightExit, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = ({ collapsed, setCollapsed }) => {
    const menuItems = [
        { label: 'Inicio', icon: LayoutDashboard, to: '/' },
        { label: 'Servicios', icon: Briefcase, to: '/services' },
        { label: 'Solicitudes', icon: ClipboardCheck, to: '/request' },
        { label: 'Perfil', icon: User, to: '/profile' },
    ]

    const menuItems2 = [
        { label: 'Configuración', icon: Settings, to: '/settings' },
        { label: 'Cerrar sesión', icon: SquareArrowRightExit, to: '/logout' },
    ]

    return (
        <div className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 flex flex-col ${collapsed ? "w-15" : "w-62"}`}>
            {/* header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {!collapsed && <h1 className="text-lg font-semibold">ServiTodo</h1>}
                <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setCollapsed(!collapsed)}>
                    <ArrowLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
                </button>
            </div>

            <div className="flex flex-col items-start justify-between h-full w-full">
                {/* menu */}
                <nav className="px-2 mt-2 w-full">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all mb-1 ${isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-primary-light hover:text-black"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* menu items 2 */}
                <nav className="w-full pt-2 px-2 border-t border-gray-200">
                    {menuItems2.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all mb-1 ${isActive
                                        ? "bg-primary text-white"
                                        : "text-gray-600 hover:bg-primary-light hover:text-black"
                                    }`
                                }
                            >
                                <Icon size={20} />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
        </div>
    );
}

export default SideBar;