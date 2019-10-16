import React from 'react';
import { Link } from "gatsby";
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
                <Link to="/link">View this guide on your phone</Link>
            </div>
          )
        }
      </div>
    </section>
  </footer>
);

export default LightFooter;
