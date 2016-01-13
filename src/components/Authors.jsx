import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

const Authors = React.createClass({
  authorList: function() {
    const authorsObject = this.props.books.reduce((authors, books) => {
      const { author } = books;
      if ( authors[author] ) {
        authors[author] += 1;
      } else {
        authors[author] = 1;
      }
      return authors;
    }, {});
    return Object.keys(authorsObject).map(key => ({
      author: key,
      books: authorsObject[key]
    }));
  },
  authorLi: function(author, index) {
    const books = author.books !== 1 ? "books": "book";
    return (
      <li key={index}>
        <Link to={{pathname: `author/${author.author}`}}>{author.author}</Link>
        {` - ${author.books} ${books}`}
      </li>
    );
  },
  render: function() {
    const authors = this.authorList().map((a,i) => this.authorLi(a,i));
    return (
      <div>
        <div className="breadcrumbs">
          <Link to={{pathname: "/"}}>Home</Link>
        </div>
        <h1>Authors</h1>
        <ul>
          {authors}
        </ul>
      </div>
    );
  }
});

export default connect(
  state => ({books: state.books})
)(Authors);
