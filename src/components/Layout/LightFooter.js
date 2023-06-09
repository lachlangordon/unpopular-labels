import React from 'react';
import { Link } from 'gatsby';

import { MobileIcon } from "../Icons/SharedIcons";
import {shouldShowSeenIcon} from '../../lib/session';

const LightFooter = (props) => (
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
                <a href="#top">https://maas.museum/guide</a>
                <br/>
                or <Link to="/link">scan the QR code</Link>
              </div>
            </div>
          )
        }
      </div>
    </section>
  </footer>
);

export default LightFooter;
