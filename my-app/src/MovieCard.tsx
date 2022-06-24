import React from "react";
import {useNavigate} from "react-router-dom";

function MovieCard(props: any) {
    let navigate = useNavigate()

    async function navigateToMovie(){
        navigate(`/movie/${1}`)
    }

    return <div onClick={navigateToMovie} className="movie-card">
        <div className="movie-card-details">
            <div className="movie-card-details-title">{props.data.title}</div>
            <div className="movie-card-details-desc">{props.data.overview}</div>
        </div>
        <img alt={`${props.data.title} movie poster`} className="movie-card-img" src={`https://image.tmdb.org/t/p/original/${props.data.poster}`}></img>
    </div>
}

export default MovieCard;
