import React, { useState } from "react";
import { Link } from "react-router-dom";
import './navigation.styles.scss';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const mobileMenuClick = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <nav className="navigationContainer p-4">
            <div className="logo me-auto">
                <h3>Jeremie Pialoux</h3>
            </div>
            <div className="mainNavigation d-none d-sm-flex">
                <Link className="navLink-item" to={'/'}>Work</Link>
                <Link className="navLink-item" to={'/about'}>About</Link>
                <Link className="navLink-item" to={'/contact'}>Contact</Link>
            </div>
            <div className="mobileNavigation d-flex d-sm-none">
                <div onClick={mobileMenuClick} className={`${menuOpen ? 'open' : ''} burgerMenu`}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`${menuOpen ? 'menuOpen' : 'menuClosed'} mobileNavLink`}>
                    <Link className="mobileLink-item" to={'/'}>Work</Link>
                    <Link className="mobileLink-item" to={'/about'}>About</Link>
                    <Link className="mobileLink-item" to={'/contact'}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;