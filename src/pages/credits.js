import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";

const CreditsPage = ({
  location,
}) => {
  return (
    <Layout location={location}>
    <SEO title="Credits" keywords={[`gatsby`, `application`, `react`]} />
      <div className="credits-page">
        <div className="container container--lg">
          <section className="main-content">
            <div className="about-page__content">
              <h1 className="guide-about-page__title">
                Credits
              </h1>

              <div className="set-page__description">
                Content for the Credits page will go here somewhere.
              </div>

            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
};

export default CreditsPage;