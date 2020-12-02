CREATE TABLE Food ( 
    ingredient_id int,
    fdc_id int,
    description varchar(255),
    PRIMARY KEY (ingredient_id)
);

CREATE TABLE Nutrient ( 
    id int,
    name varchar(255),
    unit_name varchar(255),
    PRIMARY KEY (id)
); 

CREATE TABLE Food_Nutrient ( 
    nutrient_id int,
    fdc_id int,
    amount varchar(255),
    PRIMARY KEY (nutrient_id, fdc_id),
    FOREIGN KEY (nutrient_id) REFERENCES Nutrient(id)
);

CREATE TABLE Recipe ( 
    id int,
    name varchar(255),
    minutes int,
    n_steps int,
    n_ingredients int,
    n_reviews int,
    avg_rating DECIMAL(10, 9),
    description varchar(3000),
    PRIMARY KEY (id)
); 


CREATE TABLE Recipe_Step( 
    recipe_id int,
    step_num int,
    step_description varchar(2000),
    PRIMARY KEY (recipe_id, step_num),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
);

CREATE TABLE Recipe_Tag (
	recipe_id int,
	tag varchar(255),
    PRIMARY KEY (recipe_id, tag),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
)

CREATE TABLE Recipe_Ingredient_Map ( 
    recipe_id int,
    ingredient_id int,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
    FOREIGN KEY (ingredient_id) REFERENCES Food(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE Recipe_Review ( 
    recipe_id int,
    user_id int,
    rating int,
    date date,
    review varchar(3000),
    PRIMARY KEY (recipe_id, user_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
);