import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.css'

const SideBar = () => {

    const location = useLocation();
    const [activeLink, setActiveLink] = useState<string>(location.pathname);

    const handleLinkClick = (path: string) => {
        setActiveLink(path);
    };

    return (
        <div className="container">
            <div className="row flex-nowrap">
                <div className="col-12 px-sm-2 px-0">
                    <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <i className="fs-4 bi bi-shop"></i>
                            <span className="fs-2 d-none d-sm-inline">Alten Shop</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className={activeLink === '/products' ? 'nav-item active' : 'nav-item'}>
                                <Link to="/products" onClick={() => handleLinkClick('/products')}>
                                    <i className="fs-4 bi-cart"></i>
                                    <span className="ms-1 d-none d-sm-inline">Products</span>
                                </Link>
                                <span className="line"> </span>
                            </li>
                            <li className={activeLink === '/admin/products' ? 'nav-item active' : 'nav-item'}>
                                <Link to="/admin/products" onClick={() => handleLinkClick('/admin/products')}>
                                    <i className="fs-4 bi-people"></i>
                                    <span className="ms-1 d-none d-sm-inline">Admin</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;