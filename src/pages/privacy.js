import React from 'react';

import Layout from '../components/Layout/Layout';
import SEO from '../components/seo';
import NavigationButtons from "../components/NavigationButtons/NavigationButtons";

const PrivacyPage = ({
 location,
}) => {
  return (
    <Layout location={location}>
      <SEO title="Privacy" keywords={[`gatsby`, `application`, `react`]} />

      <div className="normal-page">
        <div className="container container--lg">
          <section className="full-content">
            <div className="normal-page__content">
              <h1 className="normal-page__title">
                Privacy
              </h1>

              <div className="normal-page__description">
                  <p>Museum of Applied Arts and Sciences&nbsp;is committed to protecting your privacy, including throughout&nbsp;and as a result of your interaction/s with our websites.</p>
                  <p>Museum of Applied Arts and Sciences&nbsp;is subject to the <em>NSW Privacy and Personal Information Protection Act (1998)</em>. The Museum’s Privacy Management Plan outlines how the Museum complies with the Act.</p>
                  <h3><strong>Automatic logging of information</strong></h3>
                  <p>(Internet Protocol) addresses [an IP is the address of a computer] of visitors are automatically logged by our servers. The server makes a record of your visit and logs limited information for statistical purposes – your IP address, top-level domain name (.com, .gov, .edu, com.au etc), the date and time of your visit to our site, pages accessed and documents downloaded, previous site visited and the type of browser used. These logs are used to administer the website and to diagnose problems in order to be able to rectify them. This data is also used for audience research to help us to improve the site.</p>
                  <p>IP addresses do not contain any personally identifiable information and are aggregated for analysis. Such aggregate data may be provided to internal departments only. Recording usage patterns helps us to identify popular areas of our site, and helps us to improve the site. Reports generated on aggregate data are periodically sent to State Government as part of the Museum’s statutory requirements.</p>
                  <h3><strong>Collection of personal information</strong></h3>
                  <p>Museum of Applied Arts and Sciences&nbsp;collects personal information such as name, phone number/email address/postal address when you provide it in order to receive specific Museum services. This information is stored in secure MAAS&nbsp;databases. The information you provide will be used solely by the relevant MAAS&nbsp;staff for its intended purpose, as stated on those pages. Your name, contact details and other information will not be provided to any other person or third-party organisation without your consent.</p>
                  <p>Your provision of personal details is optional, however some services may not be available to you if you do not provide these details.</p>
                  <p>If you contact MAAS via this website, your email address will be used only to reply to you – which may require it to be sent on to the appropriate staff member. Your email address will not be added to a mailing list or disclosed to any other person or organisation without your consent.</p>
                  <p>This website may use third party tracking and monitoring tools. These tools may record information about your user session but do not record personal information other than about your IP address, internet browser and search terms. If you wish to opt out of these tools then we would recommend disabling Javascript and turning off cookies. Please be aware that some areas of our website may not function correctly with these turned off.</p>
                  <h3><strong>Use of cookies</strong></h3>
                  <p>Cookies are small files that a website can store on a user’s computer and are used for keeping the ‘state of a user session’ i.e. remembering who you are from a page requesting information through to supplying it. The cookies that are used by the MAAS&nbsp;websites do not collect any personal information and we do not combine information collected through cookies with other personal information to tell us who you are other than to authenticate the user for security purposes.</p>
                  <p>We also use cookies to measure certain visitor patterns, including areas of the website you have visited. This research is used to help us understand user habits, so the website can be improved.</p>
                  <p>If you prefer not to receive cookies, you can adjust your internet browser to refuse cookies or to warn you when cookies are being used. Refusal may make some parts of our websites inaccessible, unusable, or not function correctly.</p>
                  <h3><strong>Use of pixels</strong></h3>
                  <p>Pixels are 1 x 1 pixel images that allow services to tell companies how many people have visited their site. When you take a certain action on our website, a request is sent to the server to download the tracking pixel attached to the content you’re interacting with. It’s an invisible process to you but the data collected will help us build better digital ad and content experiences for you. All information collected is de-identified and we will never collect or disclose any personal information.</p>
                  <h3><strong>Disclosure</strong></h3>
                  <p>Museum of Applied Arts and Sciences&nbsp;will not disclose your personal information to any third party except when required by law and/or in accordance with the <em>Privacy and Personal Information Protection Act, 1998</em>.</p>
                  <p>MAAS may be required to disclose your personal information to third parties to provide the service you requested. For example, in purchasing products online, we will need to disclose personal information to third parties in order to bill and deliver your products. This disclosure, however, will only be made to fulfil the purpose for which you disclosed your personal information. We will not disclose your personal information for any other purpose unless you have authorised us to do so.</p>
                  <h3><strong>Security</strong></h3>
                  <p>This site has security measures in place to protect against the loss, misuse and alteration of information under our control.</p>
                  <h3><strong>Contact details</strong></h3>
                  <p>If you have any questions about this Online Privacy Statement, please contact the Museum’s Privacy Officer by telephoning (02) 9217 0350.</p>
              </div>
            </div>
          </section>
        </div>
        <section className="section">
          <NavigationButtons/>
        </section>
      </div>
    </Layout>
  )
};

export default PrivacyPage;
