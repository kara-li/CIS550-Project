var config = require('./db-config.js');
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: '/Users/chaimfishman/instantclient_19_8'});

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

async function getRecipeInfo(req, res) {
    var recipeID = req.params.recipeid;
    console.log('getting info for recipe ' + recipeID)
    var recipeID = 5179;
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


async function getRelevantRecipes(req, res) {
    var foodItems = req.params.items;
    console.log("seraching for recipes with following foods: " + foodItems)

    var query = `
        WITH good_recipes_ids AS (
        SELECT rr.recipe_id AS id, AVG(rating) AS rating
        FROM Recipe_Review rr JOIN Recipe r ON rr.recipe_id = r.id
        WHERE minutes < 1
        GROUP BY rr.recipe_id 
        HAVING AVG(rating) = 5
        )
        SELECT *
        FROM Recipe r1 
        JOIN good_recipes_ids r2 ON r1.id = r2.id
    `;
    var connection = await oracledb.getConnection(config);
    const result = await connection.execute(query);
    res.json(result.rows);
};


// The exported functions, which can be accessed in index.js.
module.exports = {
    getRecipeInfo: getRecipeInfo,
    getRelevantRecipes: getRelevantRecipes,
}