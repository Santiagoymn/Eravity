import React from "react";
import Helmet from "react-helmet";
import './footerStyle.css';


function Footer( {navigation} ){
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8"/>
                <title>Footer</title>
            </Helmet>
            <footer>
                <span className="logosRedesSociales">
                    <a title="Facebook" href="https://www.facebook.com/"><img src="images/facebook.png" className="logoFacebook" alt="Logo Facebook"/></a>
                    <a title="Instagram" href="https://www.instagram.com/"><img src="images/instagram.png" className="logoInstagram" alt="Logo Instagram"/></a>
                    <a title="Twitter" href="https://twitter.com/"><img src="images/twitter.png" className="logoTwitter" alt="Logo Twitter"/></a>
                </span>
            </footer>
        </div>
    )
}

export default Footer