import React, { Component } from 'react';

import SeenIcon from '../Icons/SeenIcon';
import QuoteIcon from '../Icons/QuoteIcon';

import {shouldShowSeenIcon} from '../../lib/session';

class IconLegend extends Component {
  render() {
    return (
      <div className="icon-legend">
        <div>
          <QuoteIcon/><p>This object contains additional information. Tap to find out more about Jenny's and Linda's stories.</p>
        </div>
        {
          shouldShowSeenIcon() && (
            <div>
              <SeenIcon/><p>You have already seen this object.</p>
            </div>
          )
        }
      </div>

    );
  }
}

export default IconLegend;
