import React, { useEffect, useState } from 'react';
import './navigation.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as InstagramIcon } from '../../assets/instagramIcon.svg';
// Redux
import { connect } from 'react-redux';
import { setTextLang } from '../../redux/text/text.actions';

const Navigation = ({ language, setTextLang }) => {
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

  // Language Switch
  const onLangClick = () => {
    if(language === 'FR') {
      setTextLang('EN');
    }else if(language === 'EN') {
      setTextLang('FR')
    }
    
  };
  return (
    <nav
      className={`navigationContainer ${menuOpen ? 'menuOpen' : ''} ${
        scrolled ? 'scrolled' : ''
      }`}
    >
      <div className="logo me-auto">
        <Link className="logoNav" to={'/'}>
          <h3 className={scrolled ? 'scrolled' : ''}>KAMONN</h3>
        </Link>
      </div>
      <div className="mainNavigation d-none d-md-flex">
        <div className="navItemHolder">
          <Link className="navLink-item" to={'/#portfolio'}>
            PORTFOLIO
          </Link>
          <Link className="navLink-item" to={'/bio'}>
            BIO
          </Link>
          <Link className="navLink-item" to={'/contact'}>
            CONTACT
          </Link>
          <div className="langSwitchContainer">
            <h6 onClick={() => onLangClick()}>{language === 'FR' ? 'FR' : 'EN'}</h6>
          </div>

          <a
            className="instaLogoContainer"
            href="https://www.instagram.com/kamonn.true/"
            target={'_blank'}
            rel="noreferrer"
          >
            <InstagramIcon className="instaLogo" />
          </a>
        </div>
      </div>
      <div className={`mobileNavigation d-flex d-md-none ${scrolled ? 'scrolled' : ''}`}>
        <div className="menuContainer">
          <a
            className="instaLogoContainer"
            href="https://www.instagram.com/kamonn.true/"
            target={'_blank'}
            rel="noreferrer"
          >
            <InstagramIcon className="instaLogo" />
          </a>
          <div
            onClick={mobileMenuClick}
            className={`${menuOpen ? 'open' : ''} burgerMenu`}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div
          className={`${menuOpen ? 'menuOpen' : 'menuClosed'} mobileNavLink`}
        >
          <Link onClick={() => setMenuOpen(false)} className="mobileLink-item" to={'/#portfolio'}>
            PORTFOLIO
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="mobileLink-item" to={'/bio'}>
            BIO
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="mobileLink-item" to={'/contact'}>
            CONTACT
          </Link>
          <div className="langSwitch">
            <h6
              onClick={() => onLangClick()}
              className={''}
            >
              {language === 'FR' ? 'FR' : 'EN'}
            </h6>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  language: state.text.language,
});

const mapDispatchToProps = (dispatch) => ({
  setTextLang: (lang) => dispatch(setTextLang(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
