import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import RecipeReview from './RecipeReview'


export default class Reviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            reviews: [],
            rowNum: 1,
			hasMore: true,
			batchSize: 5 //Should be the same as the batch size in corresponding query in routes.js
		};	
		
		this.fetchMoreData = this.fetchMoreData.bind(this);
    }
    
	componentDidMount() {
        console.log("Reviews mounted")
        this.fetchMoreData()
    }

    fetchMoreData = () => {
        if (!this.state.hasMore) return
        let url = `http://localhost:8081/recipereviews/${this.props.recipeId}/${this.state.rowNum}`

        fetch(url, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(reviewList => {
                if (!reviewList) return;
                if (reviewList.length < this.state.batchSize) {
                    this.setState({ hasMore: false })
                } else {
                    this.setState({ rowNum: this.state.rowNum + this.state.batchSize})
                }
                console.log(reviewList)
                let reviewDivs = reviewList.map((reviewObj, i) =>
                    <RecipeReview rating={reviewObj[1]} review={reviewObj[2]}/>

                );

                this.setState({
                    reviews: this.state.reviews.concat(reviewDivs)
                })
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    };

	render() {
		return (
			<div>
                <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
                    <InfiniteScroll
                        dataLength={this.state.reviews.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        loader={<h4>Loading...</h4>}
                        height={200}
                        endMessage={
                            <p style={{ textAlign: "center" }}>
                            <b>No More Reviews</b>
                            </p>
                        }
                    >
                        {this.state.reviews}
                    </InfiniteScroll>
                </div>
			</div>
			
		);
	}
}
