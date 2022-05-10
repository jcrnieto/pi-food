import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1 className="titulos bienvenido">Bienvenidos a mi página</h1>
            <Link to={'/home'}>
                <button className="botones-simples">Ingresar</button>
            </Link>
        </div>
    )
}