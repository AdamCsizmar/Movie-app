import React from "react";

interface MovieCard {
  id: string;
  name: string;
  releaseDate: string | null;
  score: number;
  img: {
    url: string | null;
  };
  genres: [{ name: string }] | [];
}

export const MovieContainer = (props: {
  movies: any;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: any;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return props.movies.map((movie: MovieCard, key: number) => {
    const movieInfo = {
      id: movie.id,
      name: movie.name,
      releaseDate: movie.releaseDate
        ? movie.releaseDate.slice(0, 4)
        : "Unknown",
      genre: movie.genres.length ? movie.genres[0].name : "Uncategorized",
      score: movie.score,
      imgLink: movie.img ? movie.img.url : "",
    };

    return (
      <div
        className="movie-card"
        onClick={() => {
          props.setIsModalOpen(true);
          props.setModalContent(movieInfo);
        }}
        key={key}
      >
        <div className="movie-poster">
          <img
            src={movieInfo.imgLink ? movieInfo.imgLink : undefined}
            alt={movieInfo.name}
          />
        </div>
        <div className="movie-info">
          <div className="main-info">
            <h5 className="movie-title">{movieInfo.name}</h5>
            <h6 className="movie-date">{movieInfo.releaseDate ?? "-"}</h6>
          </div>
          <div className="additional-info">
            <p className="movie-genre">{movieInfo.genre}</p>
            <p className="movie-score">{movieInfo.score}</p>
          </div>
        </div>
      </div>
    );
  });
};
