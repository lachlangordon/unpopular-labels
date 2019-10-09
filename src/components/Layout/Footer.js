import React from 'react';
import { Link } from 'gatsby';
import maasLogo from '../../assets/maas-scss/logos/logo-maas.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import {shouldShowSeenIcon} from '../../lib/session';

const Footer = (props) => (
    <footer className="footer">
        <section className="section footer-content">
          {
            !shouldShowSeenIcon() && (
              <div className="footer-mobile-icon">
                <FontAwesomeIcon icon={faMobileAlt} />
                View this guide on your phone:<br/>
                https://maas.museum/guide
              </div>
            )
          }

          <div className="footer-content__acknowledgment">
              <h3 className="footer-content__acknowledgment-title">Acknowledgement of Country</h3>
              <p>The Museum of Applied Arts and Sciences acknowledges Australia’s First Nations Peoples as the Traditional Owners and Custodians of the land and gives respect to the Elders – past and present – and through them to all Aboriginal and Torres Strait Islander peoples.</p>
              <br /> <p> All photography by Museum of Applied Arts and Sciences unless otherwise stated.</p>
          </div>
          <nav className="nav-secondary">
            <div className="footer-content__navigation-container">
                <ul className="footer-content__navigation">
                  <li className="menu-item"><Link to="/credits">Credits</Link></li>
                  {shouldShowSeenIcon() && (
                    <li className="menu-item"><Link to="/privacy">Privacy</Link></li>
                  )}
                </ul>
            </div>
          </nav>
        </section>
    </footer>
);

export default Footer;
