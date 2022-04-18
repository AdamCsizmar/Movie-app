import React, { useEffect, useState } from "react";
import "./App.css";
import { MovieModal } from "./components/MovieModal";
import { MovieContainer } from "./components/MovieContainer";

function App() {
  const [searchState, setSearchState] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [movies, setMovies] = useState([
    {
      id: "550",
      name: "Fight Club",
      releaseDate: "1999-10-15T00:00:00.000Z",
      score: 8.4,
      img: {
        url: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      },
      genres: [
        {
          name: "Drama",
        },
      ],
    },
    {
      id: "347807",
      name: "Fight Club: Members Only and only",
      releaseDate: "2006-02-17T00:00:00.000Z",
      score: 3.4,
      img: {
        url: null,
      },
      genres: [
        {
          name: "Action",
        },
      ],
    },
    {
      id: "883656",
      name: "GCW Fight Club",
      releaseDate: "2021-10-09T00:00:00.000Z",
      score: 0,
      img: {
        url: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/a9RWdhRLyx3BqCjlwmZJHXyeMkR.jpg",
      },
      genres: [
        {
          name: "Drama",
        },
      ],
    },
    {
      id: "51021",
      name: "Lure: Teen Fight Club",
      releaseDate: "2010-11-16T00:00:00.000Z",
      score: 5.4,
      img: {
        url: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/ipl6NdM0LwyakzLH9gKBDn8YhmZ.jpg",
      },
      genres: [
        {
          name: "Drama",
        },
      ],
    },
    {
      id: "883656",
      name: "GCW Fight Club",
      releaseDate: "2021-10-09T00:00:00.000Z",
      score: 0,
      img: {
        url: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/a9RWdhRLyx3BqCjlwmZJHXyeMkR.jpg",
      },
      genres: [
        {
          name: "Drama",
        },
      ],
    },
  ]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    let searchTerm = event.currentTarget.searchInput.value;
    if (searchTerm) {
      setSearchState(searchTerm);
      console.log("Handle query: " + searchTerm);
    } else console.log("Nope, no muy bien");
  };

  useEffect(() => {
    console.group('APP STATE')
    console.log(modalContent)
    console.log(isModalOpen)
    console.groupEnd()
  }, [modalContent])

  return (
    <div className="App">
      <header className="header">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            id="searchInput"
            className="searchInput"
            type="text"
            placeholder="Search for a movie"
          />
          <button className="search-btn" type="submit">
            🔎
          </button>
        </form>
      </header>

      {isModalOpen && (
        <MovieModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={modalContent}
          setModalContent={setModalContent}
        ></MovieModal>
      )}
      {/* <MovieModal modalContent = {modalContent}></MovieModal> */}

      <div className="content">
        <MovieContainer
          movies={movies}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={modalContent}
          setModalContent={setModalContent}
        />
      </div>
    </div>
  );
}

export default App;
