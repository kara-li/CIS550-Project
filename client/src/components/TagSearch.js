import React, { Component } from 'react'
import Suggestions from './Suggestions'

class Search extends React.Component { 
    constructor(props) {
        super(props)

        this.handler = this.handler.bind(this)
    }
    state = {
        query: '',
        results: [],
        items: [],
    }
    handler(string) {
        if (this.state.items.find(item => item.toLowerCase() === string.toLowerCase())) {
            return;
        }
        this.setState({ items: [...this.state.items, string] });
        this.props.handler([...this.state.items, string])
    }
    getInfo = () => {
        if (this.state.query == '') return;
        // Send an HTTP request to the server.
        fetch(`http://localhost:8081/recipes/tags/` + String(this.state.query), {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(tagList => {
                console.log(tagList);
                if (!tagList) return;

                console.log(tagList);

                this.setState({
                    results: tagList
                })
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    }

    handleInputChange = (e) => {
        this.setState({
            query: e.target.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            }
        })
    }
    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            e.preventDefault();
            if (this.state.items.find(item => item.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ items: [...this.state.items, val] });
            this.itemInput.value = null;
            this.props.handler([...this.state.items, val])
        } else if (e.key === 'Backspace' && !val) {
            e.preventDefault();
            this.removeItem(this.state.items.length - 1);
        } else {

        }
    }
    removeItem = (i) => {
        const newItems = [...this.state.items];
        newItems.splice(i, 1);
        this.setState({ items: newItems });
        this.props.handler(newItems)
    }

    render() {
        const { items } = this.state;
        return (
            
            <div className="card">
                <ul className="input-item__items">
                    {items.map((item, i) => (
                        <li key={item}>
                            {item}
                            <button type="button" onClick={() => { this.removeItem(i); }}>+</button>
                        </li>
                    ))}
                </ul>

                <form>
                    <input
                        placeholder="Search for Tags"
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.inputKeyDown} ref={c => { this.itemInput = c; }}
                    />
                    <hr></hr>
                    <Suggestions results={this.state.results} handler={this.handler} />
                </form>
            </div>
        )
    }
}

export default Search