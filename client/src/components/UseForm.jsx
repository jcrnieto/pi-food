import { useState } from "react";
import { postRecipe, getRecipes } from "../actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UseForm = (initialInput, validateInput) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState(initialInput); 
  const [errors, setErrors] = useState({}); 
 
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
     
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateInput(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInput(input));
    if (Object.keys(errors).length === 0) {
      alert("Formulario creado con exito!");
      dispatch(postRecipe(input));
      dispatch(getRecipes())
      navigate("/home");
      
    } else {
      return;
    }
  };

  const handleDiets = (e) => {
   // console.log(input.diets)
    if(input.diets.length === 0){
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }else{
      let encontrado = false;
    for(let i=0; i< input.diets.length; i++){
         if(input.diets[i]===e.target.value){
             encontrado = true
         } 
      }
    if(!encontrado){
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }
   
  };

  const handleDelete = (el) => {
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== el),
    });
  };

  return {
    input,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleDiets,
    handleDelete,
  };
};
