import React from "react";
import { useEffect, useState } from "react";

export const MovieModal = (props: any) => {
  const [imdbID, setImdbID] = useState("");
  const [wikiID, setWikiID] = useState("");
  const [description, setDescription] = useState("1231231231");

  // const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_qk2yeze5/"    //key1
  // const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_hmwaaukp/"; //key2
  // const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_aaaaaaaa/"; //key2
  const imdbURL = "https://imdb-api.com/en/API/SearchMovie/k_8611ewms/"; //key2

  const imdbPAGE_URL = "https://imdb.com/title/";
  const wikiURL =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&indexpageids=1&redirects=1&formatversion=1&exsentences=10&exintro=1&explaintext=1&exsectionformat=plain&origin=*&titles=";
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
      });
  };
  
    let modalStates = {
      isModalOpen: props.isModalOpen,
      setIsModalOpen: props.setIsModalOpen,
      modalContent: props.modalContent,
      setModalContent: props.setModalContent,
    }

  useEffect(() => {
    const fetchMovieData = async (title: string) => {
      await fetchImdbID(title);
      await fetchWiki(title);
     
      console.group('MODAL STATE')
      console.log(modalStates.modalContent)
      console.groupEnd()
    };
    (async () => await fetchMovieData(modalStates.modalContent.name))();
  }, [modalStates.modalContent]);
  return (
    <>
      <div className="blocker" onClick={
        () => {
          props.setIsModalOpen(false)
          props.setModalContent(null);
        }
      }>
        <div className="modal">
          <h1>{imdbID || "TEST TEST TEST"}</h1>
          <h2>{"Wiki id: " + wikiID}</h2>
          <button>
            {" "}
            <a href={imdbPAGE_URL + imdbID} target="_blank" rel="noreferrer">
              {imdbID || "waiting"}
            </a>{" "}
          </button>
          <button>
            {" "}
            <a href={wikiPAGE_URL + wikiID} target="_blank" rel="noreferrer">
              {wikiID || "waiting"}
            </a>{" "}
          </button>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};
