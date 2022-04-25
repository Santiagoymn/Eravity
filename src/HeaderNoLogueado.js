import React from "react";
import Helmet from "react-helmet";
import './headerNoLogueadoStyle.css';
import { useNavigate } from "react-router-dom";


function HeaderNoLogueado() {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Header no logueado</title>
            </Helmet>
            <header className="HeaderNoLogueado__header">
                <h1 className="HeaderNoLogueado__h1">Eravity</h1>

                <nav className="HeaderNoLogueado__barraNavegacion">
                    <li className="HeaderNoLogueado__apartadoBarraNavegacion"><a>About Us</a></li>
                    <li className="HeaderNoLogueado__apartadoLoginRegister"><a>Login/Register</a></li>
                </nav>
            </header>
        </div >
    )
}

export default HeaderNoLogueado