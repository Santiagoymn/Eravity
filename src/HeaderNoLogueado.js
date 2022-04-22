import React from "react";
import Helmet from "react-helmet";
import './headerNoLogueadoStyle.css'


function HeaderNoLogueado( {navigation} ){
    return(
        <div>
        <Helmet>
            <meta charset="UTF-8"/>
            <title>Header no logueado</title>
        </Helmet>
        <header>
            <h1>Eravity</h1>
            <nav className="barraNavegacion">
                <li className="apartadoBarraNavegacion" ><a>About Us</a></li>
                <li className="apartadoLoginRegister" onClick={() => navigation.navigate('Register')}><a>Login/Register</a></li>
            </nav>
        </header>
        </div>
    )
}

export default HeaderNoLogueado