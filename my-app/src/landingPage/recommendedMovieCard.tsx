import React from "react";
import {useNavigate} from "react-router-dom";

type cardProps = {
    data: {
        id: number,
        title: string,
        popularity: number,
        poster: string,
        vote_count: number,
        overview: string,
    }
}

function RecommendedMovieCard(props: cardProps) {
    const navigate = useNavigate()

    function navigateToMovie(id: number){
        navigate(`/movie/${id}`)
    }

    return <div onClick={() => {navigateToMovie(props.data.id)}} className="movie-card">
        <div className="movie-card-details">
            <div className="movie-card-details-title">{props.data.title}</div>
            <div className="movie-card-details-desc">{props.data.overview.substring(0, 200).concat("...")}</div>
        </div>
        <img alt={`${props.data.title} movie poster`} className="movie-card-img" src={`https://image.tmdb.org/t/p/original/${props.data.poster}`}></img>
    </div>
}

export default RecommendedMovieCard;
