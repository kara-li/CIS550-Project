import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import RecipeStep from './RecipeStep'
import Reviews from './Reviews'
import Ingredient from './Ingredient'
import RecipeInfo from './RecipeInfo'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class RecipePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			info: [],
			ingredients: [],
			recipeSteps: []
		};
	}

	componentDidMount() {
		// Send an HTTP request to the server.
		fetch(`http://localhost:8081/recipeinfo/${this.props.recipeId}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(infoList => {
				if (!infoList) return;

				let infoDivs = infoList.map((infoObj, i) =>
					<RecipeInfo name={infoObj[0]} mins={infoObj[1]} rating={infoObj[2]} description={infoObj[3]} />
				);

				this.setState({
					info: infoDivs
				});
			})
			.catch(err => console.log(err));

		fetch(`http://localhost:8081/ingredientcals/${this.props.recipeId}`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(ingredientList => {
				if (!ingredientList) return;
				
				let ingredientDivs = ingredientList.map((ingredientObj, i) =>
					<Ingredient name={ingredientObj[0]} cals={ingredientObj[1]} />
				);

				this.setState({
					ingredients: ingredientDivs
				});
			})
			.catch(err => console.log(err));
		
		fetch(`http://localhost:8081/recipesteps/${this.props.recipeId}`, {
		method: 'GET'
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(recipeStepList => {
				if (!recipeStepList) return;
				
				let recipeStepDivs = recipeStepList.map((recipeStepObj, i) =>
					<RecipeStep stepNum={recipeStepObj[1]} description={recipeStepObj[2]} />
				);

				this.setState({
					recipeSteps: recipeStepDivs
				});
			})
			.catch(err => console.log(err));	// Print the error if there is one.
	}

	render() {
		return (
			<Container className="p-3">
				<Jumbotron>
					<Button onClick={() => this.props.displayRecipe(null)}>
						<b>Return to Home Page</b>
					</Button>
					<br></br>
					{this.state.info}
					<br></br>
					<h3>Ingredients</h3>
					{this.state.ingredients}
					<br></br>
					<h3>Steps</h3>
					{this.state.recipeSteps}
					<br></br>
					<h3>Reviews</h3>
					<Reviews recipeId={this.props.recipeId}/>
					<Button onClick={() => this.props.displayRecipe(null)}>
						<b>Return to Home Page</b>
					</Button>
				</Jumbotron>
			</Container>
		);
	}
}

