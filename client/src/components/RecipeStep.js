import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeStep extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="recipeStepResults">
				Step {this.props.stepNum + 1}: {this.props.description}
			</div>
		);
	}
}
