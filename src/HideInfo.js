import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from "react-router-dom";
import './HideInfo.css';

function HideInfo() {

    return (
        <div className='HideInfo__notLoggedInContainer'>
            <p className='HideInfo__notLoggedInText'>You must be signed in to access the degrees of the universities</p>
            <div className='HideInfo__buttonContainer'>
                <Link to="/Login"><input type="submit" value="Sign In" className="HideInfo__buttonAccept" /></Link>
                <Link to="/Register"><input type="submit" value="Sign Up" className="HideInfo__buttonAccept" /></Link>
            </div>
        </div >
    )

}

export default HideInfo;