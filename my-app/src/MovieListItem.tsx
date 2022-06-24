import React from "react";
import { Gradient } from 'react-gradient';
import './assets/styleMovieListItem.scss';

const gradient = [
    ['#90cea1', '#01b4e4'],
]

function MovieListItem(props) {
    return (
        <div className="item">
            <img alt={`${props.data.title} movie poster`} className="item-img" src={`https://image.tmdb.org/t/p/original/${props.data.poster}`}></img>
            <div className="item-data">
                <div className="item-title">
                    <div className="title">{`${props.data.title}`}</div>
                    <Gradient className='popularity' gradients={gradient} property='background' angle='0deg'>{`Popularność: ${props.data.popularity}`}</Gradient>
                    <Gradient className='vote-num' gradients={gradient} property='background' angle='0deg'>{`Liczba głosów ${props.data.vote_count}`}</Gradient>
                    <Gradient className='more' gradients={gradient} property='background' angle='0deg'>Więcej...</Gradient>
                </div>
                <div className="item-desc">{`${props.data.overview}`}</div>
            </div>
        </div>
    )
}


export default MovieListItem;
