import axios from 'axios';
//http://localhost:3001
export function getRecipes(){
    return async function(dispatch){
    try{
   
       var json = await axios.get("/recipes");
      // console.log('actions', json.data)
       return dispatch({
           type: 'GET_RECIPES',
           payload: json.data
       });
    
}catch(error){
    console.log(error)
} 
}
}

export function getRecipeId(id){
    return async function(dispatch){
     try{
   
        var json = await axios.get(`/recipes/${id}`)
        return dispatch({
            type: 'GET_ID',
            payload: json.data[0]
        })
    
 } catch(error){
     console.log(error)
 }
}
}

export function getTitle(title){
    return async function(dispatch){
    try{
        var json = await axios.get("/recipes?title=" + title)
       // console.log('esto es searchbar', title)
        return dispatch({
            type: 'GET_TITLE',
            payload: json.data
        })
    
    
    }catch(error){
        console.log(error)
        return dispatch({
            type: 'GET_TITLE',
            payload:[]
        })
    } 
}  
}

export function orderAlfabetic(payload){
    return{
       type: 'ORDER_ALFABETIC',
       payload
    }
}

export function orderSpoonacularScore(payload){
    return{
       type: 'ORDER_SPOONACULAR_SCORE',
       payload
    }
}

export function getDiet(){
    return async function(dispatch){
    try{
        var json = await axios.get("/types")
        //console.log('types actions', json.data)
        return dispatch({
            type: 'GET_DIET',
            payload: json.data
        })
    
    
    }catch(error){
        console.log(error)
    } 
}   
}

export function filterByDiet(payload){
   // console.log('actions',payload)
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function postRecipe(payload){
    return async function(dispatch){
    try{
          var json = await axios.post("/recipe", payload)
          return json.data
      
    }catch(error){
        console.log(error)
    }
}
}

