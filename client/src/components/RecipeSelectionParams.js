import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodsSelection from './FoodsSelection';
import NutritionSelection from './NutritionSelection';

export default class RecipeSelectionParams extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <div>
                <FoodsSelection submitFoodItems = {this.props.submitFoodItems}/>
                <NutritionSelection {... this.props}/>
            </div>
		);
	}
}
