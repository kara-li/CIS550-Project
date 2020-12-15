var config = require('./db-config.js');
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: '/Users/Sid/instantclient_19_9'});

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

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
    console.log(foodItems)
    foodItems = foodItems.split(',').join( `\', \'`);
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
        )
        SELECT * FROM Recipe r1 JOIN query_recipe_ids r2 ON r1.id = r2.recipe_id
    `;

    console.log(query)
    var connection = await oracledb.getConnection(config);
    const result = await connection.execute(query);
    console.log(result.rows)
    res.json(result.rows);
};


// The exported functions, which can be accessed in index.js.
module.exports = {
    getRecipeInfo: getRecipeInfo,
    getRelevantRecipes: getRelevantRecipes,
    getRelevantTags: getRelevantTags
}