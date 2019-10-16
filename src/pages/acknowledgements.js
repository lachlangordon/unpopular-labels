import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";

const AcknowledgementsPage = ({
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
                <p>The Powerhouse Museum warmly thank Jenny Kee and Linda Jackson for their generous collaboration in the creation of <cite>Step into Paradise</cite>. </p>

                <h3><strong>Creative Director</strong></h3>
                <p>Tony Assness</p>

                <h3><strong>Curatorial</strong></h3>
                <p>Glynis Jones, Alysha Buss, Vanessa Thorne</p>

                <h3><strong>Exhibition Designer</strong></h3>
                <p>Jemima Woo</p>

                <h3><strong>Music Curation and Composition</strong></h3>
                <p>Jonny Seymour, Nick Wales</p>

                <h3><strong>Lighting Design</strong></h3>
                <p>Damien Cooper</p>

                <h3><strong>Lighting</strong></h3>
                <p>Peter Harmon</p>

                <h3><strong>Project Coordinator</strong></h3>
                <p>Kate Ford</p>

                <h3><strong>Exhibition Design and Production</strong></h3>
                <p>Angus Meredith, Arabella Cumyn-Jones, Buster Kruger, Chad Shah, Chloe Simcox, Col Johnston, Cristina Briones, Dave Teer, David Statham, Eloise Lindeback, Gavin Lewis, Gill Scott, Iain Cooper, Jack Dunbar, Jessica Fitzpatrick, Joanne Delzoppo, Jo Lyons, Jo Westbury, Judith Matheson, Karen Hancock, Lauren Volk, Maria Mosquera, Neil Burtt, Pablo Donnan, Penny Angrick, Rocket Mattler, Rose McEwen, Stella Palmer, Stephen Chaumont, Trudi Fletcher, Vania Contreras, Victoria Nelson</p>

                <h3><strong>Indigenous Engagement</strong></h3>
                <p>Marcus Hughes</p>

                <h3><strong>Registration and Conservation</strong></h3>
                <p>Caitlin Lawler, Chris Redman, Lucy Clark, Madeleine Riley, Sarah Heenan, Sarah Pointon, Skye Mitchell, Suzanne Chee, Teresa Werstak, Tim Morris</p>

                <h3><strong>Audio, Visual and Digital Media</strong></h3>
                <p>Anna Fraser, Arul Baskaran, Ben Rumble, Brett Tweedie, David Cochrane, Gara Baldwin, Geoff Drane, Georgina Veneziani, Harry Ree, Jessica James-Moody, Julian Burgess, Karen Johnson, Kathleen Hackett, Kathleen Phillips, Lachlan Gordon, Marinco Kojdanovski, Michael Saad, Nathan Utama, Owen Conlan, Rebecca Godfrey, Ryan Hernandez, Stephen Mason, Tim Wilson</p>

                <h3><strong>Communications and Development</strong></h3>
                <p>Alison Wares, Daniel McCready, Elizabeth Smith, Georgia Sholl, Kathleen Evesson, Kym Elphinstone, Mark Sieckman, Rachida Pearce, Sasha Haughan</p>

                <h3><strong>Programs and Education</strong></h3>
                <p>Anne-Louise Dadak, Karolina Novak, Mark Scarcella, Sophie Harrington</p>

                <h3><strong>Visitor Services and Volunteers</strong></h3>
                <p>Cate Purcell, Eloise Eaton, Jo Jewitt</p>

                <br/>

                  <p>We thank the following people and organisations who have generously supported <cite>Step into Paradise</cite>.</p>

                <h3><strong>Lenders</strong></h3>
                <p>Dinosaur Designs, Doodad + Fandango, Jenny Kee, Jill Oliver, Klava Widdicombe, Linda Jackson, National Gallery of Australia, National Gallery of Victoria, Paul and Moira McKnight, Romance Was Born, Toni Walker-Lear</p>

                <h3><strong>Supporters</strong></h3>
                <p>ABC Commercial, Alan White, Annie Noon, APRA AMCOS, Bill Cunningham Foundation LLC, Bliss Swift, Brett Hilder, Brian Morris, Daniel Boud, Dominique Longheon, Fairfax Media, Fran Moore, François Perez, Grant Matthews, Hugh Stewart, John Storey, Jon Lewis (courtesy Mark Lewis), Kobya Panguana, Lucas Dawson, Mike Molloy, Mike Walsh Show, National Film and Sound Archive of Australia, Network 10, News Licensing (UK), News Life Media, Newspix, Penny McIntyre, Think Positive Prints (T+), Pental, Peter Muhlbock (Sunday Telegraph), Peter Smalley (Clytie Jessop Estate), Philippe Mora, Porter’s Paints, Robert Rosen, Robert Whitaker, Sandy Edwards, Sonny Vandevelde, Tim Street-Porter, TopFoto, Wendy Adnam, William Yang</p>

              </div>

            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
};

export default AcknowledgementsPage;
