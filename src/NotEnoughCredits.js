import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './HideInfo.css';

function NotEnoughCredits() {
    return (
        <div className='HideInfo__notLoggedInContainer'>
            <p className='HideInfo__notLoggedInText' >You can't access this page because you don't have credits enough.</p>

            <p>Please, go to <Link to={'/UploadDegreeForm'} >Upload Page</Link> to upload educational programs and get credits</p>
        </div>
    )
}


export default NotEnoughCredits;