import React, { Component } from 'react';

// third party libraries
import { graphql } from 'react-apollo';

// query
import { getBookQuery } from '../queries';

class BookDetails extends Component {
  displayBook = () => {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>Other books by the author</p>
          <ul>
            {book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (<p>No book selected</p>)
    }
  };

  render() {
    return (
      <div>
        {this.displayBook()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return { variables: { id: props.bookId } };
  }
})(BookDetails);
