import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
//
const ArrowRight = props => <FontAwesomeIcon icon={faArrowRight} {...props} />

const MobileIcon = props => <FontAwesomeIcon icon={faMobileAlt} {...props} />

const HomeIcon = props =>  (
  <span className="home-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 25 25" {...props}>
      <title>Home</title>
      <path id="Path" d="M25,11.719V23.438a1.6,1.6,0,0,1-.412,1.1,1.267,1.267,0,0,1-.977.464H15.278V15.625H9.722V25H1.389a1.267,1.267,0,0,1-.977-.464A1.6,1.6,0,0,1,0,23.438V11.719a.372.372,0,0,1,.011-.073.372.372,0,0,0,.011-.073L12.5,0,24.978,11.572A.378.378,0,0,1,25,11.719Z" fillRule="evenodd"/>
    </svg>
  </span>
);

export {
  ArrowRight,
  MobileIcon,
  HomeIcon,
}
