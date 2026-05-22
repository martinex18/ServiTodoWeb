import { Link } from "react-router-dom";
import logo from "@/assets/logo/logo_header.png";

const Header = ({
    links = [],
    backgroundColor = "bg-white/80 backdrop-blur-md",
    textColor = "text-gray-900",
    rightContent,
}) => {
    return (
        <header
            className={`${backgroundColor} sticky top-0 w-full z-50 border-b border-gray-100`}
        >
            <nav
                className={`mx-auto max-w-7xl flex items-center justify-between px-6 py-3 lg:px-8`}
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="ServiTodo logo" className="h-7 w-auto" />
                </Link>

                {/* Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`${textColor} text-sm font-semibold hover:opacity-70 transition-opacity`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Content */}
                <div className="flex items-center justify-end">
                    {rightContent}
                </div>
            </nav>
        </header>
    );
};

export default Header;