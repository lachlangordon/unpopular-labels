import React from 'react';
import maasLogo from '../../assets/maas-scss/logos/logo-maas.gif';

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
          <h5>About the exhibition</h5>
          <p>{props.description}</p>
          <div className="logo-holder">
            <img src={maasLogo}/>
          </div>
            {/*
            <ul className="icons">
                <li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
            */}
        </div>
    </footer>
);

export default Footer;
