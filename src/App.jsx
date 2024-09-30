import { useState } from 'react'
import './App.css'
import { MovieCard } from './MovieCard.jsx';

const baseMovieUrl = 'https://api.themoviedb.org/3/';
const searchMovieEndpoint = 'search/movie?query=';
const apiKey = '&api_key=a14ce3ab36df0507c12c4c5e0daca057';

function App() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [movieData, setMovieData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchPhrase(event.target.value);
  }

  const handleSearchClick = () => {
    fetch(baseMovieUrl + searchMovieEndpoint + searchPhrase + apiKey)
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
      setMovieData(parsedData);
      console.log(parsedData)
    })
    .catch(error => console.log(error));
  }

  return (
    <>
      <h1>Welcome to the Movie Search App!</h1>
      <input type='text' name='search' value={searchPhrase} onChange={handleSearchChange}/>
      <button style={{marginLeft: '10px'}} onClick={handleSearchClick}>Search!</button>
      <div style={{maxWidth: '500px'}}>
        {movieData && movieData.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
    </>
  )
}

export default App
