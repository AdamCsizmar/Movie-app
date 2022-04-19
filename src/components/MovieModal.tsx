import React from "react";
import { useEffect, useState } from "react";

export const MovieModal = (props: any) => {
  const [imdbID, setImdbID] = useState("");
  const [wikiID, setWikiID] = useState("");
  const [description, setDescription] = useState("");

  // const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_qk2yeze5/"    //key1
  // const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_hmwaaukp/"; //key2
  // const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_aaaaaaaa/"; //key2
  const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_8611ewms/"; //key2

  const wikiURL =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&indexpageids=1&redirects=1&formatversion=1&exsentences=10&exintro=1&explaintext=1&exsectionformat=plain&origin=*&titles=";
  const imdbPAGE_URL = "https://imdb.com/title/";
  const wikiPAGE_URL = "https://en.wikipedia.org/wiki?curid=";

  const fetchImdbID = async (title: string) => {
    const searchTitle = title.replaceAll(" ", "%20");

    try {
      const fetchID = await fetch(imdbURL + searchTitle);
      const response = await fetchID.json();
      const id = await response.results[0].id;
      setImdbID(id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWiki = async (title: string) => {
    const searchTitle = title.replaceAll(" ", "%20");

    fetch(wikiURL + searchTitle)
      .then((res) => res.json())
      .then((data) => {
        const id = data.query.pageids[0];
        const description = data.query.pages[id].extract;
        setWikiID(id);
        setDescription(description);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let modalStates = {
    isModalOpen: props.isModalOpen,
    setIsModalOpen: props.setIsModalOpen,
    modalContent: props.modalContent,
    setModalContent: props.setModalContent,
  };

  function searchForSimilars(id: any) {
    fetch("https://tmdb.sandbox.zoosh.ie/dev/grphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query getMovie {
                  movie(id: "${id}") {
                      name
                      similar {
                        id
                        name
                        releaseDate
                        genres {
                          name
                        }     
                        img: poster {
                          url:custom(size:"w185_and_h278_bestv2")
                        }
                        score
                      } 
                  }
              }
          `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const searchState = "Silimar movies to: " + data.data.movie.name;
        const movies = data.data.movie.similar;
        props.setIsModalOpen(false);
        props.setModalContent(null);
        if (movies.length) {
          props.setMovies([]);
          props.setIsLoading(true);

          props.setSearchState(searchState);
          props.setMovies(movies);
          props.setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    const fetchMovieData = async (title: string) => {
      await fetchImdbID(title);
      await fetchWiki(title);
    };
    (async () => await fetchMovieData(modalStates.modalContent.name))();
  }, [modalStates.modalContent]);
  return (
    <>
      <div
        className="blocker"
        onClick={() => {
          props.setIsModalOpen(false);
          props.setModalContent(null);
        }}
      >
        <div className="modal">
          <section className="modal-info">
            <div className="movie-poster">
              <img
                className="modal-img"
                src={modalStates.modalContent.imgLink}
                alt={modalStates.modalContent.name}
              />
            </div>
            <div className="right-side">
              <div className="initial-info">
                <div className="main-info">
                  <h3 className="modal-title">
                    {modalStates.modalContent.name}
                  </h3>
                  <h5 className="modal-date">
                    {modalStates.modalContent.releaseDate}
                  </h5>
                </div>
                <div className="additional-info">
                  <p className="modal-genre">
                    {modalStates.modalContent.genre}
                  </p>
                  <p className="modal-score">
                    {modalStates.modalContent.score}
                  </p>
                </div>
              </div>
              <div className="description">
                {description ? (
                  <p>{description}</p>
                ) : (
                  <div className="desc-loader"></div>
                )}
              </div>
            </div>
          </section>
          <section className="button-section">
            <div className="related-links">
              <a href={imdbPAGE_URL + imdbID} target="_blank" rel="noreferrer">
                <span>IMDB</span>
              </a>
              <a href={wikiPAGE_URL + wikiID} target="_blank" rel="noreferrer">
                <span>Wikipedia</span>
              </a>
            </div>
            <button
              className="similar-btn"
              onClick={() => {
                searchForSimilars(modalStates.modalContent.id);
              }}
            >
              See similar movies
            </button>
          </section>
        </div>
      </div>
    </>
  );
};
