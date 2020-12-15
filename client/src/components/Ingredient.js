import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Ingredient extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="ingredientResults">
				{this.props.name}: {this.props.cals} calories
			</div>
		);
	}
}
