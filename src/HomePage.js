import Helmet from "react-helmet";
import React, { useEffect, useState } from 'react'
import './homePageStyle.css'
import { collection, getDocs, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "./firebase";


function HomePage() {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [universities, setUniversities] = useState([]);
    var universitiesOrdered = [];



    const filtrar = () => {
        universitiesOrdered = [];
        const text = searchInput.toLowerCase();

        for (let university of universities) {
            console.log(university)
            if (university.data.name.toLowerCase().indexOf(text) !== -1) {
                universitiesOrdered.push(university);
            }


        }
        setSearchResults(universitiesOrdered);




    }


    useEffect(() => {
        getDocs(query(collection(db, "universities"), orderBy("name"))).then((querySnapshot) => {
            setUniversities(querySnapshot.docs.map(doc => ({
                data: doc.data()
            })));
        }).then(() => {
            setSearchResults(universities);
        });

    }, [])





    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <title>Eravity</title>
            </Helmet>
            <div className="HomePage__homePage">
                <div className="HomePage__buscador">
                    <div className="HomePage__field" id="HomePage__searchform">
                        <input type="text" value={searchInput} onClick={filtrar} onChange={e => { setSearchInput(e.target.value); filtrar() }} id="HomePage__searchterm" placeholder="Search..." className="HomePage__inputBuscador" />
                        <button type="button" id="HomePage__search"><img src="images/lupa.png" className="HomePage__lupaBuscador" alt="Lupa buscador" /></button>
                    </div>
                </div>

                <div id="HomePage__universidades">

                    {searchResults.map(({ data: { name, country } }) => (
                        <div className="HomePage__universidadOrigen">
                            <img src="https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className="HomePage__imagenUniversidad" />
                            <div className="HomePage__textoEncimaImagen">
                                <p className="HomePage__textoUniversidad">{name}</p>
                                <p className="HomePage__textoPais">{country}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );

}

export default HomePage

