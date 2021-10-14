import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faArrowRight, faArrowLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
//
const ArrowUp = props => <FontAwesomeIcon icon={faArrowUp} {...props} />

const ArrowLeft = props => <FontAwesomeIcon icon={faArrowLeft} {...props} />

const ArrowRight = props => <FontAwesomeIcon icon={faArrowRight} {...props} />

const MobileIcon = props => <FontAwesomeIcon icon={faMobileAlt} {...props} />

const HomeIcon = props =>  (
  <span className="home-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Home</title>
        <path d="M1 23V11.1111L12 1L23 11.1111V23H1Z" stroke="white"/>
    </svg>
  </span>
);

const BackIcon = props => (
    <span className="back-icon">
        <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Back</title>
            <path d="M8.08729 0.500111L1.01622 7.57118M8.08729 14.6422L1.01622 7.57118M1.01622 7.57118H23.4994" stroke="white"/>
        </svg>
    </span>
)

export {
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  MobileIcon,
  HomeIcon,
  BackIcon
}
