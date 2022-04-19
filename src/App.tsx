import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { MovieContainer } from "./components/MovieContainer";
import { MovieModal } from "./components/MovieModal";

function App() {
  const [searchState, setSearchState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [movies, setMovies] = useState([]);

  return (
    <div className="App">
      <Header
        setSearchState={setSearchState}
        movies={movies}
        setMovies={setMovies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {isModalOpen && (
        <MovieModal
          setSearchState = {setSearchState}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setMovies={setMovies}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalContent={modalContent}
          setModalContent={setModalContent}
        ></MovieModal>
      )}
      <div className="content-wrapper">
        <div className="content">
          {movies && searchState && <h2 className="searchState">{searchState}</h2>}
          {!movies.length && isLoading && <LoadingScreen />}
          {!movies.length && !isLoading && <WelcomeScreen />}
          {movies && (
            <MovieContainer
              movies={movies}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              modalContent={modalContent}
              setModalContent={setModalContent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
