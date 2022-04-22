import React from "react";
import Helmet from "react-helmet";
import './headerLogueadoStyle.css'


function HeaderLogueado( {navigation} ) {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Header no logueado</title>

                <link rel="stylesheet" href="../css/homePageLogueadoStyle.css" type="text/css"/>

            </Helmet>
            <header>
                <h1>Eravity</h1>

                <nav class="barraNavegacion">
                    <li class="apartadoBarraNavegacion"><a>My subjects</a></li>
                    <li class="apartadoBarraNavegacion"><a>Contact Us</a></li>
                    <li class="apartadoBarraNavegacion"><a>Upload</a></li>
                    <li><a><img src="images/Imagen%201.png" class="imagenUpload"/></a></li>
                    <li class="apartadoBarraNavegacion"><a><img src="images/Imagen%202.png" class="imagenUsuario"/></a></li>
                </nav>
            </header>
        </div>
    )
}

export default HeaderLogueado
