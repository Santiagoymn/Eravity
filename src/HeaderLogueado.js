import React from "react";
import Helmet from "react-helmet";
import './headerLogueadoStyle.css'


function HeaderLogueado( {navigation} ) {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Header no logueado</title>
            </Helmet>
            <header className="HeaderLogueado__header">
                <h1 className="HeaderLogueado__h1">Eravity</h1>

<<<<<<< HEAD
                <nav className="barraNavegacion">
                    <li className="apartadoBarraNavegacion" ><a>My subjects</a></li>
                    <li className="apartadoBarraNavegacion"><a>Contact Us</a></li>
                    <li className="apartadoBarraNavegacion"><a>Upload</a></li>
                    <li><a><img src="images/Imagen%201.png" className="imagenUpload"/></a></li>
                    <li className="apartadoBarraNavegacion"><a><img src="images/Imagen%202.png" className="imagenUsuario"/></a></li>
=======
                <nav class="HeaderLogueado__barraNavegacion">
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a>My subjects</a></li>
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a>Contact Us</a></li>
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a>Upload</a></li>
                    <li><a><img src="images/Imagen%201.png" className="HeaderLogueado__imagenUpload"/></a></li>
                    <li className="HeaderLogueado__apartadoBarraNavegacion"><a><img src="images/Imagen%202.png" className="HeaderLogueado__imagenUsuario"/></a></li>
>>>>>>> searchDegree
                </nav>
            </header>
        </div>
    )
}

export default HeaderLogueado
