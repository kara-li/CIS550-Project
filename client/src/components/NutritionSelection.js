import React from 'react';
import Collapsible from 'react-collapsible';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sliders from './Sliders'
import TagSearch from './TagSearch'
 
export default class NutritionSelection extends React.Component {
	state = {
		tags : [],
		nutrients : [],
		sort : 0,
		exclude : 0
	}
	
	constructor(props) {
		super(props);
		this.taghandler = this.taghandler.bind(this)
		this.nutrienthandler = this.nutrienthandler.bind(this)
	}
	getQuery() {
		var nutstr = ''
		if (this.state.nutrients.length) {
			nutstr = `
			WHERE ${this.state.nutrients[0]} 
			AND ${this.state.nutrients[1]} 
			AND ${this.state.nutrients[3]} 
			AND ${this.state.nutrients[4]} 
			AND ${this.state.nutrients[5]}
			`;
		}
		var tagstr = '';
		this.state.tags.forEach(e => tagstr = tagstr + `OR t.tag = '${e}' `);
		tagstr = tagstr.substring(3);
		if (this.state.tags.length) {tagstr = `WHERE ${tagstr}`}
		return `
		,Ingredients_in_recipe AS (
			SELECT r.recipe_id, r.ingredient_id FROM Recipe_Ingredient_Map r JOIN query_recipe_ids q ON r.recipe_id = q.recipe_id
		), Ingredients AS (
			SELECT * 
			FROM Food f JOIN Ingredients_in_recipe r 
			ON f.ingredient_id = r.ingredient_id
		),TaggedIngredients AS (
            SELECT i.recipe_id, i.fdc_id FROM Ingredients i JOIN Recipe_Tag t ON i.recipe_id = t.recipe_id ${tagstr}
        ),
		Pivots AS (
        	SELECT * FROM
				(SELECT recipe_id, Nutrient_Id, Amount
        		FROM Food_Nutrient f JOIN TaggedIngredients i ON f.fdc_id = i.fdc_id)
			PIVOT 
				(SUM(Amount) FOR nutrient_id IN (1093, 1008, 1004, 1005, 1003, 1063))
		),
		temp AS ( 
			SELECT RECIPE_ID, COALESCE("1093", 0) AS "1093", COALESCE("1008", 0) AS "1008", COALESCE("1063", 0) AS "1063",
			COALESCE("1004", 0) AS "1004", COALESCE("1005", 0) AS "1005", COALESCE("1003", 0) AS "1003" FROM Pivots ${nutstr}
		),
		result AS (
			SELECT recipe_id FROM temp
		)
		`;
	}
	taghandler = tagsret => {
		this.setState({ tags: tagsret});
		this.props.getNutrient(this.getQuery(), this.state.sort, this.state.exclude);
	}
	nutrienthandler = nutrient => {
		this.setState({ nutrients: nutrient});
		this.props.getNutrient(this.getQuery(), this.state.sort, this.state.exclude);
	}
	sorthandler = sort => {
		this.setState({ sort: sort});
		var a = this.getQuery()
		if (this.state.tags.length == 0 && this.state.nutrients.length == 0) {
			a = ""
		}
		this.props.getNutrient(a, this.state.sort, this.state.exclude);
	}
	excludehandler = exclude => {
		this.setState({ exclude: exclude});
		var a = this.getQuery()
		if (this.state.tags.length == 0 && this.state.nutrients.length == 0) {
			a = ""
		}
		this.props.getNutrient(a, this.state.sort, this.state.exclude);
	}
	render() {
		return (
		<Collapsible trigger="Start here">
			<div className ="container">
				<div className ="row">
					<div className ="col">
						<TagSearch handler = {this.taghandler}/>
						<br></br>
						<b>Sort By:</b>
						<form>
							<input type="radio" id="ratingsort" name="sort" value="rating" onClick={() => this.sorthandler(0)}></input>
							<label htmlFor="ratingsort">Rating</label>
							<br></br>
							<input type="radio" id="numrevsort" name="sort" value="numrev" onClick={() => this.sorthandler(1)}></input>
							<label htmlFor="numrevsort">Number of Reviews</label>
							<br></br>
							<input type="radio" id="timesort" name="sort" value="time" onClick={() => this.sorthandler(2)}></input>
							<label htmlFor="timesort">Time to Make</label>
						</form>
						<br></br>
						<b>Search a:</b>
						<form>
							<input type="radio" id="superset" name="exclude" value="superset" onClick={() => this.excludehandler(0)}></input>
							<label htmlFor="superset">Superset of the Keywords</label>
							<br></br>
							<input type="radio" id="subset" name="exclude" value="subset" onClick={() => this.excludehandler(1)}></input>
							<label htmlFor="subset">Subset of the Keywords</label>
							<br></br>
							<input type="radio" id="exact" name="exclude" value="exact" onClick={() => this.excludehandler(2)}></input>
							<label htmlFor="exact">Any of the Keywords</label>
						</form>
					</div>
					<div className ="col"><Sliders handler = {this.nutrienthandler}/></div>
				</div>
			</div>
        </Collapsible>
		);
	}
}
