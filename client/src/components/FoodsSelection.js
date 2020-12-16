//based of https://codepen.io/jerrylow/pen/mvZZpp

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/ItemsSelection.css";

import Button from "react-bootstrap/Button";

export default class FoodsSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  removeItem = (i) => {
    const newItems = [...this.state.items];
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  };

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (
        this.state.items.find(
          (item) => item.toLowerCase() === val.toLowerCase()
        )
      ) {
        return;
      }
      this.setState({ items: [...this.state.items, val] });
      this.itemInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      this.removeItem(this.state.items.length - 1);
    }
  };

  render() {
    const { items } = this.state;

    return (
      <div >
        <div className="input-item">  
        <ul className="input-item__items">
          {items.map((item, i) => (
            <li key={item}>
              {item}
              <Button
                type="button"
                onClick={() => {
                  this.removeItem(i);
                }}
              >
                +
              </Button>
            </li>
          ))}
          <li className="input-item__items__input">
            <input
              type="text"
              onKeyDown={this.inputKeyDown}
              ref={(c) => {
                this.itemInput = c;
              }}
            />
          </li>
        </ul>
        </div>
        <div>
          <Button
            className="submit-btn"
            id="decadesSubmitBtn"
            onClick={() => this.props.submitFoodItems(this.state.items)}
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}
