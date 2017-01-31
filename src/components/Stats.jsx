import React from 'react';

import { Link } from 'react-router-dom';
import BarChart from './OrdinalBarChart';
import { genresByCount, mostPopularAuthors } from 'helpers/counts';
import { genreMap } from 'constants/genres';

import 'sass/stats.scss';

export default ({ books }) => (
  <div className='stats'>
    <GenreBarChart books={books} />
    <PopularAuthors books={books} />
  </div>
);

function GenreBarChart(props) {
  const { books } = props;
  if ( books.length === 0 ) {
    return null;
  }
  const genreCounts = genresByCount(books);
  // don't bother with a bar chart when there is only one class
  if ( genreCounts.length <= 1 ) {
    return null;
  }
  return (
    <div className='bars'>
      <h2>Books per Genre</h2>
      <BarChart
        data={genreCounts}
        getX={d => d.genre}
        getY={d => d.count} />
    </div>
  );
}

function PopularAuthors(props) {
  const { books } = props;
  if ( books.length === 0 ) {
    return null;
  }
  return (
    <div className='authors'>
      <h2>Most Read Authors</h2>
      <ol>
        {
          mostPopularAuthors(books)
            .map((a,i) =>
              <li key={i}>
                <Link to={`/author/${a.author}`}>{a.author}</Link>
              </li>
            )
        }
      </ol>
    </div>
  );
}
