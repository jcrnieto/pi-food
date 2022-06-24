import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiet } from "../actions";
import "./PostCreate.css";
import { UseForm } from "./UseForm";

const initialInput = {
  title: "",
  summary: "",
  spoonacularScore: "",
  healthScore: "",
  analyzedInstructions: "",
  diets: [],
};

const validationsInput = (input) => {
  let errors = {};
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexNumber = /^[0-9]+$/;
  const regexCaracter = /^.{1,255}$/;

  if (!input.title.trim()) {
    errors.title = "El campo título es requerido";
  } else if (!regexName.test(input.title.trim())) {
    errors.title = "El campo título acepta solo palabras";
  }

  if (!input.summary.trim()) {
    errors.summary = "El campo resumen del plato es requerido";
  } else if (!regexName.test(input.summary.trim())) {
    errors.summary = "El campo resumen del plato acepta solo palabras";
  }

  if (!input.spoonacularScore.trim()) {
    errors.spoonacularScore = "El campo puntuación es requerido";
  } else if (!regexNumber.test(input.spoonacularScore.trim())) {
    errors.spoonacularScore = "El campo puntuación acepta solo números";
  }

  if (!input.healthScore.trim()) {
    errors.healthScore = "El campo nivel de comida saludable es requerido";
  } else if (!regexNumber.test(input.healthScore.trim())) {
    errors.healthScore =
      "El campo nivel de comida saludable acepta solo números";
  }

  if (!input.analyzedInstructions.trim()) {
    errors.analyzedInstructions = "El campo paso a paso es requerido";
  } else if (!regexCaracter.test(input.analyzedInstructions.trim())) {
    errors.analyzedInstructions = "El campo paso a paso no debe exceder los 255 caracteres";
  }
  return errors;
};

export default function PostCreate() {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.types);
  const {
    input,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleDiets,
    handleDelete,
  } = UseForm(initialInput, validationsInput);

  useEffect(() => {
    dispatch(getDiet());
  }, [dispatch]);
  return (
    <div className='container-post'>
      <h1>Crea tu propia receta</h1>
      <form className="form-post-create" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <label className="form-column form-column-label align-left">
            Título
          </label>
          <input
            className="form-column form-column-input"
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
        </div>
        {errors.title && (
          <div className="form-error-row">
            <label className="form-column form-column-label align-left"></label>
            <label className="form-column form-column-error align-left">
              {errors.title}
            </label>
          </div>
        )}
        <div className="form-row">
          <label className="form-column form-column-label align-left">
            Resumen del plato
          </label>
          <input
            className="form-column form-column-input"
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
        </div>
        {errors.summary && (
          <div className="form-error-row">
            <label className="form-column form-column-label align-left"></label>
            <label className="form-column form-column-error align-left">
              {errors.summary}
            </label>
          </div>
        )}
        <div className="form-row">
          <label className="form-column form-column-label align-left">
            Puntuación
          </label>
          <input
            className="form-column form-column-input"
            type="text"
            maxLength="2"
            value={input.spoonacularScore}
            name="spoonacularScore"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
        </div>
        {errors.spoonacularScore && (
          <div className="form-error-row">
            <label className="form-column form-column-label align-left"></label>
            <label className="form-column form-column-error align-left">
              {errors.spoonacularScore}
            </label>
          </div>
        )}
        <div className="form-row">
          <label className="form-column form-column-label align-left">
            Nivel de comida saludable
          </label>
          <input
            className="form-column form-column-input"
            type="text"
            maxLength="2"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
        </div>
        {errors.healthScore && (
          <div className="form-error-row">
            <label className="form-column form-column-label align-left"></label>
            <label className="form-column form-column-error align-left">
              {errors.healthScore}
            </label>
          </div>
        )}
        <div className="form-row">
          <label className="form-column form-column-label align-left">
            Paso a Paso
          </label>
          <textarea
            className="form-column form-column-input"
            cols='50'
            rows='5'
            type="text"
            value={input.analyzedInstructions}
            name="analyzedInstructions"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          ></textarea>
        </div>
        {errors.analyzedInstructions && (
          <div className="form-error-row">
            <label className="form-column form-column-label align-left"></label>
            <label className="form-column form-column-error align-left">
              {errors.analyzedInstructions}
            </label>
          </div>
        )}
        <div className="form-row">
          <label className="form-column form-column-label align-left">
            Dietas
          </label>
          <select
            className="form-column form-column-input"
            onChange={(e) => handleDiets(e)}
          >
            {allDiets?.map((el) => (
              <option key={el.id}>{el.name}</option>
            ))}
          </select>
        </div>
        {input.diets?.length > 0 ? (
          <div className="form-diet-container">
            {input.diets?.map((el, index) => (
              <div className="form-diet-included" key={index}>
               <p>{el}</p>
               
                <button className="form-diet-delete" onClick={() => handleDelete(el)}>x</button>
              </div>
            ))}
          </div>
        ) : null}
        <div className="form-row-buttons">
          <div className="form-column-buttons">
            <Link to="/home">
              <button className="botones-simples">Volver a Home</button>
            </Link>
          </div>
          <div className="form-column-buttons">
            <button className="botones-guardar" type="submit">
              Crea tu propia receta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
