import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Footer from './Footer';
import HeaderLogueado from './HeaderLogueado';

function UploadSelectionPage() {
    return(
        
        <body>
            
            <main class="menu-container">
	
                <div id="options">
			        <div class="command"><p>Upload University</p></div>
			        <div class="command" id="middle"><p>Upload Degree</p></div>
			        <div class="command"><p>Upload Subject</p></div>
		        </div>
            </main>
	
        </body>
        
    )
}