import React from "react";

export const MovieCard = (props: any) => {
    return <div className="movie-card">
        <div className="movie-card-title">{props.title}</div>
        <img alt={`${props.title} movie poster`} className="movie-card-img" src={`https://image.tmdb.org/t/p/original/${props.poster}`}></img>
    </div>
}
