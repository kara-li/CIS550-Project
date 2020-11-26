import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import RecipeStep from './RecipeStep'
import Reviews from './Reviews'

export default class RecipePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recipeSteps: []
		};
	}

	componentDidMount() {
		// Send an HTTP request to the server.
		fetch(`http://localhost:8081/recipeinfo/${this.props.recipeId}`, {
		method: 'GET'
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(recipeStepList => {
				if (!recipeStepList) return;

				let recipeStepDivs = recipeStepList.map((recipeStepObj, i) =>
					<RecipeStep description={recipeStepObj[2]} />
				);

				this.setState({
					recipeSteps: recipeStepDivs
				})
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}

	render() {
		return (
			<div className="Recipe">
				Recipe ID: {this.props.recipeId}
				TODO: add Name, prep time, picture
				<br>
				</br>
				----------------------------
				<h1> Steps</h1>
				{this.state.recipeSteps}
				--------------------------
				<div onClick={() => this.props.displayRecipe(null)}>
					<b> Find other recipes...</b>
				</div>
				<br>
				</br>
				<Reviews/>
			</div>
		);
	}
}

