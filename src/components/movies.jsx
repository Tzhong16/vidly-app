import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genre' }, ...getGenres()];
    this.setState({ genres, movies: getMovies() });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = movies[index].liked === true ? false : true;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      selectGenre,
      pageSize,
      currentPage,
      sortColumn
    } = this.state;

    const filterMovies =
      selectGenre && selectGenre._id
        ? allMovies.filter(m => selectGenre._id === m.genre._id)
        : allMovies;

    const sorted = _.orderBy(
      filterMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    // return { filterMovies.length, movies };
    //const totalCount = filterMovies.length

    // obj destructuring
    return { totalCount: filterMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    if (count === 0) return <p>There are no movies in database.</p>;

    // if (!currentGenre) {
    //   let filetermovies = movies.filter(m => m.genre._id === currentGenre._id);
    //   console.log(filetermovies);
    //   var moviesfil = paginate(filetermovies, currentPage, pageSize);
    //   console.log(moviesfil);
    //   return moviesfil;
    // } else {
    //   var moviesfil = paginate(movies, currentPage, pageSize);
    //   return moviesfil;
    // }

    const { totalCount, data: movies } = this.getPageData();
    // const result = this.getPageData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              currentGenre={this.state.currentGenre}
              selectItem={this.state.selectGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies in database. </p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLiked={this.handleLiked}
              onDeleted={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              pageSize={pageSize}
              itemsCount={totalCount}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
