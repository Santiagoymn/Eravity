import Helmet from "react-helmet";
import React from 'react'
import './homePage.css'

function HomePage( {navigation}) {
  return (
    <div>
    <Helmet>
        <meta charset="UTF-8" />
        <title>Eravity</title>

        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
        <link rel="stylesheet" href="../css/homePageStyle.css" type="text/css"/>

    </Helmet>
            <div className="homePage">
                <div className="buscador">
                    <div className="field" id="searchform">
                        <input type="text" id="searchterm" placeholder="Search..." className="inputBuscador"/>
                        <button type="button" id="search"><img src="images/lupa.png" className="lupaBuscador" alt="Lupa buscador"/></button>
                    </div>
                    <script className="cssdeck" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
                </div>

                <div className="universidades">
                    <div className="universidadOrigen">
                        <img src="https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className="imagenUniversidad"/>
                        <div className="textoEncimaImagen">
                            <p className="textoUniversidad">University</p>
                            <p className="textoPais">Country</p>
                        </div>
                    </div>

                    <div className="universidadDestino">
                        <img src="https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className="imagenUniversidad"/>
                        <div className="textoEncimaImagen">
                            <p className="textoUniversidad">University</p>
                            <p className="textoPais">Country</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>

  )
}

export default HomePage

