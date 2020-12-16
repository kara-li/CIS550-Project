import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import RecipeListItem from "./RecipeListItem";
import InfiniteScroll from "react-infinite-scroll-component";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";

export default class DisplayRelevantRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      query: this.props.query,
      type: this.props.type,
      sort: this.props.sort,
      rowNum: 1,
      hasMore: true,
      foodItems: this.props.foodItems,
      batchSize: 20, //Should be the same as the batch size in corresponding query in routes.js
      testCounter: 0
    };

    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.foodItems !== state.foodItems || props.query !== state.query ||  props.sort !== state.sort ||  props.type !== state.type) {
      console.log("getDerivedStateFromProps update");
      return {
        foodItems: props.foodItems,
        recipes: [],
        query: props.query,
        type: props.type,
        sort: props.sort,
        hasMore: true,
        rowNum: 1,
        testCounter: state.testCounter + 1
      }
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidMount() {
    console.log("displayRel mounted");
    this.fetchMoreData();
  }

  fetchMoreData = () => {
    console.log('fetchMoreData called')
    if (!this.state.hasMore) return;
    let url = `http://localhost:8081/recipes/${this.props.foodItems}/${encodeURI(" " + this.props.query)}/${this.props.type}/${this.props.sort}/${this.state.rowNum}`;
    fetch(url, {
      method: "GET", // The type of HTTP request.
    })
      .then((res) => res.json()) // Convert the response data to a JSON.
      .then((recipeList) => {
        if (!recipeList) return;
        if (recipeList.length < this.state.batchSize) {
          this.setState({ hasMore: false });
        } else {
          this.setState({ rowNum: this.state.rowNum + this.state.batchSize });
        }
        console.log("RECIPE LIST AHHH");
        console.log(recipeList);
        let recipeDivs = recipeList.map((recipeObj, i) => (
          <RecipeListItem
            id={recipeObj[0]}
            name={recipeObj[1]}
            minutes={recipeObj[2]}
            n_steps={recipeObj[3]}
            n_ingredients={recipeObj[4]}
            n_reviews={recipeObj[5]}
            avg_rating={recipeObj[6]}
            description={recipeObj[7]}
            displayRecipe={this.props.displayRecipe}
          />
        ));
          console.log('concating new recipes in fetchMore')
        this.setState({
          recipes: this.state.recipes.concat(recipeDivs),
        });
      })
      .catch((err) => console.log(err)); // Print the error if there is one.
  };

  render() {
    if (this.state.recipes.length === 0) {
      console.log('recipes empty. calling fetchMoreData')
      this.fetchMoreData()
    }
    console.log("rendred againnnnn");
    console.log(this.props.foodItems);
    return (
      <div>
        <div id="scrollableDiv" style={{ height: 600, overflow: "auto" }}>
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
            <CardDeck>{this.state.recipes}</CardDeck>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}
