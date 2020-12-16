import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class RecipeSelectionPage extends React.Component {
  constructor(props) {
    super(props);

    // State maintained by this React component
    this.state = {
      pic_url: "holder.js/100px180",
    };
  }

  // async componentDidMount() {
  //   console.log("in component did mount fuction");
  //   console.log(`name is: ${this.props.name}`);
  //   // Send an HTP request to the server
  //   let pic_res = await fetch(
  //     `http://localhost:8081/recipepicture/${this.props.name}`,
  //     {
  //       method: "GET", // The type of HTTP request
  //     }
  //   );
  //   console.log("pic res: " + pic_res);
  //   let pic_res_json = pic_res.json();
  //   console.log(`URL is ${pic_res_json}`);
  //   pic_res_json.then(async (p) => {
  //     console.log("p here:" + p);
  //     console.log("p.url: " + p.url);
  //     await this.setState({
  //       pic_url: p.url + "/100px180",
  //     });
  //     console.log("props" + this.state.pic_url);
  //   });
  // }
  

  render() {
    return (
      <div>
        <div
          className="recipeResults"
          onClick={() => this.props.displayRecipe(this.props.id)}
        >
          {/* name: {this.props.name}, minutes: {this.props.minutes}, n_steps:{" "}
          {this.props.n_steps}, n_ingredients: {this.props.n_ingredients},
          n_reviews: {this.props.n_reviews}, avg_rating:{this.props.avg_rating} */}
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={this.state.pic_url} />
            <Card.Header as="h5">{this.props.name}</Card.Header>
          </Card>
        </div>
      </div>
    );
  }
}
