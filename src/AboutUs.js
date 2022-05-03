import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import HeaderNoLogueado from './HeaderNoLogueado';
import Footer from './Footer';
import './aboutUs.css';

function AboutUs() {

    return(
        
        <body>
	        <main class="main-container">
	
                <div id="up">
			        <h1 class="subtitle">ABOUT US</h1>
			        <p class="paragraph">Lorem ipsum dolor sit amet. Ut tempora soluta ab tempora perferendis et consequatur doloremque est quis dolorem sit unde quae. Eos autem voluptatem ad tenetur odit aut facilis facere eum earum reprehenderit. Et voluptatem voluptatibus sed incidunt obcaecati sed laborum explicabo eos facere internos quo obcaecati earum. Eum consectetur delectus et dignissimos optio ab dolorem dolorem.</p>
			        <h1 class="subtitle">OUR MISSION</h1>
			        <p class="paragraph">Lorem ipsum dolor sit amet. Ut tempora soluta ab tempora perferendis et consequatur doloremque est quis dolorem sit unde quae. Eos autem voluptatem ad tenetur odit aut facilis facere eum earum reprehenderit.</p>
		        </div>
		
		        <div id="down">
			        <div class="column">
				        <div class="row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="paragraph">Name Surname</p>
				        </div>
				        <div class="row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="paragraph">Name Surname</p>
				        </div>
			        </div>
			        <div class="column" id="middle">
				        <div class="row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="paragraph">Name Surname</p>
				        </div>
				        <div class="row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="paragraph">Name Surname</p>
				        </div>
			        </div>
			        <div class="column">
				        <div class="row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="paragraph">Name Surname</p>
				        </div>
				        <div class="row">
					        <img src="images/imagenUsuario.png"/>
					        <p class="paragraph">Name Surname</p>
				        </div>
			        </div>
		        </div>
            </main>
	    </body>
    )
}

