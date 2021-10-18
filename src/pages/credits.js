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
              <p><i>Glitterati</i> draws on the Robert Rosen archive held in the Powerhouse collection as well as images, shown with the photographer's generous permission, from his personal archive. The exhibition was produced through collaboration with Robert Rosen and the museum's multidisciplinary team.</p>
            </div>

          </div>
        </section>
      </div>
    </div>
    </Layout>
  )
};

export default CreditsPage;
