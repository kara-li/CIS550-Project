import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeStep extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="recipeStepResults">
				<div className="stepNum">{this.props.stepNum + 1}.</div>
				<div className="recipeStep">{this.props.description}</div>
			</div>
		);
	}
}
