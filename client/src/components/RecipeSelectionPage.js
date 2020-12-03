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
        // Send an HTTP request to the server.
        // fetch(`http://localhost:8081/recipes/${foodItems}/1`, {
        //     method: 'GET' // The type of HTTP request.
        // })
        //     .then(res => res.json()) // Convert the response data to a JSON.
        //     .then(recipeList => {
        //         if (!recipeList) return;
        //         if (recipeList.length < 10) {
        //             this.setState({ hasMore: false })
        //         }
        //         this.setState({ rowNum: 10 });
        //         console.log(recipeList)
        //         let recipeDivs = recipeList.map((recipeObj, i) =>
        //             <RecipeListItem 
        //                 id={recipeObj[0]} 
        //                 name={recipeObj[1]} 
        //                 minutes={recipeObj[2]} 
        //                 n_steps={recipeObj[3]} 
        //                 n_ingredients={recipeObj[4]} 
        //                 n_reviews={recipeObj[5]} 
        //                 vg_rating={recipeObj[6]} 
        //                 rnum={recipeObj[7]} 
        //                 displayRecipe={this.props.displayRecipe}
        //             />
        //         );

        //         this.setState({
        //             foodItems: foodItems,
        //             recipes: recipeDivs
        //         })
        //     })
        //     .catch(err => console.log(err))	// Print the error if there is one.
    }

    // fetchMoreData = () => {
    //     if (!this.state.hasMore) return
    //     fetch(`http://localhost:8081/recipes/${this.state.foodItems}/${this.state.rowNum}`, {
    //         method: 'GET' // The type of HTTP request.
    //     })
    //         .then(res => res.json()) // Convert the response data to a JSON.
    //         .then(recipeList => {
    //             if (!recipeList) return;
    //             if (recipeList.length < 10) {
    //                 this.setState({ hasMore: false })
    //             } else {
    //                 this.setState({ rowNum: this.state.rowNum + 10 })
    //             }
    //             console.log(recipeList)
    //             let recipeDivs = recipeList.map((recipeObj, i) =>
    //                 <RecipeListItem 
    //                     id={recipeObj[0]} 
    //                     name={recipeObj[1]} 
    //                     minutes={recipeObj[2]} 
    //                     n_steps={recipeObj[3]} 
    //                     n_ingredients={recipeObj[4]} 
    //                     n_reviews={recipeObj[5]} 
    //                     vg_rating={recipeObj[6]} 
    //                     displayRecipe={this.props.displayRecipe}
    //                 />
    //             );

    //             this.setState({
    //                 recipes: this.state.recipes.concat(recipeDivs)
    //             })
    //         })
    //         .catch(err => console.log(err))	// Print the error if there is one.
    // };
    
    
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