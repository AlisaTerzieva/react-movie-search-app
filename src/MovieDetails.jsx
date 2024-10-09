import './MovieDetails.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "./api/the-movie-db-client";


const MovieDetails = () => {
    const [movieData, setMovieData] = useState({});

    const {id} = useParams();
    if (!id) throw new Error("Movie ID not found!");
    const movieId = parseInt(id);

    useEffect(() => {
        getDetails(movieId)
        .then((data) => {setMovieData(data)});
    }, []);

    return <>
        <h1>{movieData.title}</h1>
        <h2>Budget: {movieData.budget}</h2>
        {movieData.companies && <div className="companies">
            <h3>Companies</h3>
            <ul>
                {movieData.companies.map(c => <li key={c.id}>{c.name}</li>)}
            </ul>
        </div>}
        <p>{movieData.overview}</p>
    </>
}

export {MovieDetails};