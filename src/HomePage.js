import Helmet from "react-helmet";
import React, { useEffect, useState } from 'react'
import './homePageStyle.css'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
var degrees = [];
getDocs(query(collection(db, "universities"), orderBy("name"))).then((querySnapshot) => {
    degrees = querySnapshot.docs;
});

const formulario = document.querySelector('#HomePage__searchterm');

const result = document.querySelector('.HomePage__universidades');

const filtrar = () => {
    result.innerHTML = '';
    const text = formulario.value.toLowerCase();
    for (let degree of degrees) {
        let name = degree.name.toLowerCase();
        if (name.indexOf(text) !== -1) {
            result.innerHTML += '<div className="HomePage__universidadOrigen">' +
                '< img src = "https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className = "HomePage__imagenUniversidad" />' +
                ' <div className="HomePage__textoEncimaImagen">' +
                '<p className="HomePage__textoUniversidad">University</p>' +
                '<p className="HomePage__textoPais">Country</p>' +
                '</div>' +
                '</div >';
        }
    }

    if (result.innerHTML === '') {
        result.innerHTML += '<div id="degree-not-found-msg"><p>Degree not found, please <a href="#">fill</a> this form to add the degree needed</p></div>';
    }
}

function HomePage() {
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        formulario.addEventListener('keyup', filtrar);
    }, []);
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Eravity</title>
            </Helmet>
            <div className="HomePage__homePage">
                <div className="HomePage__buscador">
                    <div className="HomePage__field" id="HomePage__searchform">
                        <input type="text" id="HomePage__searchterm" placeholder="Search..." className="HomePage__inputBuscador" />
                        <button type="button" id="HomePage__search"><img src="images/lupa.png" className="HomePage__lupaBuscador" alt="Lupa buscador" /></button>
                    </div>
                </div>

                <div className="HomePage__universidades">

                </div>
            </div>
        </div>

    );

}

export default HomePage

