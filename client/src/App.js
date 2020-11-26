import React from 'react';
import RecipeSelectionPage from './components/RecipeSelectionPage';
import RecipePage from './components/RecipePage';

export default class App extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            selectedRecipeId: null
        };

        this.displayRecipe = this.displayRecipe.bind(this);
    }

	displayRecipe(recipeId) {
		this.setState({ selectedRecipeId: recipeId });
	  }

	render() {
		return (
			<div className="App">
				{this.state.selectedRecipeId
					? <RecipePage recipeId={this.state.selectedRecipeId} displayRecipe={this.displayRecipe}/>
					: <RecipeSelectionPage displayRecipe={this.displayRecipe} />
				}
			</div>
		);
	}
}