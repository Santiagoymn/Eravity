import Helmet from "react-helmet";
import React, { useEffect, useState } from 'react'
import './homePageStyle.css'
import { collection, getDocs, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import lupa from "./assets/images/lupa.png";
import userSlice from './features/userSlice';
import HeaderLogueado from './HeaderLogueado';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';



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


    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // check at page load if a user is authenticated
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                // user is logged in, send the user's details to redux, store the current user in the state
                dispatch(
                    login({
                        email: userAuth.email,
                        uid: userAuth.uid,
                        displayName: userAuth.displayName,
                        photoUrl: userAuth.photoURL,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
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
                        <button type="button" id="HomePage__search"><img src={lupa} className="HomePage__lupaBuscador" alt="Lupa buscador" /></button>
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

                {(() => {
                    if (searchResults.length == 0) {
                        return (
                            <div id="degree-not-found-msg">
                                <p>University not found, please <a href="#">fill</a> this form to add the university needed</p>
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

