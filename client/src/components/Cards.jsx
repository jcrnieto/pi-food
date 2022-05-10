import React from 'react';
import imageDefault from "../images/imagen-default.jpg"

export default function Cards({imagen, title, diet, spoonacularScore}){   
    return(
        <div>
            <img className="imagen-receta" src={(imagen) ? imagen : imageDefault} alt= 'receta'/>
            <h3 className="title-receta">{title}</h3>
            <h4 className="diet-receta">{diet}</h4>
            <h6 className="spoonacularScore-receta">{spoonacularScore}</h6>
        </div>
    )
}