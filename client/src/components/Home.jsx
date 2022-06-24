import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  orderAlfabetic,
  orderSpoonacularScore,
  getDiet,
  filterByDiet,
} from "../actions";
import Cards from "./Cards";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const allTypes = useSelector((state) => state.types);
  //console.log('types useselector', allTypes)
  const [orden, setOrden] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [recetasPorPagina, setRecetasPorPagina] = useState(4);
  const ultimaReceta = paginaActual * recetasPorPagina;
  const primerReceta = ultimaReceta - recetasPorPagina;
  const recetasActuales = allRecipes.slice(primerReceta, ultimaReceta);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiet());
  }, [dispatch]);

  const paginacion = (pageNumber) => {
     setPaginaActual(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleOrderAlfabetic(e) {
    e.preventDefault();
    dispatch(orderAlfabetic(e.target.value));
    setPaginaActual(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  function handleOrderScore(e) {
    e.preventDefault();
    dispatch(orderSpoonacularScore(e.target.value));
    setPaginaActual(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  function handleFilterDiet(e) {
    e.preventDefault();
    //console.log(e.target.value)
    dispatch(filterByDiet(e.target.value));
    setPaginaActual(1);
    setOrden(`ordenado ${e.target.value}`);
  }

  return (
    <div className="container-general">
      <div className='container-nav'>
      <h1 className="titulos">Recetas Saludables</h1>
      <Link className="link-nueva-receta" to="/recipe">
        Crea tu propia receta
      </Link>
      <button className='boton-cargar-recetas' onClick={(e) => handleClick(e)}>Volver a cargar Recetas</button>
      <SearchBar />
      <select className='dietas' onChange={(e) => handleFilterDiet(e)}>
        {allTypes?.map((el) => (
          <option key={el.id} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      <select className='orden-alfabetico' onChange={(e) => handleOrderAlfabetic(e)}>
        <option value="asc">Orden alfabetico ascendente</option>
        <option value="desc">Orden alfabetico descendente</option>
      </select>
      <select className='orden-puntuacion' onChange={(e) => handleOrderScore(e)}>
        <option value="asc1">Orden puntuacion ascendente</option>
        <option value="desc1">Orden puntuacion descendente</option>
      </select>
      </div>

      <div className='container-cards'>
      <Paginado
        paginacion={paginacion}
        recetasPorPagina={recetasPorPagina}
        allRecipes={allRecipes.length}
      />
      <div className="cards-container">
        { recetasActuales.length > 0 ? (
          recetasActuales?.map((el) => {
          return (
            <div className="cards-item" key={el.id}>
              <Link className="link-receta" to={"/home/" + el.id}>
                <Cards
                  imagen={el.imagen ? el.imagen : el.image}
                  title={el.title}
                  diet={el.diet ? el.diet + ' ': el.diets.map((el) => el.name + ' ')}
                  // spoonacularScore= {el.spoonacularScore}
                  key={el.id}
                />
              </Link>
            </div>
          );
        })): <div><h1>No se encontró receta</h1></div>}
      </div>
      </div>
    </div>
  );
}
