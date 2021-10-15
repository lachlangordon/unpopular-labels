import React from 'react';
import logo from '../../assets/images/ph-logo.svg'
import { Link } from 'gatsby';

const Footer = (props) => (
    <footer className="footer">
        <section className="section footer-content">
            <img alt="Powerhouse" src={logo}/>
            <Link className="credits-link" to="/credits">Credits</Link>
        </section>
    </footer>
);

export default Footer;
