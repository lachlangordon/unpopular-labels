import React from 'react';
import maasLogo from '../assets/images/maas_logo.svg'

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
          <h5>About the exhibition</h5>
          <p>{props.description}</p>
          <div className="logo-holder">
            <img src={maasLogo}/>
          </div>
        </div>
    </footer>
)

export default Footer
