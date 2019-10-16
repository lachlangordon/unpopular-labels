import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import qr from '../assets/maas-scss/svg/qr.svg';

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
                <div className="qr-code">
                  <img src={qr}/>
                </div>

                <h2>Or type into your browser</h2>
                <a className="mobile-link" href="https://maas.museum/guide">https://maas.museum/guide</a>
              </div>

            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
};

export default LinksPage;
