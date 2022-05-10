

const initialState = {
   recipes:[],
   recipe:[],
   types:[],
   recipes1:[],
   detail:[]
}

function rootReducer (state = initialState, action) {
   switch(action.type){
       case 'GET_RECIPES':
           return {
               ...state,
               recipes: action.payload,
               recipes1: action.payload
           }
       case 'GET_ID':
         
           return {
               ...state,
               detail: action.payload
           }
        case 'GET_TITLE':
            return {
                ...state,
                recipes: action.payload
            }
        case 'ORDER_ALFABETIC':
            let orderName = action.payload === "asc" ? 
            state.recipes.sort(function (x, y) {
                  return x.title.localeCompare(y.title);
                })
              : state.recipes.sort(function (x, y) {
                  return y.title.localeCompare(x.title);
                });
            return{
                ...state,
                recipe: orderName 
            }
            
        case 'ORDER_SPOONACULAR_SCORE':
         
            let arrayScore = action.payload === 'asc1'?
            state.recipes.sort(function(a,b){
               
                if(a.spoonacularScore > b.spoonacularScore)
                {
                 return 1
                }
                if(b.spoonacularScore > a.spoonacularScore)
                {
                 return -1
                }  
             return 0;
            }):
            state.recipes.sort(function(a,b){
                if(a.spoonacularScore > b.spoonacularScore) 
                {
                return -1
                }
                if(b.spoonacularScore > a.spoonacularScore)
                {
                 return 1
                }  
                return 0;
                })
            // console.log('estoy en array score',arrayScore)
            return{
                ...state,
                recipes: arrayScore
            }
        case 'FILTER_BY_DIET':
            state.recipes = [...state.recipes1]
           // let allType = state.recipes?.filter((el)=>el.diet?  el.diet.includes(action.payload) : el.diets.find((e)=>e.name===action.payload))
           let allType = state.recipes?.filter((el)=>el.diet?  el.diet.includes(action.payload) : el.diets.includes(action.payload));
             
            return{
                ...state,
                 recipes : allType
              }
              
        case 'GET_DIET':
            return{
               ...state,
               types: action.payload
            }
        case 'POST_RECIPE':
            return{
                ...state
            } 

       default:
           return state;
   }
}

export default rootReducer;