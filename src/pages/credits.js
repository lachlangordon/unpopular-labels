import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';

const CreditsPage = ({
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
              Credits
            </h1>

            <div className="normal-page__description">
              <p>Some sort of good stuff here, pls.</p>
            </div>

          </div>
        </section>
      </div>
    </div>
    </Layout>
  )
};

export default CreditsPage;
