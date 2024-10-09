import { useState, useEffect } from "react";
import { getList } from "./api/the-movie-db-client.js";
import { MovieCard } from "./MovieCard.jsx";

const MovieList = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getList({pageNumber, searchPhrase})
        .then(data => {
            if (data) {
            setMovieData(prevData => [...prevData, ...data]);
            } else {
                // TODO: Handle Retry logic, may require refactoring of the API client
            }
        })
        .finally(() => setIsLoading(false));
    }, [pageNumber]);

    useEffect(() => {
        window.addEventListener('scroll', handlePageScroll);

        return () => window.removeEventListener('scroll', handlePageScroll);
    });

    const handleSearchChange = (event) => {
        setSearchPhrase(event.target.value);
        setPageNumber(1);
        setMovieData([]);
    }

    const handleSearchClick = () => {
        const queryParams = {
        searchPhrase,
        pageNumber
        }
        
        getList(queryParams)
        .then(data => {
        // TODO: Include data checks
        setMovieData(data);
        });
    }

    const handlePageScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 500 && !isLoading) {
        setPageNumber(num => num + 1);
        setIsLoading(true);
        }
    }

    return (
        <>
        <h1>Welcome to the Movie Search App!</h1>
        <input className='search-input' type='text' name='search' value={searchPhrase} onChange={handleSearchChange}/>
        <button className='search-btn' onClick={handleSearchClick}>Search!</button>
        <div className='movie-cards'>
            {movieData && movieData.map((movie, index) => <MovieCard key={index} movie={movie}/>)}
        </div>
        {isLoading && <div>LOADING... {pageNumber}</div>}
        </>
    )
}

export {MovieList};