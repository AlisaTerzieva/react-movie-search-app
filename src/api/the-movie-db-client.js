const baseMovieUrl = 'https://api.themoviedb.org/3/';
const searchMovieEndpoint = 'search/movie?query=';
const topRatedMoviesEndpoint = 'movie/top_rated?';
const movieDetailsEndpoint = 'movie/';
const pageNumberParam = 'page='
const apiToken = import.meta.env.VITE_THE_MOVIE_DB_API_TOKEN;

const getList = (queryParams) => {
  let endpoint;
  if (queryParams.searchPhrase) {
    endpoint = `${searchMovieEndpoint}${queryParams.searchPhrase}&${pageNumberParam}${queryParams.pageNumber}`;
  } else {
    endpoint = `${topRatedMoviesEndpoint}${pageNumberParam}${queryParams.pageNumber}`
  }

  return fetch(baseMovieUrl + endpoint, {
      signal: AbortSignal.timeout(5000),
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
    })
    .catch(err => console.log(err));
}

const getDetails = (id) => {
  return fetch(baseMovieUrl + movieDetailsEndpoint + id, {
      signal: AbortSignal.timeout(5000),
      headers: {
        Authorization: 'Bearer ' + apiToken
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("HTTP request for movie details failed with status code: ", response.status)
    })
    .then(data => {
      if (!data) {
        throw new Error("Movie Details not found!");
      }
      console.log(data);
      const parsedData = {genres: data.genres, overview: data.overview, title: data.title, companies: data.production_companies, budget: data.budget};
      return parsedData;
    })
    .catch(err => console.log(err));
}

export {getList, getDetails};