import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './headerNoLogueadoStyle.css';


function HeaderNoLogueado() {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Header no logueado</title>
            </Helmet>
            <header className="HeaderNoLogueado__header">
                <h1 ><Link to="/" className="HeaderNoLogueado__h1">Eravity</Link></h1>

                <nav className="HeaderNoLogueado__barraNavegacion">
                    <li><Link to="/AboutUs" className="HeaderNoLogueado__apartadoBarraNavegacion">About Us</Link></li>
                    <li><Link to="/Login" className="HeaderNoLogueado__apartadoLoginRegister">Login/Register</Link></li>
                </nav>
            </header>
        </div >
    )
}

export default HeaderNoLogueado