import React from "react";
import './assets/styleMovieListItem.scss';

function MovieListItem(props) {
    return (
        <div className="item">
            <img alt={`${props.data.title} movie poster`} className="item-img" src={`https://image.tmdb.org/t/p/original/${props.data.poster}`}></img>
            <div className="item-data">
                <div className="item-title">{`${props.data.title}`}</div>
                <div className="item-desc">{`${props.data.overview}`}</div>
            </div>
        </div>
    )
}


export default MovieListItem;
