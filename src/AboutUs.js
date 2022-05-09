import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import './aboutUs.css';
import { useDispatch, useSelector } from 'react-redux';
import { checkIfLogged } from './Utilities';
import HeaderLogueado from './HeaderLogueado';
import { selectUser } from './features/userSlice';
import Helmet from 'react-helmet';

function AboutUs() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

  // check at page load if a user is authenticated
  useEffect(() => {
    checkIfLogged(dispatch);
    
  }, []);

    return(
        <body>
            <Helmet>
            	<meta charset="UTF-8"/>
            	<title>AboutUs Page</title>
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
	        <main class="aboutUs__main-container">
	
                <div id="aboutUs__up">
			        <h1 class="aboutUs__subtitle">ABOUT US</h1>
			        <p class="aboutUs__paragraph">Lorem ipsum dolor sit amet. Ut tempora soluta ab tempora perferendis et consequatur doloremque est quis dolorem sit unde quae. Eos autem voluptatem ad tenetur odit aut facilis facere eum earum reprehenderit. Et voluptatem voluptatibus sed incidunt obcaecati sed laborum explicabo eos facere internos quo obcaecati earum. Eum consectetur delectus et dignissimos optio ab dolorem dolorem.</p>
			        <h1 class="aboutUs__subtitle">OUR MISSION</h1>
			        <p class="aboutUs__paragraph">Lorem ipsum dolor sit amet. Ut tempora soluta ab tempora perferendis et consequatur doloremque est quis dolorem sit unde quae. Eos autem voluptatem ad tenetur odit aut facilis facere eum earum reprehenderit.</p>
		        </div>
		
		        <div id="aboutUs__down">
			        <div class="aboutUs__column">
				        <div class="aboutUs__row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="aboutUs__paragraph">Name Surname</p>
				        </div>
				        <div class="aboutUs__row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="aboutUs__paragraph">Name Surname</p>
				        </div>
			        </div>
			        <div class="aboutUs__column" id="aboutUs__middle">
				        <div class="aboutUs__row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="aboutUs__paragraph">Name Surname</p>
				        </div>
				        <div class="aboutUs__row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="aboutUs__paragraph">Name Surname</p>
				        </div>
			        </div>
			        <div class="aboutUs__column">
				        <div class="aboutUs__row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="aboutUs__paragraph">Name Surname</p>
				        </div>
				        <div class="aboutUs__row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="aboutUs__paragraph">Name Surname</p>
				        </div>
			        </div>
		        </div>
            </main>
            <Footer/>
	    </body>
    )
}

export default AboutUs;