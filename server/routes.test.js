const express = require("express");
const routes = require("./routes");
const request = require("supertest");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: ".env",
});

app.use("/recipestags/:tags", routes.getRelevantTags);
describe("testing getRelevantTags", () => {
    it("GET /recipestags no results", async () => {
        const { body } = await request(app).get("/recipestags/bbbbbbbbbb");
        expect(body).toHaveLength(0);
    });
    it("GET /recipestags one result", async () => {
        const { body } = await request(app).get("/recipestags/bear");
        expect(body).toHaveLength(1);
    });
    it("GET /recipestags multiple results", async () => {
        const { body } = await request(app).get("/recipestags/bread");
        expect(body).toHaveLength(3);
    });
});
/*
app.use('/recipes/:items/:rownum', routes.getRelevantRecipes);
describe("testing getRelevantRecipes", () => {
    it("GET /recipes one input pt 1", async () => {
        const { body } = await request(app).get("/recipes/beet/1");
        expect(body).toHaveLength(20);
    });
    it("GET /recipes one input pt 2", async () => {
        const { body } = await request(app).get("/recipes/beet/361"); //There are 367 recipes with 'beet'
        expect(body).toHaveLength(7);
    });
    it("GET /recipes multiple inputs", async () => {
        const { body } = await request(app).get("/recipes/apple,salt,peach/1"); //There are 2 recipes with apple, salt, and peach
        expect(body).toHaveLength(2);
    });
});
*/
app.use('/recipeinfo/:recipeid', routes.getRecipeInfo);
describe("testing getRecipeInfo", () => {
    it("GET /recipeinfo attempt 1", async () => {
        const { body } = await request(app).get("/recipeinfo/33606");
        expect(body).toEqual([[
            "italian sandwich  pasta salad",
            25,
            0,
            "this is a fun salad that uses the same ingredients you would in an italian sandwich. water chestnuts give it a nice crunch!!"
        ]]);
    });
    it("GET /recipeinfo attempt 2", async () => {
        const { body } = await request(app).get("/recipeinfo/272");
        expect(body).toEqual([[
            "lemon mint lamb chops",
            25,
            5,
            "quick, easy and tasty."
        ]]);
    });
});

app.use('/ingredientcals/:recipeid', routes.getIngredientCals);
describe("testing getIngredientCals", () => {
    it("GET /ingredientcals few ingredients", async () => {
        const { body } = await request(app).get('/ingredientcals/19208');
        expect(body).toEqual([
            [
                "apple", "52.0"
            ],
            [
                "artificial sweetener", "41.0"
            ],
            [
                "red cinnamon candy", "387.0"
            ],
            [
                "water", "0.0"
            ]
        ]);
    });
    it("GET /ingredientcals many ingredients", async () => {
        const { body } = await request(app).get('/ingredientcals/83950');
        expect(body).toHaveLength(20);
    });
});

app.use('/recipesteps/:recipeid', routes.getRecipeSteps);
describe("testing getRecipeSteps", () => {
    it("GET /recipesteps few steps", async () => {
        const { body } = await request(app).get('/recipesteps/51922');
        expect(body).toEqual([
            [
                51922, 0, "place walnuts , garlic water , nama shoyu , and rosemary in blender and blend until creamy"
            ],
            [
                51922, 1, "add ground flax seed and blend well"
            ],
            [
                51922, 2, "pour into a serving dish and add mushrooms"
            ]
        ]);
    });
    it("GET /recipesteps many steps", async () => {
        const { body } = await request(app).get('/recipesteps/153470');
        expect(body).toHaveLength(37);
    });
});

app.use('/recipereviews/:recipeid/:rownum', routes.getRecipeReviews);
describe("testing getRecipeReviews", () => {
    it("GET /recipereviews many reviews pt 1", async () => {
        const { body } = await request(app).get('/recipereviews/48331/1');
        expect(body).toHaveLength(5);
    });
    it("GET /recipereviews many reviews pt 1", async () => {
        const { body } = await request(app).get('/recipereviews/48331/56');
        expect(body).toHaveLength(3);
    });
    it("GET /recipereviews few reviews", async () => {
        const { body } = await request(app).get('/recipereviews/142984/1');
        expect(body).toHaveLength(1);
    });
});

app.use("/recipepicture/:recipename", routes.getRecipePicture);
describe("testing getRecipePicture", () => {
    it("GET /recipepicture", async () => {
        const { body } = await request(app).get('/recipepicture/pie');
        expect(body).toEqual({ "url" : "https://tse1.mm.bing.net/th?id=OIP.x5-7xmc0XIYK2sOgCXa7eAHaHa&pid=Api"}); //First result for "pie" on Bing
    });
});

app.get('/recipes/:items/:query/:type/:sort/:rownum', routes.getRelevantRecipes);
describe("testing getRelevantRecipies advanced queries", () => {
    it("GET /recipes test 1.1", async () => {
        const { body } = await request(app).get('/recipes/beet/%20/0/2/1');
        expect(body).toHaveLength(20);
    });
    it("GET /recipes test 1.2", async () => {
        const { body } = await request(app).get('/recipes/beet/%20/0/2/361');
        expect(body).toHaveLength(7);
    });
    it("GET /recipes test 2", async () => {
        const { body } = await request(app).get('/recipes/cocoa%20powder,date,frozen%20raspberry,walnut/%20/1/0/1');
        expect(body).toHaveLength(1);
    });
});