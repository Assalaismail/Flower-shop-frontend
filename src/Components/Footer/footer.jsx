import "./footer.css";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin, faWhatsapp} from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <footer>
      <main className="footer-main">
        <section className="clmn-1">
          <h1>
            <plaintext>SOCIAL MEDIA LINKS</plaintext>
          </h1>
          <div className="media-icons-wrapper">
            <div className="icons-wrapper">
              <div className="icn-wrap">
              <a href="">
             <FontAwesomeIcon icon={faInstagram} />
            </a>
              </div>
              <div className="icn-wrap">
              <a href="/">
    <FontAwesomeIcon icon={faFacebook} />
  </a>
              </div>
              <div className="icn-wrap">
              <a href="/">
    <FontAwesomeIcon icon={faLinkedin} />
  </a>
              </div>
              <div className="icn-wrap">
              <a href="/">
    <FontAwesomeIcon icon={faWhatsapp} />
  </a>
              </div>
            </div>
            <p>Don't Forget To Follow Us!</p>
          </div>
        </section>

        <section className="clmn-2">
          <h1>Products</h1>
          <ul>
            <li>
              <a href="/">hiii</a>
            </li>
            <li>
              <a href="/">Hello</a>
            </li>
            <li>
              <a href="/"></a>
            </li>
          </ul>
        </section>

        <section className="clmn-4">
          <h1>Contact</h1>
          <ul>
            <li>Lebanon, Beirut Downtown</li>
            <li>
              <a href="/contactus">Mail us</a>
            </li>
            <li>
              <a href="">
                WhatsApp
              </a>
            </li>
          </ul>
        </section>
      </main>
      <p className="copyright">
        Copyright © 2023 Fleur de vie All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
