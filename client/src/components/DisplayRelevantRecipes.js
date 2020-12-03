import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipeListItem from './RecipeListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export default class DisplayRelevantRecipes extends React.Component {
	constructor(props) {
        super(props);	
        this.state = {
            recipes: [],
            rowNum: 1,
            hasMore: true,
            foodItems: this.props.foodItems
        };	

        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.foodItems !== state.foodItems) {
            console.log("getDerivedStateFromProps update")
            return {
                foodItems: props.foodItems,
                recipes: [],
                hasMore: true,
                rowNum: 1
            };
        }
    
        // Return null if the state hasn't changed
        return null;
      }
    
    componentDidMount() {
        console.log("displayRel mounted")
        this.fetchMoreData()
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }


    fetchMoreData = () => {
        if (!this.state.hasMore) return
        let url = `http://localhost:8081/recipes/${this.props.foodItems}/${this.state.rowNum}`
        console.log(`url is ${url}`)
        console.log(`this.props.foodItems is ${this.state.foodItems}`)
        console.log(`this.state.rowNum is ${this.state.rowNum}`)
        fetch(url, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(recipeList => {
                if (!recipeList) return;
                if (recipeList.length < 10) {
                    this.setState({ hasMore: false })
                } else {
                    this.setState({ rowNum: this.state.rowNum + 10 })
                }
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
        console.log("rendred againnnnn")
        console.log(this.props.foodItems)
		return (
			<div>
                <div id="scrollableDiv" style={{ height: 800, overflow: "auto" }}>
                    <InfiniteScroll
                        dataLength={this.state.recipes.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                        height={500}
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
			
		);
	}
}