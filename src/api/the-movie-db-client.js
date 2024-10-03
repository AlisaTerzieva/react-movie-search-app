const baseMovieUrl = 'https://api.themoviedb.org/3/';
const searchMovieEndpoint = 'search/movie?query=';
const topRatedMoviesEndpoint = 'movie/top_rated?page=';
const apiToken = import.meta.env.VITE_THE_MOVIE_DB_API_TOKEN;

const getMoviesWithSearchPhrase = (searchPhrase) => {
    return fetch(baseMovieUrl + searchMovieEndpoint + searchPhrase, {
        headers: {
          Authorization: 'Bearer ' + apiToken
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("HTTP Search request failed with status code: ", response.status)
      })
      .then(data => {
        if (!data) {
          throw new Error("Movie Data not found!");
        }
        const parsedData = data.results.map(res => ({id: res.id, title: res.title, overview: res.overview, poster: res.poster_path, releaseDate: res.release_date}));
        return parsedData;
      });
}

const getTopRatedMoviesWeek = (pageNumber = 1) => {
    return fetch(baseMovieUrl + topRatedMoviesEndpoint + pageNumber, {
        headers: {
          Authorization: 'Bearer ' + apiToken
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("HTTP Search request failed with status code: ", response.status)
      })
      .then(data => {
        if (!data) {
          throw new Error("Movie Data not found!");
        }
        const parsedData = data.results.map(res => ({id: res.id, title: res.title, overview: res.overview, poster: res.poster_path, releaseDate: res.release_date}));
        return parsedData;
      });
}

export {getMoviesWithSearchPhrase, getTopRatedMoviesWeek};