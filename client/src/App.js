import React from "react";
import RecipeSelectionPage from "./components/RecipeSelectionPage";
import RecipePage from "./components/RecipePage";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipeId: null,
    };

    this.displayRecipe = this.displayRecipe.bind(this);
  }

  displayRecipe(recipeId) {
    this.setState({ selectedRecipeId: recipeId });
  }

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <Container>
            <h1 style={{fontSize: 100}}>Recipe Finder</h1>
            <p style={{fontSize: 50}}>
              Search for recipes to use the food in your pantry!
            </p>
          </Container>
        </Jumbotron>
        {this.state.selectedRecipeId ? (
          <RecipePage
            recipeId={this.state.selectedRecipeId}
            displayRecipe={this.displayRecipe}
          />
        ) : (
          <RecipeSelectionPage displayRecipe={this.displayRecipe} />
        )}
      </div>
    );
  }
}
