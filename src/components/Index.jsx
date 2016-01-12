import React from "react";

import GenreFilter from "./GenreFilter";
import Stats from "./Stats";
import Showcase from "./Showcase";

export default React.createClass({
  contextTypes: {
    books: React.PropTypes.array
  },  
  render: function() {
    const { books } = this.context;
    return (
      <div>
        <GenreFilter filter="all" />
        <Stats books={books} />
        <Showcase books={books} />
      </div>
    );
  }
});