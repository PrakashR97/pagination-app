import { useState, useEffect } from "react";
import axios from "axios";
import { paginate } from "../utils/paginate";
import ListGroup from "../common/ListGroup";
import { getGenres } from "./fakeGenreService";

import Pagination from "../common/Pagination";

const Movie2 = () => {
  const [data, setData] = useState([]);
  const [pagesize, setPagesize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [geners, setGeners] = useState([]);
  const [selectedItemGen, setSelectedItemGen] = useState();
  useEffect(() => {
    const genres = [{ name: "All Generes", _id: "" }, ...getGenres()];
    axios.get(`http://localhost:3004/movies`).then((res) => setData(res.data));
    const gen = genres;
    setGeners(gen);
  }, []);

  //

  console.log(geners);
  const handleDelete = (movie) => {
    const movies = data.filter((mov) => mov._id !== movie._id);
    setData(movies);
  };

  const handlePageChange = (page) => {
    //                                                                    console.log(page);
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPagesize(size);
  };

  const handleGenersSelect = (gen) => {
    setCurrentPage(1);
    setSelectedItemGen(gen);
  };

  // console.log(data.length);

  if (data.length === 0) {
    return <p>There are no movies in the database</p>;
  }

  const filtered =
    selectedItemGen && selectedItemGen._id
      ? data.filter((m) => m.genre._id === selectedItemGen._id)
      : data;
  const movies = paginate(filtered, currentPage, pagesize);
  console.log(filtered);

  return (
    <>
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={geners}
            onItemSelect={handleGenersSelect}
            textProperty="name" //this is good pratice it our code independent
            valueProperty="_id"
            selectedItemGen={selectedItemGen}
          />
        </div>
        <div className="col-9">
          <h1>{data.title}</h1>
          <p>Showing {filtered.length} movies in the database</p>
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
              {movies.map((movie, index) => (
                <tr key={movie._id}>
                  <th>{movie.title}</th>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(movie)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pagesize}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Movie2;
