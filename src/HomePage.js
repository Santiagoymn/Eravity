import Helmet from "react-helmet";
import React from 'react'
import Footer from "./Footer";
import HeaderNoLogueado from "./HeaderNoLogueado";

function HomePage( {navigation}) {
  return (
    <div>
    <Helmet>
        <meta charset="UTF-8" />
        <title>Eravity</title>
    </Helmet>

    <HeaderNoLogueado/>
            <div className="HomePage__homePage">
                <div className="HomePage__buscador">
                    <div className="HomePage__field" id="HomePage__searchform">
                        <input type="text" id="HomePage__searchterm" placeholder="Search..." className="HomePage__inputBuscador"/>
                        <button type="button" id="HomePage__search"><img src="images/lupa.png" className="HomePage__lupaBuscador" alt="Lupa buscador"/></button>
                    </div>
                </div>

                <div className="HomePage__universidades">
                    <div className="HomePage__universidadOrigen">
                        <img src="https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className="HomePage__imagenUniversidad"/>
                        <div className="HomePage__textoEncimaImagen">
                            <p className="HomePage__textoUniversidad">University</p>
                            <p className="HomePage__textoPais">Country</p>
                        </div>
                    </div>

                    <div className="HomePage__universidadDestino">
                        <img src="https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className="HomePage__imagenUniversidad"/>
                        <div className="HomePage__textoEncimaImagen">
                            <p className="HomePage__textoUniversidad">University</p>
                            <p className="HomePage__textoPais">Country</p>
                        </div>
                    </div>
                </div>
            </div>

    <Footer/>
    </div>


  )
}

export default HomePage

