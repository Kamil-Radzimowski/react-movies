import React from "react";
import { Gradient } from 'react-gradient';
import './styleMovieListItem.scss';
import config from "../Util/Config";
import {useNavigate} from "react-router-dom";
import {movie} from "../Util/types";

type property = {
    data : movie;
}

function MovieListItem(props: property) {
    const navigate = useNavigate()
    let desc = props.data.overview
    if(desc == ''){
        desc = 'Brak opisu'
    }

    const gradient = config.getGradient()

    function navigateToMovieDetails(id: number){
        navigate(`/movie/${id}`)
    }

    return (
        <div className="item">
            <img alt={`${props.data.title} movie poster`} className="item-img" src={`http://localhost:3000/movie/poster/${props.data.poster_path}`}></img>
            <div className="item-data">
                <div className="item-title">
                    <div className="title">{`${props.data.title}`}</div>
                    <Gradient className='popularity' gradients={gradient} property='background' angle='0deg'>{`Popularność: ${props.data.popularity}`}</Gradient>
                    <Gradient className='vote-num' gradients={gradient} property='background' angle='0deg'>{`Liczba głosów ${props.data.vote_count}`}</Gradient>
                    <Gradient className='more' onClick={() => {navigateToMovieDetails(props.data.id)}} gradients={gradient} property='background' angle='0deg'>Więcej...</Gradient>
                </div>
                <div className="item-desc">{`${desc}`}</div>
            </div>
        </div>
    )
}


export default MovieListItem;
