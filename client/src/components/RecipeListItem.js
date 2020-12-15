import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeSelectionPage extends React.Component {
	constructor(props) {
		super(props);		
	}
	
	render() {
		return (
			<div>
				<div className="recipeResults" onClick={() => this.props.displayRecipe(this.props.id)}>

					name: {this.props.name}, 
					minutes: {this.props.minutes},
					n_steps: {this.props.n_steps},
					n_ingredients: {this.props.n_ingredients},
					n_reviews: {this.props.n_reviews},
					avg_rating:{this.props.avg_rating}
				</div>
			</div>
			
		);
	}
}