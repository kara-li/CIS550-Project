// load secrets into envrionment variables
const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

const bodyParser = require("body-parser");
const express = require("express");
var routes = require("./routes.js");
const cors = require("cors");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

app.get("/recipes/:items/:rownum", routes.getRelevantRecipes);

app.get("/recipeinfo/:recipeid", routes.getRecipeInfo);

app.get('/recipestags/:tags', routes.getRelevantTags);
app.get('/recipes/:items/:query/:type/:sort/:rownum', routes.getRelevantRecipes);

app.get('/recipeinfo/:recipeid', routes.getRecipeInfo);

app.get('/ingredientcals/:recipeid', routes.getIngredientCals);

app.get('/recipesteps/:recipeid', routes.getRecipeSteps);

app.get('/recipereviews/:recipeid/:rownum', routes.getRecipeReviews);

app.get("/recipepicture/:recipename", routes.getRecipePicture);

app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});
