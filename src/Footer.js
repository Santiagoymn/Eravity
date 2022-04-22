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
                <span class="logosRedesSociales">
                    <a title="Facebook" href="https://www.facebook.com/"><img src="images/facebook.png" class="logoFacebook" alt="Logo Facebook"/></a>
                    <a title="Instagram" href="https://www.instagram.com/"><img src="images/instagram.png" class="logoInstagram" alt="Logo Instagram"/></a>
                    <a title="Twitter" href="https://twitter.com/"><img src="images/twitter.png" class="logoTwitter" alt="Logo Twitter"/></a>
                </span>
            </footer>
        </div>
    )
}

export default Footer