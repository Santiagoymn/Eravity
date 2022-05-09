import Helmet from "react-helmet";
import React, { useEffect, useState } from 'react'
import './homePageStyle.css'
import { collection, getDocs, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import lupa from "./assets/images/lupa.png";
import HeaderLogueado from './HeaderLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { checkIfLogged } from "./Utilities";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";



function HomePage() {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [universities, setUniversities] = useState([]);
    var universitiesOrdered = [];



    const filtrar = async() => {
        await getUniversities();
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

    const getUniversities = async() => {
        getDocs(query(collection(db, "universities"), orderBy("name"))).then((querySnapshot) => {
            setUniversities(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        }).then(() => {
            setSearchResults(universities);
            
        });

    }



    const dispatch = useDispatch();
    const user = useSelector(selectUser);

  // check at page load if a user is authenticated
  useEffect(() => {
    checkIfLogged(dispatch);
    
  }, []);
  useEffect(() => {
    getUniversities();
    filtrar();
  }, []);


    return (

        <div>

            <Helmet>
                <meta charset="UTF-8" />
                <title>Eravity</title>
            </Helmet>
            {(() => {

                /*{ dispatch(logout()) }*/
                if (user) {
                    return (
                        <HeaderLogueado></HeaderLogueado>
                    )
                } else {
                    return (
                        <HeaderNoLogueado></HeaderNoLogueado>
                    )
                }
            })()}

            <div className="HomePage__homePage">
                <div className="HomePage__buscador">
                    <div className="HomePage__field" id="HomePage__searchform">
                        <input type="text" value={searchInput} onClick={filtrar} onChange={e => { setSearchInput(e.target.value); filtrar() }} id="HomePage__searchterm" placeholder="Search..." className="HomePage__inputBuscador" />
                        <button type="button" id="HomePage__search" onClick={filtrar}><img src={lupa} className="HomePage__lupaBuscador" alt="Lupa buscador" /></button>
                    </div>
                </div>

                <div id="HomePage__universidades">

                    {searchResults.map(({ id, data: { name, country } }) => (
                        <div className="HomePage__universidadOrigen"><Link to={`/UniversityProfile/${id}`} >
                            <img src="https://recasens.com/wp-content/uploads/2017/02/r_095_pvc_1.jpg" className="HomePage__imagenUniversidad" />
                            <div className="HomePage__textoEncimaImagen">
                                <p className="HomePage__textoUniversidad">{name}</p>
                                <p className="HomePage__textoPais">{country}</p>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {(() => {
                    if (searchResults.length == 0) {
                        return (
                            <div id="degree-not-found-msg">
                                <p>University not found, please <Link to="/UploadUniversityForm">fill</Link> this form to add the university needed</p>
                            </div>
                        )
                    }
                    else {

                    }
                })()}
            </div>
            <Footer></Footer>
        </div>

    );

}

export default HomePage

