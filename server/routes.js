var config = require('./db-config.js');
const oracledb = require('oracledb');
//oracledb.initOracleClient({libDir: '/Users/chaimfishman/instantclient_19_8'});
try {
    oracledb.initOracleClient({libDir: '/Users/nealea/Downloads/instantclient_19_8'});
} catch (err) {
    console.error(err);
    process.exit(1);
}

const https = require("https");

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

async function getRelevantTags(req, res) {
    var tagPre = req.params.tags;
    console.log(tagPre);
    tagPre = `'${tagPre}%'`;
    var query = `SELECT DISTINCT tag FROM RECIPE_TAG WHERE tag LIKE ${tagPre}`
    console.log(query)
    var connection = await oracledb.getConnection(config);
    const result = await connection.execute(query);
    console.log(result.rows)
    res.json(result.rows);
}

async function getRelevantRecipes(req, res) {
    var foodItems = req.params.items;
    var rowNumStart = parseInt(req.params.rownum);
    var batchSize = 20;
    console.log(foodItems)
    foodItems = foodItems.split(',').join( `\', \'`);
    console.log(`batchSize is ${batchSize}`)
    //foodItems = foodItems.replaceAll(',', `\', \'`);
    foodItems = `'${foodItems}'`;
    console.log("searching for recipes with following foods: " + foodItems);
  var query = `
        WITH food_ids_of_listed_foods AS(
            SELECT ingredient_id 
            FROM Food
            WHERE description IN (${foodItems})
        ),
        query_recipe_ids AS (
            SELECT recipe_id
            FROM Recipe_Ingredient_Map m
            WHERE ingredient_id IN (SELECT * FROM food_ids_of_listed_foods)
            GROUP BY recipe_id
            HAVING COUNT(*) >= ${foodItems.split(",").length}
        ) SELECT id, name, minutes, n_steps, n_ingredients, n_reviews, avg_rating, ROWNUM AS rnum FROM (
            SELECT id, name, minutes, n_steps, n_ingredients, n_reviews, avg_rating, ROWNUM AS rnum 
            FROM Recipe r1 JOIN query_recipe_ids r2 ON r1.id = r2.recipe_id ORDER BY id
        ) WHERE rnum BETWEEN ${rowNumStart} AND ${rowNumStart + batchSize - 1}
    `;

    console.log(query)
    var connection = await oracledb.getConnection(config);
    const result = await connection.execute(query);
    // console.log(result.rows)
    res.json(result.rows);
};

async function getRecipeInfo(req, res) {
    var recipeID = req.params.recipeid;
    console.log('getting info for recipe ' + recipeID);
    var query = `
        SELECT NAME, MINUTES, AVG_RATING, DESCRIPTION
        FROM RECIPE
        WHERE ID = ${recipeID}
    `;
    var connection = await oracledb.getConnection(config);
    const result = await connection.execute(query);
    res.json(result.rows);
}

async function getIngredientCals(req, res) {
    var recipeID = req.params.recipeid;
    console.log('getting ingredient calories for recipe ' + recipeID);
    var query = `
        WITH ing_ids AS (
            SELECT *
            FROM RECIPE_INGREDIENT_MAP
            WHERE RECIPE_ID = ${recipeID}
        ), fdc_ids AS (
            SELECT f.INGREDIENT_ID, f.FDC_ID, f.DESCRIPTION
            FROM ing_ids i JOIN FOOD f ON i.INGREDIENT_ID = f.INGREDIENT_ID
        ), cals AS (
            SELECT fn.AMOUNT, fn.FDC_ID
            FROM FOOD_NUTRIENT fn JOIN NUTRIENT n ON fn.NUTRIENT_ID = n.ID
            WHERE n.NAME = 'Energy' AND n.UNIT_NAME = 'KCAL'
        )
        SELECT f.DESCRIPTION, c.AMOUNT
        FROM fdc_ids f JOIN cals c ON f.FDC_ID = c.FDC_ID
    `;
    var connection = await oracledb.getConnection(config);
    const result = await connection.execute(query);
    res.json(result.rows);
}

async function getRecipeSteps(req, res) {
    var recipeID = req.params.recipeid;
    console.log('getting steps for recipe ' + recipeID)
    var query = `
        SELECT *
        FROM Recipe_Step
        WHERE recipe_id = ${recipeID}
        ORDER BY step_num
    `;
  var connection = await oracledb.getConnection(config);
  const result = await connection.execute(query);
  res.json(result.rows);
}

async function getRecipeReviews(req, res) {
  var recipeID = req.params.recipeid;
  var rowNumStart = parseInt(req.params.rownum);
  var batchSize = 5;
  console.log("getting info for recipe " + recipeID);
  var query = `
        SELECT * FROM (
            SELECT recipe_id, rating, review, ROWNUM AS rnum 
            FROM Recipe_Review
            WHERE recipe_id = ${recipeID}
            ORDER BY rating, user_id
        ) WHERE rnum BETWEEN ${rowNumStart} AND ${rowNumStart + batchSize - 1}
    `;
  var connection = await oracledb.getConnection(config);
  const result = await connection.execute(query);
  // console.log(result.rows)
  res.json(result.rows);
}

async function getRecipePicture(req, response) {
  console.log("INN GET RECIPE PIC ROUTE IN SERVER");
  var recipename = req.params.recipename;
  SUBSCRIPTION_KEY = process.env["AZURE_SUBSCRIPTION_KEY"];
  https.get(
    {
      hostname: "api.bing.microsoft.com",
      path: "/v7.0/images/search?q=" + encodeURIComponent(recipename),
      headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY },
    },
    (res) => {
      let body = "";
      res.on("data", (part) => (body += part));
      res.on("end", () => {
        for (var header in res.headers) {
          if (
            header.startsWith("bingapis-") ||
            header.startsWith("x-msedge-")
          ) {
            console.log(header + ": " + res.headers[header]);
          }
        }
        console.log("\nJSON Response:\n");
        // console.dir(JSON.parse(body), { colors: false, depth: null });

        let jsonres = JSON.parse(body);
        console.log(jsonres.value[0].thumbnailUrl);
        response.json({ url: jsonres.value[0].thumbnailUrl });
      });
      res.on("error", (e) => {
        console.log("Error: " + e.message);
        throw e;
      });
    }
  );
  //   res.json({ url: bingWebSearch(recipename) });
}

// The exported functions, which can be accessed in index.js.
module.exports = {
    getRelevantRecipes: getRelevantRecipes,
    getRelevantTags: getRelevantTags,
    getRecipeInfo: getRecipeInfo,
    getIngredientCals: getIngredientCals,
    getRecipeSteps: getRecipeSteps,
    getRecipeReviews: getRecipeReviews,
    getRecipePicture: getRecipePicture
}

