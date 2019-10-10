import React from 'react';
import { Link } from 'gatsby';

import { MobileIcon } from "../Icons/SharedIcons";
import {shouldShowSeenIcon} from '../../lib/session';
import ImageByPath from "../Image/ImageByPath";

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
                <a href="https://maas.museum/guide">https://maas.museum/guide</a>
              </div>
            </div>
          )
        }
      </div>
    </section>
  </footer>
);

export default LightFooter;
