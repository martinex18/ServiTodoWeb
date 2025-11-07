import { Link } from "react-router-dom";

/**
 * Header component
 * @param {Object[]} links
 * @param {string} backgroundColor
 * @param {string} textColor
 * @param {string} position
 */

const Header = ({links = [], backgroundColor = 'bg-blue', textColor = 'text-gray-900', position = 'absolute'}) => {
    return(
        <header className={`${backgroundColor} ${position} top-0 left-0 w-full z-50`}>
            <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8' aria-label="Main navigation">
                <div className="flex">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" className="h-8 w-auto" />
                    </Link>
                </div>

                <ul className="hidden md:flex items-center gap-20">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.to} className={`${textColor} text-sm font-semibold hover:opacity-70 transition-opacity`}>{link.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* <div className='flex items-center gap-20'>
                    <Link to="#" className="text-sm/6 font-semibold text-gray-900">Features</Link>
                    <Link to="#" className="text-sm/6 font-semibold text-gray-900">Marketplace</Link>
                    <Link to="#" className="text-sm/6 font-semibold text-gray-900">Company</Link>
                </div> */}

{/* CAMBIAR POR LOGOS DE LAS REDES SOCIALES -------> */}
                <div className="hidden lg:flex lg:justify-end">
                    <Link to="#" className={`${textColor} text-sm font-semibold hover:opacity-70 transition-opacity`}>Log in <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;