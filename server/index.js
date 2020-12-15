const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */



app.get('/recipestags/:tags', routes.getRelevantTags);
app.get('/recipes/:items/:rownum', routes.getRelevantRecipes);

app.get('/recipeinfo/:recipeid', routes.getRecipeInfo);

app.get('/recipereviews/:recipeid/:rownum', routes.getRecipeReviews);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});