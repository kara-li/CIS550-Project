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
			AND ${this.state.nutrients[2]} 
			AND ${this.state.nutrients[3]} 
			AND ${this.state.nutrients[4]} 
			AND ${this.state.nutrients[5]}
			`;
		}
		var tagstr = '';
		this.state.tags.forEach(e => tagstr = tagstr + `OR r.tag = '${e}' `);
		tagstr = tagstr.substring(3);
		if (this.state.tags.length) {tagstr = `WHERE ${tagstr}`}
		console.log(this.state.tags.length)
		return `
		WITH Ingredients_in_recipe AS (
			SELECT * FROM Recipe_Ingredient_Map
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
				(SUM(Amount) FOR nutrient_id IN (1093, 1008, 1004, 1005, 1003))
		) 
		SELECT * FROM Pivots ${nutstr}
		${tagstr}
		`;
	}
	taghandler(tagsret) {
		this.setState({ tags: tagsret});
		console.log(this.getQuery())
	}
	nutrienthandler(nutrient) {
		this.setState({ nutrients: nutrient});
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
							<input type="radio" id="ratingsort" name="sort" value="rating"></input>
							<label htmlFor="ratingsort">Rating</label>
							<br></br>
							<input type="radio" id="numrevsort" name="sort" value="numrev"></input>
							<label htmlFor="numrevsort">Number of Reviews</label>
							<br></br>
							<input type="radio" id="timesort" name="sort" value="time"></input>
							<label htmlFor="timesort">Time to Make</label>
						</form>
						<br></br>
						<b>Search a:</b>
						<form>
							<input type="radio" id="subset" name="exclude" value="subset"></input>
							<label htmlFor="subset">Subset of the Keywords</label>
							<br></br>
							<input type="radio" id="superset" name="exclude" value="superset"></input>
							<label htmlFor="superset">Superset of the Keywords</label>
							<br></br>
							<input type="radio" id="exact" name="exclude" value="exact"></input>
							<label htmlFor="exact">An Exact Match of the Keywords</label>
						</form>
					</div>
					<div className ="col"><Sliders handler = {this.nutrienthandler}/></div>
				</div>
			</div>
        </Collapsible>
		);
	}
}
