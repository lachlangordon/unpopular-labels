import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import qr from '../assets/maas-scss/svg/qr.svg';
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";

const LinksPage = ({
                       location,
                     }) => {
  return (
    <Layout location={location}>
      <SEO title="Credits" keywords={[`gatsby`, `application`, `react`]} />

      <div className="normal-page">
        <div className="container container--lg">
          <section className="full-content">
            <div className="normal-page__content">

              <h1 className="normal-page__title">
                View this guide on your phone
              </h1>

              <div className="normal-page__description">
                <h2>Scan the QR code</h2>
                <div className="container container--sm qr-code">
                  <img alt="maas-museum guide qr-code" src={qr}/>
                </div>
                <div className="container container--sm">
                  <ol>
                    <li>Open the Camera or QR Code reader app on your phone</li>
                    <li>Hold your device so the QR Code is clearly visible within the screen</li>
                    <li>Click on the link that appears to access the guide</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <h2>Or type into your browser</h2>
              <a className="mobile-link" href="https://maas.museum/guide">https://maas.museum/guide</a></div>
          </section>
          <section className="section">
            <div className="container container--lg">
              <NavigationButtons/>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
};

export default LinksPage;
