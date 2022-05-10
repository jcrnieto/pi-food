const { Router } = require('express');
const { getAllRecipes, getIdRecipes, getAllTypes, postCreateRecipe } = require ('../controllers/index.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', getAllRecipes)

router.get('/recipes/:id', getIdRecipes)

router.get('/types', getAllTypes)

router.post('/recipe', postCreateRecipe)


module.exports = router;
