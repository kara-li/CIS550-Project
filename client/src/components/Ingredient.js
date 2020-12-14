import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Ingredient extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="ingredientResults">
				<div className="name">{this.props.name}:</div>
				<div className="cals">{this.props.cals} calories</div>
			</div>
		);
	}
}
