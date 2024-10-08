import './MovieDetails.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "./api/the-movie-db-client";
import { Spinner } from './Spinner';


const MovieDetails = () => {
    const [movieData, setMovieData] = useState({});
    const [loading, setLoading] = useState(true);

    const {id} = useParams();
    if (!id) throw new Error("Movie ID not found!");
    const movieId = parseInt(id);

    useEffect(() => {
        getDetails(movieId)
        .then((data) => {setMovieData(data)})
        .finally(() => setLoading(false));
    }, []);

    return loading ?
        <Spinner/> :
    <>
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