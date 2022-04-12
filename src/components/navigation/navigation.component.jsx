import React, { useEffect, useState } from "react";
import './navigation.styles.scss';
import { Link } from "react-router-dom";
import { ReactComponent as InstagramIcon } from '../../assets/instagramIcon.svg';
// Redux
import { connect } from "react-redux";
import { setTextLang } from '../../redux/text/text.actions';

const Navigation = ({ language, setTextLang }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    let activeLanguage = language;

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

    // Language Switch
    const onLangClick = (lang) => {
        setTextLang(lang);
    }
    return (
        <nav className="navigationContainer p-4">
            <div className="logo me-auto">
                <Link className="logoNav" to={'/'}>
                    <h3 className={scrolled ? 'scrolled' : ''}>Jérémie Pialoux</h3>
                </Link>
            </div>
            <div className="mainNavigation d-none d-sm-flex">
                <div className="navItemHolder">
                    <Link className="navLink-item" to={'/#portfolio'}>Portfolio</Link>
                    <Link className="navLink-item" to={'/bio'}>Bio</Link>
                    <Link className="navLink-item" to={'/contact'}>Contact</Link>
                    <a className="instaLogoContainer" href="https://www.instagram.com/kamonn.true/" target={'_blank'}><InstagramIcon className="instaLogo" /></a>
                </div>
                <div className="langSwitch">
                    <h6 onClick={() => onLangClick('FR')} className={`${(language === 'FR') ? 'activeLang' : ''} frLang`}>FR</h6>
                    <div>-</div>
                    <h6 onClick={() => onLangClick('EN')} className={`${(language === 'EN') ? 'activeLang' : ''} enLang`}>EN</h6>
                </div>
            </div>
            <div className="mobileNavigation d-flex d-sm-none">
                <div className="menuContainer">
                    <a className="instaLogoContainer" href="https://www.instagram.com/kamonn.true/" target={'_blank'}><InstagramIcon className="instaLogo" /></a>
                    <div onClick={mobileMenuClick} className={`${menuOpen ? 'open' : ''} burgerMenu`}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={`${menuOpen ? 'menuOpen' : 'menuClosed'} mobileNavLink`}>
                    <Link className="mobileLink-item" to={'/#portfolio'}>Portfolio</Link>
                    <Link className="mobileLink-item" to={'/bio'}>Bio</Link>
                    <Link className="mobileLink-item" to={'/contact'}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    language: state.text.language
});

const mapDispatchToProps = (dispatch) => ({
    setTextLang: lang => dispatch(setTextLang(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);