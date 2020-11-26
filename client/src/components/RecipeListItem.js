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
					<div className="title">{this.props.title}</div>
					<div className="prepTime">{this.props.prep_time}</div>
				</div>
			</div>
			
		);
	}
}