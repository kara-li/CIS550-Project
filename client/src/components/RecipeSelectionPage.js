import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/RecipeSelectionPage.css';
import RecipeSelectionParams from './RecipeSelectionParams'



import RecipeListItem from './RecipeListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import DisplayRelevantRecipes from './DisplayRelevantRecipes'

export default class RecipeSelectionPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            foodItems: []
        };

        this.submitFoodItems = this.submitFoodItems.bind(this);
    }

    async submitFoodItems(foodItems) {
        if (foodItems.length === 0) return; 
        
        this.setState({
            foodItems: foodItems,
        });
        console.log('this long')
        console.log(this.state.foodItems.length)
    }
    
    
	render() {
        let recipes;
        if (this.state.foodItems.length > 0) {
            recipes = <DisplayRelevantRecipes displayRecipe={this.props.displayRecipe} foodItems={this.state.foodItems}/>
        } else {
            recipes = "select foods"
        }

        return (
            <div>
                <RecipeSelectionParams submitFoodItems = {this.submitFoodItems}/>
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