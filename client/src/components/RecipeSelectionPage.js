import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/RecipeSelectionPage.css';
import RecipeSelectionParams from './RecipeSelectionParams'
import RecipeListItem from './RecipeListItem';


export default class RecipeSelectionPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };

        this.submitFoodItems = this.submitFoodItems.bind(this);
    }

    async submitFoodItems(foodItems) {
        if (foodItems.length === 0) return; 
        // Send an HTTP request to the server.
        fetch(`http://localhost:8081/recipes/${foodItems}`, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(recipeList => {
                if (!recipeList) return;

                let recipeDivs = recipeList.slice(0, 5).map((recipeObj, i) =>
                    <RecipeListItem id={recipeObj[0]} title={recipeObj[1]} prep_time="5" displayRecipe={this.props.displayRecipe}/>
                );

                this.setState({
                    recipes: recipeDivs
                })
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    }


    setRecipeSelection(recipeId) {
        this.setState({ selectedRecipeId: recipeId});
    }
    
	render() {
        return (
            <div>
                <RecipeSelectionParams submitFoodItems = {this.submitFoodItems}/>


                <div className="container recommendations-container">
                  <div className="jumbotron">

                    <div className="header-container">
                      <div className="h6">You may like ...</div>
                      <div className="headers">
                        <div className="header"><strong>Title</strong></div>
                        <div className="header"><strong>Avg Rating</strong></div>
                      </div>
                    </div>
                    <div className="results-container" id="results">
                      {this.state.recipes}
                    </div>
                  </div>
                </div>


            </div>
        );
	}
}