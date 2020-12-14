import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="recipeStepResults">
				<div className="name">Recipe: {this.props.name}</div>
				<div className="minutes">Time: {this.props.mins} minutes</div>
                <div className="rating">Average rating: {this.props.rating}</div>
                <div className="description">Description: {this.props.description}</div>
			</div>
		);
	}
}
