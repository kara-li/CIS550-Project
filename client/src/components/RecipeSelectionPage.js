import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/RecipeSelectionPage.css';
import RecipeSelectionParams from './RecipeSelectionParams'
import DisplayRelevantRecipes from './DisplayRelevantRecipes'

export default class RecipeSelectionPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            foodItems: [],
            query: "",
            sort: 0,
            type:0
        };

        this.submitFoodItems = this.submitFoodItems.bind(this);
        this.getNutrient = this.getNutrient.bind(this);
    }

    async submitFoodItems(foodItems) {
        if (foodItems.length === 0) return; 
        
        this.setState({
            foodItems: foodItems,
        });
        console.log(this.state.foodItems.length)
    }
    
    async getNutrient(query, sort, type) {
        if (query === "") return; 
        
        this.setState({
            query: query,
            type: type,
            sort:sort
        });
    }
    
	render() {
        let recipes;
        if (this.state.foodItems.length > 0) {
            recipes = <DisplayRelevantRecipes displayRecipe={this.props.displayRecipe} foodItems={this.state.foodItems} query = {this.state.query} sort = {this.state.sort} type = {this.state.type}/>
        } else {
            recipes = "select foods"
        }

        return (
            <div>
                <RecipeSelectionParams submitFoodItems = {this.submitFoodItems} getNutrient = {this.getNutrient}/>
{/* 
                <div className="container recommendations-container">
                    <div className="jumbotron"> */}

                        <div className="header-container">
                            <div className="h6">You may like ...</div>
                        </div>
                    
                        <div>
                            {recipes} 
                        </div>
                    {/* </div>
                </div> */}


            </div>
        );
	}
}