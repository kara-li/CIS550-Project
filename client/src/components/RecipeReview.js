import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecipeReview extends React.Component {
	constructor(props) {
		super(props);		
	}
	
	render() {
		return (
			<div>
				<div>
                    rating: {this.props.rating}, 
					review: {this.props.review}
				</div>
			</div>
			
		);
	}
}