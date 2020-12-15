import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeReview extends React.Component {
	constructor(props) {
		super(props);		
	}
	
	render() {
		return (
			<div>
                Rating: {this.props.rating} out of 5 stars, review: {this.props.review}
			</div>
			
		);
	}
}