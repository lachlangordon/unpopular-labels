import React from 'react';
import maasLogo from '../../assets/maas-scss/logos/logo-maas.gif';

const Footer = (props) => (
    <footer className="footer">
        <section className="section footer-content">
          <div className="container container--lg">
                {/*
                  <h2>About the exhibition</h2>
                  <p>{props.description}</p>
                  <div className="logo-holder">
                    <img src={maasLogo}/>
                  </div>
                */}
                <div className="footer-content__acknowledgment">
                    <h3>Acknowledgement of Country</h3>
                    <p>The Museum of Applied Arts and Sciences acknowledges Australia’s First Nations Peoples as the Traditional Owners and Custodians of the land and gives respect to the Elders – past and present – and through them to all Aboriginal and Torres Strait Islander peoples.</p>
                    <br /> <p> All photography by Museum of Applied Arts and Sciences unless otherwise stated.</p>
                </div>
                <nav className="nav-secondary">
                  <div className="footer-content__navigation-container">
                      <ul className="footer-content__navigation">
                        <li className="menu-item"><a href="https://maas.museum/terms-and-conditions/">Terms and Conditions</a></li>
                        <li className="menu-item"><a href="https://maas.museum/privacy/">Privacy</a></li>
                        <li className="menu-item"><a href="https://maas.museum/copyright/">Copyright</a></li>
                        <li className="menu-item"><a href="https://maas.museum/disclaimers/">Disclaimers</a></li>
                        {/* <li ><a href="https://www.nsw.gov.au/">NSW Government</a></li> */}
                      </ul>
                  </div>
                </nav>
            </div>
        </section>
    </footer>
);

export default Footer;
