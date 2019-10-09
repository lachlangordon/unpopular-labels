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

    <div className="normal-page">
      <div className="container container--lg">
        <section className="full-content">
          <div className="normal-page__content">

            <h1 className="normal-page__title">
              Acknowledgements
            </h1>

            <div className="normal-page__description">
              <p>The Powerhouse Museum warmly thank Jenny Kee and Linda Jackson for their generous collaboration in the creation of Step into Paradise. </p>

              <h3><strong>Creative Director</strong></h3>
              <p>Tony Assness</p>

              <h3><strong>Curatorial</strong></h3>
              <p>Glynis Jones, Alysha Buss</p>

              <h3><strong>Exhibition Designer</strong></h3>
              <p>Jemima Woo</p>

              <h3><strong>Project Coordinator</strong></h3>
              <p>Kate Ford</p>

              <h3><strong>Exhibition Design and Production</strong></h3>
              <p>Angus Meredith, Arabella Cumyn-Jones, Buster Kruger, Chad Shah, Chloe Simcox, Cristina Briones, Damien Cooper, David Statham, Eloise Lindeback, Gavin Lewis, Iain Cooper, Jack Dunbar, Jessica Fitzpatrick, Joanne Delzoppo, Jo Lyons, Judith Matheson, Karen Hancock, Lauren Volk, Maria Mosquera, Pablo Donnan, Penny Angrick, Peter Hermon, Rose McEwen, Shane Fitzgerald, Stella Palmer, Stephen Chaumont, Trudi Fletcher, Vania Contreras, Victoria Nelson</p>

              <h3><strong>Indigenous Engagement</strong></h3>
              <p>Marcus Hughes</p>

              <h3><strong>Registration and Conservation</strong></h3>
              <p>Lucy Clark, Madeleine Riley, Sarah Heenan, Sarah Pointon, Skye Mitchell, Suzanne Chee, Teresa Werstak</p>

              <h3><strong>Audio, Visual and Digital Media</strong></h3>
              <p>Anna Fraser, Arul Baskaran, Ben Rumble, Brett Tweedie, David Cochrane, Gara Baldwin, Georgina Veneziani, Jonny Seymour, Julien Burgess, Kathleen Hackett, Kathleen Phillips, Lachlan Gordon, Marinco Kojdanovski, Michael Saad, Nathan Utama, Nick Wales, Owen Conlan, Ryan Hernandez</p>

              <br />

              <h3><strong>Communications and Development</strong></h3>
              <p>Alison Wares, Daniel McCready, Elizabeth Smith, Georgia Sholl, Kathleen Evesson, Kym Elphinstone, Mark Sieckman, Rachida Pearce, Sasha Haughan</p>

              <h3><strong>Programs and Education</strong></h3>
              <p>Anne-Louise Dadak, Karolina Novak, Mark Scarcella, Sophie Harrington</p>

              <h3><strong>Visitor Services and Volunteers</strong></h3>
              <p>Cate Purcell, Eloise Eaton, Jo Jewitt</p>

              <p>We thank the following people and organisations who have generously supported Step into Paradise.</p>

              <h3><strong>Lenders</strong></h3>
              <p>Dinosaur Designs, Jenny Kee, Jill Oliver, Klava Widdicombe, Linda Jackson, National Gallery of Australia, National Gallery of Victoria, Paul and Moira McKnight, Romance Was Born, Toni Walker-Lear</p>

              <h3><strong>Supporters</strong></h3>
              <p>ABC Commercial, Alan White, Anna Fraser and Julian Burgess, Annie Noon, APRA AMCOS, Bill Cunningham Foundation LLC, Bliss Swift, Brett Hilder, Brian Morris, Daniel Boud, Dominique Longheon, Fairfax Media, Fran Moore, François Perez, Grant Matthews, Hugh Stewart, John Storey, Jon Lewis (courtesy Mark Lewis), Kobya Panguana, Lucas Dawson, Mike Molloy, Mike Walsh Show, National Film and Sound Archive of Australia, Network 10, News Licensing (UK), News Life Media, Newspix, Penny McIntyre, Think Positive Prints (T+), Pental, Peter Muhlbock (Sunday Telegraph), Peter Smalley (Clytie Jessop Estate), Philippe Mora, Porter’s Paints, Robert Rosen, Robert Whitaker, Sandy Edwards, Sonny Vandevelde, Tim Street-Porter, TopFoto, Wendy Adnam, William Yang</p>

            </div>

          </div>
        </section>
      </div>
    </div>
    </Layout>
  )
};

export default CreditsPage;
