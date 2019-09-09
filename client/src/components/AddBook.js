import React, { Component } from 'react';

// third party libraries
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';

// query
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

class AddBook extends Component {
  state = {
    book: {
      name: '',
      genre: '',
      authorID: ''
    }
  };

  /**
   * This method is used to update the state with the values for input
   *
   * @returns{Function}
   *
   * @memberof AddBook
   */
  updateState = () => (event) => {
    event.persist();
    const { name, value } = event.target;
    this.setState((prevstate) => ({
      ...prevstate,
      book: { ...prevstate.book, [name]: value }
    }));
  };

  /**
   * This method is responsible for displaying a authors in the select
   * element
   *
   * @returns{JSX}
   *
   * @memberof AddBook
   */
  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;

    if (data.loading) {
      return <option disabled>Loading Authors..</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  /**
   * This method is used to send a book to be saved
   *
   * @param{Event} e event
   *
   * @returns {void}
   *
   * @memberof AddBook
   */
  submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: this.state.book,
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label htmlFor="name">Book Name:</label>
          <input type="text" name="name" onChange={this.updateState()} />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre:</label>
          <input type="text" name="genre" onChange={this.updateState()} />
        </div>
        <div className="field">
          <label htmlFor="authorID">Author:</label>
          <select name="authorID" onChange={this.updateState()}>
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
