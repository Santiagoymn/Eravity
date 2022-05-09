import React from "react";
import Helmet from "react-helmet";
import './headerLogueadoStyle.css';
import cloudUpload from "./assets/images/cloudUpload.png";
import iconoLogin from "./assets/images/iconoLogin.png";
import { Link } from "react-router-dom";


function HeaderLogueado({ navigation }) {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
            </Helmet>
            <header className="HeaderLogueado__header">
                <h1 className="HeaderLogueado__h1"><Link to="/" class ="HeaderLink">Eravity</Link></h1>

                <nav className="HeaderLogueado__barraNavegacion">
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a>My subjects</a></li>
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a>Contact Us</a></li>
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a>Upload</a></li>
                    <li><a><img src={cloudUpload} className="HeaderLogueado__imagenUpload"/></a></li>
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><Link to="/UserProfile" ><img src={iconoLogin} className="HeaderLogueado__imagenUsuario"/></Link></li>
                </nav>
            </header>
        </div>
    )
}

export default HeaderLogueado
