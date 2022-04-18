// const TMDB_API_URL = "https://tmdb.sandbox.zoosh.ie/dev/grphql";
// const IMDB_API_SEARCH_URL = "https://imdb-api.com/en/API/Search/";
// const IMDB_API_KEY = "k_qk2yeze5";

// export const getImdbData = async (URI: string) => {
//   let fetchURL = IMDB_API_SEARCH_URL + IMDB_API_KEY + URI;
//   console.log(fetchURL);
//   await fetch("fetchURL", {
//     method: "GET",
//     headers: {
//       "Accept": "*/*",
//       "Content-Type": "application/json",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Connection": "keep-alive",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       if (err) console.error(err);
//     });
// };

// const fightClub = await getImdbData("Fight%20Club");
// console.log(fightClub);
// console.log('MIVAN')
// export const getData = async (URI: string) => {
//   try {
//     const fetchURL =  IMDB_API_SEARCH_URL + "/" + IMDB_API_KEY + "/" + URI;

//     const params = {
//       method: "GET",
//       headers: {
//         "Accept": "*/*",
//         "Content-Type": "application/json",
//         "Accept-Encoding": "gzip, deflate, br",
//         "Connection": "keep-alive",
//       }
//     };

//     const response = await fetch(fetchURL, params);
//     const data: any = await response.json();
//     return data;

//   } catch (err) {
//     console.error(err);
//   }
// };

// const test = await getData("Fight Club")
// console.log(test)
