var config = require('./db-config.js');
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: '/Users/chaimfishman/instantclient_19_8'});

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


async function getRelevantRecipes(req, res) {
    var foodItems = req.params.items;
    var rowNumStart = parseInt(req.params.rownum);
    var batchSize = 20;
    console.log(foodItems)
    console.log(`batchSize is ${batchSize}`)
    foodItems = foodItems.replaceAll(',', `\', \'`);
    foodItems = `'${foodItems}'`;
    console.log("seraching for recipes with following foods: " + foodItems);

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
            HAVING COUNT(*) >= ${foodItems.split(',').length}
        ) SELECT * FROM (
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
    console.log('getting info for recipe ' + recipeID)
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
    console.log('getting info for recipe ' + recipeID)
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

// The exported functions, which can be accessed in index.js.
module.exports = {
    getRelevantRecipes: getRelevantRecipes,
    getRecipeInfo: getRecipeInfo,
    getRecipeReviews: getRecipeReviews
}