import React, { Component } from 'react';

// third party libraries
import { graphql } from "react-apollo";

// component
import BookDetails from './BookDetails';

// query
import { getBooksQuery } from "../queries";

class BookList extends Component {

  state = {
    selectedID: null,
  }

  /**
   * This method is used to display a list of books
   * 
   * @returns{JSX}
   *
   * @memberof BookList
   */
  displayBooks = () => {
    const {data} = this.props

    if(data.loading){
      return(
        <div>Loading Books ....</div>
      )
    } else {
      return data.books.map(book =>{
        return(
          <li key={book.id} onClick={this.setSelectedId(book.id)}>{book.name}</li>
        )
      })
    }
  }

  /**
   * This method is used to set the book ID into the state
   * 
   * @param{String} BookID
   * 
   * @returns{Function}
   *
   * @memberof BookList
   */
  setSelectedId = (BookID) => ()=> {
    this.setState({selectedID: BookID})
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book name</li>
          {this.displayBooks()}
          {!!this.state.selectedID && <BookDetails bookId={this.state.selectedID} />}
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
