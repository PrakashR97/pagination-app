import React, { Component } from "react";
//import { getMovies } from "./services/fakeMovieService";
import Table from "../Table";
import axios from "axios";
class Movie1 extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }
  //api call
  componentDidMount() {
    // fetch("http://localhost:3004/movies")
    //   .then((res) => res.json())
    //   .then((res) => this.setState({ movies: res }));
    axios.get(`http://localhost:3004/movies`).then((res) => {
      const movie = res.data;
      this.setState({ movies: movie });
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((mov) => mov._id !== movie._id);
    console.log(movies);
    this.setState({ movies: movies });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There is no Movie in the server</p>;

    return (
      <>
        <Table movies={this.state.movies} clickMe={this.handleDelete} />
        <p>Showing {this.state.movies.length} movies in the base</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie, index) => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movie1;
