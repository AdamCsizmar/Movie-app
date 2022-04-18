import React from "react";

interface MovieCard {
  id: string;
  name: string;
  releaseDate: string;
  score: number;
  img: {
    url: string | null;
  };
  genres: [{ name: string }];
}

// interface ModalStates {
//   isModalOpen: boolean;
//   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   modalContent: any;
//   setModalContent: React.Dispatch<any>;
// }

export const MovieContainer = (props: {
  movies: any;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: any;
  setModalContent: React.Dispatch<React.SetStateAction<any>>;
}) => {
  console.log(props.isModalOpen);
  console.log(props.modalContent);

  // console.log(modalStates)
  // const handleModalOpen = (movieInfo: {}):
  //   | React.MouseEventHandler<HTMLDivElement>
  //   | undefined => {
  //     // console.log(props.isModalOpen)
  //   // console.log(movieInfo);
  //   // props.setModalContent(movieInfo);
  //   // props.setIsModalOpen(true);
  //   // console.log(movieInfo);
  //   // let modalStates = {
  //   //   isModalOpen: props.modalStates.isModalOpen,
  //   //   setIsModalOpen: props.modalStates.setIsModalOpen,
  //   //   modalContent: props.modalStates.modalContent,
  //   //   setModalContent: props.modalStates.setModalContent,
  //   // };
  //   return () => console.log(movieInfo)
  //     // console.log("INNER" + modalStates;
  // };
  return props.movies.map((movie: MovieCard, key: number) => {
    const movieInfo = {
      id: movie.id,
      name: movie.name,
      releaseDate: movie.releaseDate.slice(0, 4),
      genre: movie.genres[0].name,
      score: movie.score,
      imgLink: movie.img.url || "",
    };

    // useEffect(() => {
    // });

    return (
      <div
        className="movie-card"
        onClick={() => {
          props.setIsModalOpen(true)
          props.setModalContent(movieInfo);
        }}
        key={key}
      >
        <div className="movie-poster">
          <img src={movieInfo.imgLink} alt={movieInfo.name} />
        </div>
        <div className="movie-info">
          <div className="main-info">
            <h5 className="movie-title">{movieInfo.name}</h5>
            <h6 className="movie-date">{movieInfo.releaseDate}</h6>
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
export default MovieContainer;

// const handleModalOpen = (movieInfo: {}):
//   | React.MouseEventHandler<HTMLDivElement>
//   | undefined => {
//   // console.log(movieInfo);
//   console.log(movieInfo);
//   // let modalStates = {
//   //   isModalOpen: props.isModalOpen,
//   //   setIsModalOpen: props.setIsModalOpen,
//   //   modalContent: props.modalContent,
//   //   setModalContent: props.setModalContent,
//   // };
//   return () => console.log("INNER");
// };
