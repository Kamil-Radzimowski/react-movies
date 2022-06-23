import React from "react";

export const MovieCard = (props: any) => {
    return <div className="movie-card">
        <div className="movie-card-details">
            <div className="movie-card-details-title">{props.title}</div>
            <div className="movie-card-details-desc">{props.overview}</div>
        </div>
        <img alt={`${props.title} movie poster`} className="movie-card-img" src={`https://image.tmdb.org/t/p/original/${props.poster}`}></img>
    </div>
}
