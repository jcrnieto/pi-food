import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitle } from "../actions";
import './SearchBar.css';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [title, setTitle] = useState("")

    function handleInput(e){
      e.preventDefault();
      setTitle(e.target.value)
      
     // console.log(title)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getTitle(title))
        document.getElementById("search").value = "";
    }
 
   return(
      
      <div className='container-input'>
         <input
         type='text'
         placeholder="Buscar..."
         onChange={(e)=>handleInput(e)}
         className='input-busqueda'
         id='search'
         />
         <button className="boton-busqueda" type='submit' onClick={(e)=>handleSubmit(e)}>Buscar</button>
      </div> 
   )
}