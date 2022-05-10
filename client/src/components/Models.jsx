import React from "react";
import imageDefault from "../images/imagen-default.jpg"
import { Link } from 'react-router-dom'
import "./models.css";

function Models({
  image,
  title,
  diets,
  summary,
  spoonacularScore,
  healthScore,
  analyzedInstructions,
}) {
  const dietsFinal= diets + ' ';
 
  return (
    <div className="detail-container">
      <div className="detail-summary-container">
        <h3 className="detail-title">{title}</h3>
        <img
          className="imagen-receta"
          src={image ? image : imageDefault}
          alt="receta"
        />
        {dietsFinal?.length > 0 ? (
          <>
            <div className="detail-step-container">
              <div className="detail-step-title">Dietas</div>
            </div>
            <div className="">
              <div className="detail-step">{dietsFinal}</div>
            </div>
          </>
        ) : null}
        <div className="">
          <div className="detail-step-title">Detalle</div>
        </div>
        <div
          className="detail-summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>
        <div className="detail-score-container">
          <div className="detail-score-title">Puntuación Spoonacular</div>
          <div className="detail-score-title">Puntuación de Salud</div>
        </div>
        <div className="detail-score-container">
          <div className="detail-score">{spoonacularScore}</div>
          <div className="detail-score">{healthScore}</div>
        </div>
        <div className="detail-step-container">
          <div className="detail-step-title">Paso a paso</div>
        </div>
        <div className="detail-pasoapaso">
          <div className="detail-step">{analyzedInstructions}</div>
        </div>
        <div className='div-botton-volver'><Link to={'/home'}><button className='boton-volver'>Volver a página principal</button></Link></div>
      </div>
      
    </div>
  );
}

export default Models;
