import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import tenLogo from '../assets/images/10logo.png';

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
              <p>All photography by Marinco Kojdanovski and Ryan Hernandez, Museum of Applied Arts and Sciences, unless otherwise stated.</p>

              <h2>Before</h2>
              <h3>Video projection and photo animation</h3>
              <p>Design and animation by Anna Fraser and Julian Burgess (JULIANNA)</p>
              <p>Photos courtesy Alamy, Chronicle, Cinesound Movietone, Edith Jackson, Fran Moore, George Lipman/<cite>The Sydney Morning Herald</cite>, Granger ― Historical Picture Archive, <cite>Herald & Weekly Times</cite> (UK) TopFoto, Jack Hickson, Marka, Mark Strizic, Monte Luke, Museum of Arts and Sciences, National Film and Sound Archive of Australia, Noel Herfort/<cite>The Sydney Morning Herald</cite>, Pat Woodley’s Modelling Agency, Roy Cushon/Roy Leighton Associates, State Library of New South Wales, State Library of Victoria, <cite>The Sunday Times</cite>/News Licensing, William Yang</p>
              <h3><cite>Trouble in Molopolis</cite>, 1970</h3>
              <span>(7:41 min)</span>
              <p>Directed and produced by Philippe Mora. Courtesy National Film and Sound Archive of Australia</p>
              <p>Excerpts edited by Georgina Veneziani, Museum of Applied Arts and Sciences</p>
              <h2>Flamingo Park</h2>
              <span>(13:30 min)</span>
              <p>Short film edited by Georgina Veneziani, Museum of Applied Arts and Sciences</p>
              <p>GTK excerpts courtesy Australian Broadcasting Corporation Library Sales</p>
              <p>Photos courtesy Fran Moore and Linda Jackson</p>

              <h2>Screening Room</h2>
              <h3>Video projection</h3>
              <p>Art direction and production by Hank Mango (David Cochrane, John Grist and Michael Saad)</p>
              <p>Photos courtesy Annie Noon, Bill Cunningham/The Bill Cunningham Foundation LLC, Bliss Swift, Brett Hilder, Brian Morris, Dominique Longheon, François Perez, Fran Moore, Grant Matthews, Jon Lewis, Kobya Panguana, Mike Molloy, Peter Muhlbock/<cite>Sunday Telegraph</cite>, Robert Rosen, Sandy Edwards, Tim Street-Porter, Wendy Adnam, William Yang</p>

              <h3>Films</h3>
              <p>ABC TV South East Forests protest footage courtesy Australian Broadcasting Corporation Library Sales</p>
              <p>Flamingo Follies 1975, 1977, 1980, 1981 excerpts produced by Swamplands Productions</p>
              <p>Flamingo Follies 1979 excerpts shown with kind permission from the estate of Clytie Jessop. Courtesy National Film and Sound Archive of Australia</p>
              <p><cite>The Mike Walsh Show</cite> excerpts courtesy Mike Walsh</p>
              <p>Softly advertisement courtesy Pental</p>
              <p><cite>Good Morning Australia</cite> excerpt courtesy Network 10<img style={{width: '2em', marginLeft: '0.5em'}} src={tenLogo}/></p>

              <h2>Opals</h2>
              <p>Photos courtesy Fran Moore, Linda Jackson, Wendy Adnam</p>

              <h2>ROMANCE WAS BORN</h2>

              <p>Excerpts from Romance Was Born, ‘Cooee Couture’ collection show, Art Gallery of NSW, 2015, produced by Sophie Georgiou, Motel Picture Company
              <br/>(2:27 min)</p>
              <p>Excerpts from Romance Was Born, Step into Paradise ‘Kinda Couture’ collection show, Paris, 2018, produced by Sonny Vandevelde and Claudia Smith
              <br/>(1:33 min)</p>
              <p>Edited by Georgina Veneziani, Museum of Applied Arts and Sciences</p>

            </div>

          </div>
        </section>
      </div>
    </div>
    </Layout>
  )
};

export default CreditsPage;
