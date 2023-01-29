import React from "react";
import {Link} from "react-router-dom";

import './ErrorPage.scss'

function ErrorPage() {
    return (
        <div className="error__container">
            <div className='error__link-wrapper'>
                <Link className="error__link" to="/Sportradar_task"><button className='error__link-button'>Return to home page</button></Link>
            </div>
            <h1>ERROR! Page not found!</h1>
        </div>
    );
}

export default ErrorPage;
