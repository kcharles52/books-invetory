import React, { Component } from 'react';

// third party libraries
import {gql} from 'apollo-boost';
import { graphql } from "react-apollo";

// query
const getBooksQuery = gql`
{
  books{
    name
    id
  }
}
`

class BookList extends Component {
  displayBooks = () => {
    const {data} = this.props

    if(data.loading){
      return(
        <div>Loading Books ....</div>
      )
    } else {
      return data.books.map(book =>{
        return(
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book name</li>
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
