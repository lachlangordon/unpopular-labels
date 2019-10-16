import React from 'react';
import { Link } from 'gatsby';

import { MobileIcon } from "../Icons/SharedIcons";
import {shouldShowSeenIcon} from '../../lib/session';

const Footer = (props) => (
    <footer className="footer">
        <section className="section footer-content">
          <div className="footer-mobile-footer">
            {
              !shouldShowSeenIcon() && (
                <div className="footer-mobile-icon">
                  <MobileIcon />
                  <div>
                    View this guide on your phone:
                    <br/>
                    <a href="#">https://maas.museum/guide</a>
                    <br/>
                    or <Link to="/link">scan the QR code</Link>
                  </div>
                </div>
              )
            }
          </div>

          <div className="footer-content__acknowledgment">
              <h3 className="footer-content__acknowledgment-title">Acknowledgement of Country</h3>
              <p>The Museum of Applied Arts and Sciences acknowledges Australia’s First Nations Peoples as the Traditional Owners and Custodians of the land and gives respect to the Elders – past and present – and through them to all Aboriginal and Torres Strait Islander peoples.</p>
          </div>
          <nav className="nav-secondary">
            <div className="footer-content__navigation-container">
                <ul className="footer-content__navigation">
                  <li className="menu-item"><Link to="/acknowledgements">Acknowledgements</Link></li>
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
