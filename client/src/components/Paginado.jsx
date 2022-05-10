import React from "react";
import './Paginado.css';

export default function Paginado({recetasPorPagina, allRecipes, paginacion}){
   const pageNumbers = [];
  
   for(let i=0; i< Math.ceil(allRecipes/recetasPorPagina);i++){
       //console.log(recetasPorPagina)
       pageNumbers.push(i+1)
   }

   return(
       <nav>
           <ul className="paginado">
               {
                   pageNumbers?.map((el,index)=>(
                       <li className="number" key={index}>
                           <a id="paginador" href='#paginador' onClick={()=> paginacion(el)}>{el}</a>
                       </li>
                   ))
               }
           </ul>
       </nav>
   )
}