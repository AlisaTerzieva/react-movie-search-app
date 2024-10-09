import "./MovieCard.css";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w200/';
    return (
        <Link to={`/details/${movie.id}`}>
            <article className="movie-card">
                <h2>{movie.title}</h2>
                <h3>Date Released: {movie.releaseDate}</h3>
                <img src={posterBaseUrl + movie.poster} />
            </article>
        </Link>
    )
}