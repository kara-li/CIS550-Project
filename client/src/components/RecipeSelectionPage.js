import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/RecipeSelectionPage.css';
import RecipeSelectionParams from './RecipeSelectionParams'
import RecipeListItem from './RecipeListItem';

import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};
export default class RecipeSelectionPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            rowNum: 1,
            // recipes: Array.from({ length: 20 }),
            hasMore: true,
            foodItems: []
        };

        this.submitFoodItems = this.submitFoodItems.bind(this);
    }

    async submitFoodItems(foodItems) {
        if (foodItems.length === 0) return; 
        // Send an HTTP request to the server.
        fetch(`http://localhost:8081/recipes/${foodItems}/1`, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(recipeList => {
                if (!recipeList) return;
                this.setState({ hasMore: true });
                this.setState({ rowNum: 10 });
                console.log(recipeList)
                let recipeDivs = recipeList.map((recipeObj, i) =>
                    <RecipeListItem 
                        id={recipeObj[0]} 
                        name={recipeObj[1]} 
                        minutes={recipeObj[2]} 
                        n_steps={recipeObj[3]} 
                        n_ingredients={recipeObj[4]} 
                        n_reviews={recipeObj[5]} 
                        vg_rating={recipeObj[6]} 
                        rnum={recipeObj[7]} 
                        displayRecipe={this.props.displayRecipe}
                    />
                );

                this.setState({
                    foodItems: foodItems
                })
                this.setState({
                    recipes: recipeDivs
                })
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    }


    setRecipeSelection(recipeId) {
        this.setState({ selectedRecipeId: recipeId});
    }

    fetchMoreData = () => {
        if (!this.state.hasMore) return
        this.setState({ hasMore: false });
        fetch(`http://localhost:8081/recipes/${this.state.foodItems}/${this.state.rowNum}`, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(recipeList => {
                if (!recipeList) return;
                this.setState({ hasMore: true });
                this.setState({ rowNum: this.state.rowNum + 10 });
                console.log(recipeList)
                let recipeDivs = recipeList.map((recipeObj, i) =>
                    <RecipeListItem 
                        id={recipeObj[0]} 
                        name={recipeObj[1]} 
                        minutes={recipeObj[2]} 
                        n_steps={recipeObj[3]} 
                        n_ingredients={recipeObj[4]} 
                        n_reviews={recipeObj[5]} 
                        vg_rating={recipeObj[6]} 
                        displayRecipe={this.props.displayRecipe}
                    />
                );

                this.setState({
                    recipes: this.state.recipes.concat(recipeDivs)
                })
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    };
    
    
	render() {
        return (
            <div>
                <RecipeSelectionParams submitFoodItems = {this.submitFoodItems}/>


                <div className="container recommendations-container">
                  <div className="jumbotron">

                    <div className="header-container">
                      <div className="h6">You may like ...</div>
                    </div>
                    
                    <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
                        <InfiniteScroll
                            dataLength={this.state.recipes.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={<h4>Loading...</h4>}
                            height={200}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >
                            {this.state.recipes}
                        </InfiniteScroll>
                    </div>
                  </div>
                </div>


            </div>
        );
	}
}