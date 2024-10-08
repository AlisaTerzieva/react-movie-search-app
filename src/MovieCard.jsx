export const MovieCard = ({movie}) => {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w200/';
    return (
        <article className="movie-card">
            <h2>{movie.title}</h2>
            <p>Date Released: {movie.releaseDate}</p>
            <img src={posterBaseUrl + movie.poster} />
            <p style={{textWrap: 'balance'}}>Overview {movie.overview}</p>
        </article>
    )
}