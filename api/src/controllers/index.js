require ('dotenv').config();
const axios = require ('axios');
const {Recipe, Diet} = require ('../db.js');
const {API_KEY} = process.env;
//const recetas = require ('../../../data/recetas.json')
//console.log(API_KEY)
const getDbInfo = async () => {
   return await Recipe.findAll({
       include:{
           model: Diet,
           attributes: ['name'],
           through: {
               attributes:[],
           }
       }
   })
}

const getAllRecipes = async (req, res, next) => {
    const {title} = req.query
    try{
   const apiInfo= /*recetas; */await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)
   const infoGet = apiInfo.data.results.map(el=>{
  /* const infoGet = apiInfo.results.map(el=>{*/
       return{
           id: el.id,
           imagen: el.image,
           title: el.title,
           diet: el.diets.map(el=>el),
           spoonacularScore:el.spoonacularScore,
        }
   }) 
   //console.log('estoy en infoget', infoGet)
   const infoDb = await getDbInfo()
   const infoTotal = [...infoDb,...infoGet]
 
   if(title){
    const infoName = infoTotal.filter((el)=>el.title.toLowerCase().includes(title.toLowerCase()))
    infoName.length ?
    res.status(200).send(infoName) :
    res.status(400).send('no se encontro receta')
   }else{
    res.send(infoTotal)
   }
  }catch(error){
        next(error)
  }
}

const getIdRecipes = async (req, res, next) => {
    const {id} = req.params
    if(id.length > 8){
   
      let infoIdDb = await Recipe.findByPk(id,{include:[Diet]});
     
      let idDbTotal = [{
         id: infoIdDb.id,
         image: infoIdDb.image,
         title: infoIdDb.title,
         diets: infoIdDb.diets.map(el=>el.name),
         summary: infoIdDb.summary,
         spoonacularScore: infoIdDb.spoonacularScore,
         healthScore: infoIdDb.healthScore,
         analyzedInstructions: infoIdDb.analyzedInstructions,

     }]
     //console.log('estoy en infoid', idDbTotal)
     idDbTotal && res.send(idDbTotal)
     //fhfhdrgrgjfjdj
    }else{
    try{
    const apiInfo= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`) 
    const infoId= apiInfo.data.results.map(el=>{
  
        return{
            id: el.id,
            image: el.image,
            title: el.title,
            diets: el.diets.map(el=>el),
            summary: el.summary,
            spoonacularScore:el.spoonacularScore,
            healthScore: el.healthScore,
            analyzedInstructions: el.analyzedInstructions.map(el=>el.steps.map(el=>el.step))
        }
    })
    //console.log('estoy en infoid', infoId)
    if(id){
      const filtroId = infoId.filter(el=>el.id.toString()===id)
      filtroId.length ?
      res.status(200).send(filtroId):
      res.status(400).send('no se encontro receta')
      console.log('estoy en filtroid', filtroId)
    }
    
    }catch(error){
        next(error)
    } 
}
}

const getAllTypes = async (req, res, next) => {
  //const diet = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "pescatarian", "paleolithic", "primal","fodmap friendly", "whole 30", "ketogenic", "paleo"]
   const apiInfo =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)
   //console.log('estoy en apiinfo', apiInfo)
   const diets = apiInfo.data.results.map(el=>el.diets)
   const diet = diets.flat()
   const array = new Set(diet)
   dietsFinal = Array.from(array)
   //console.log('estoy en diets',dietsFinal)
   dietsFinal.forEach(el=>{
        Diet.findOrCreate({
            where :{ name : el}
        })
    })
    const allDiet = await Diet.findAll();
    console.log(allDiet)
    res.send(allDiet)
}

//fvufuydgdfkdddjkbfhdsdhgfjfhdghghd

const postCreateRecipe = async (req, res, next) => {
    let {
       image,
       title,
       summary,
       spoonacularScore,
       healthScore,
       analyzedInstructions,
       diets
    } = req.body;

    let recipeCreate = await Recipe.create({
       image, 
       title,
       summary,
       spoonacularScore,
       healthScore,
       analyzedInstructions,
    })
    let dietDb = await Diet.findAll({
        where: {name: diets}
    })

    recipeCreate.addDiet(dietDb);
    res.send('personaje creado con exito')
}


/*router.post( '/name', async (req,res) =>{
    let {name} = req.body
    try{
    let postName = await Diet.create({name})
    res.send(postName)
    }catch(error){
        console.log(error)
    }
})*/

module.exports = {
    getAllRecipes,
    getIdRecipes,
    getAllTypes,
    postCreateRecipe
}
