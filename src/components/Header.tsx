import React from "react";

export const Header = (props: any) => {
  const tmdb_URL = "https://tmdb.sandbox.zoosh.ie/dev/grphql";

  const searchMovies = async (searchTerm: string) => {
    const searchQuery = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
              query SearchMovies {
                  searchMovies(query: "${searchTerm}") {
                      id
                      name
                      releaseDate
                      genres {
                        name
                      }
                      img: poster {
                        url: custom(size: "w185_and_h278_bestv2")
                      }
                      score
                    }
              }
          `,
      }),
    };

    fetch(tmdb_URL, searchQuery)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const movies = data.data.searchMovies;
        !movies.length && props.setIsLoading(false) && props.setMovies([]);
        if (movies.length) {
          props.setMovies(movies);
          props.setIsLoading(false);
          props.setSearchState("Search results for: " + searchTerm);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();
    let searchTerm = event.currentTarget.searchInput.value;
    props.setMovies([]);
    props.setIsLoading(true);
    props.setSearchState(null);
    let responses = await searchMovies(searchTerm);

    console.log(responses);
  };

  return (
    <header className="header">
      <form onSubmit={handleSearch} className="search-form">
        <input
          id="searchInput"
          className="searchInput"
          type="text"
          placeholder="Search for a moviefrom header"
        />
        <button className="search-btn" type="submit">
          🔎
        </button>
      </form>
    </header>
  );
};
