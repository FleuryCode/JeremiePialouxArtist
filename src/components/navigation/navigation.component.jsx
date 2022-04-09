import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './navigation.styles.scss';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const mobileMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    // Scroll Event to Change Style
    useEffect(() => {
        document.addEventListener('scroll', () => {
            const scrollCheck = window.scrollY > 150;
            setScrolled(scrollCheck);
        });
    }, []);

    return (
        <nav id="mainNav" className="navigationContainer p-4">
            <div className="logo me-auto">
                <Link className="logoNav" to={'/'}>
                    <h3 className={scrolled ? 'scrolled' : ''}>Jérémie Pialoux</h3>
                </Link>
            </div>
            <div className="mainNavigation d-none d-sm-flex">
                <Link className="navLink-item" to={'/#portfolio'}>Portfolio</Link>
                <Link className="navLink-item" to={'/bio'}>Bio</Link>
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
                    <Link className="mobileLink-item" to={'/'}>Portfolio</Link>
                    <Link className="mobileLink-item" to={'/bio'}>Bio</Link>
                    <Link className="mobileLink-item" to={'/contact'}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;