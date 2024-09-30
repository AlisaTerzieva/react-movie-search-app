export const MovieCard = ({movie}) => {
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w200/';
    return (
        <div style={{padding: '20px', backgroundColor: 'deeppink', margin: '40px'}}>
            <h3>Title: {movie.title}</h3>
            <p>Date Released: {movie.releaseDate}</p>
            <img src={posterBaseUrl + movie.poster} />
            <p style={{textWrap: 'balance'}}>Overview {movie.overview}</p>
        </div>
    )
}