import React from "react";

const MovieCard = ({ movie:
    { title, vote_average, poster_path, release_date, original_language }
}) => {

    return (
        <div className="movie-card">
            <div>
                <img
                    className="movie-poster"
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        :
                        './no-movie.png'} alt={title}

                />
                <div>
                    <h3>{title}</h3>
                    <div>
                        <div className="card-content">
                            <img src="star.svg" alt="Star Icon" />
                            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                            <span className="dot">•</span>
                            <p>{original_language}</p>
                            <span className="dot">•</span>
                            <p>
                                {release_date ? release_date.split('-')[0] : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MovieCard;