import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeStep extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="recipeStepResults">
				<div className="recipeStep">{this.props.description}</div>
			</div>
		);
	}
}
