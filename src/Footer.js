import React from "react";
import Helmet from "react-helmet";
import './footerStyle.css';
import facebookLogo from "./assets/images/facebook.png"
import instagramLogo from "./assets/images/instagram.png"
import twitterLogo from "./assets/images/twitter.png"


function Footer( {} ){
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8"/>
            </Helmet>
            <footer className="Footer__footer">
                <span className="Footer__logosRedesSociales">
                    <a title="Facebook" href="https://www.facebook.com/"><img src={facebookLogo} className="Footer__logoFacebook" alt="Logo Facebook"/></a>
                    <a title="Instagram" href="https://www.instagram.com/"><img src={instagramLogo} className="Footer__logoInstagram" alt="Logo Instagram"/></a>
                    <a title="Twitter" href="https://twitter.com/"><img src={twitterLogo} className="Footer__logoTwitter" alt="Logo Twitter"/></a>
                </span>
            </footer>
        </div>
    )
}

export default Footer