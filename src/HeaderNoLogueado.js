import React from "react";
import Helmet from "react-helmet";

function HeaderNoLogueado( {navigation} ){
    return(
        <div>
        <Helmet>
            <meta charset="UTF-8"/>
            <title>Header no logueado</title>
        </Helmet>
        <header>
            <h1>Eravity</h1>
            <nav class="barraNavegacion">
                <li class="apartadoBarraNavegacion"><a>About Us</a></li>
                <li class="apartadoLoginRegister"><a>Login/Register</a></li>
            </nav>
        </header>
        </div>
    )
}

export default HeaderNoLogueado