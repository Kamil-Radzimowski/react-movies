import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "../Config";
import {useNavigate, useParams} from "react-router-dom";
import '../assets/styleMoviePage.scss';
import movie_logo from "../assets/the-movie-db-logo.svg";
import { Gradient } from 'react-gradient';

type data = {
    title: string,
    poster: string,
    overview: string,
    popularity: number,
    vote_count: number,
    genres: genre[],
    production_countries: [],
}

type genre = {
    id: number,
    name: string,
}

function MoviePage(){
    const [data, setData] = useState({} as data)
    const [isDataLoading, setIsDataLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    const gradient = config.getGradient()

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${config.getApiKey()}&language=pl`).then((r) => {
            const data = {
                title: r.data.title,
                poster: r.data.poster_path,
                overview: r.data.overview,
                popularity: r.data.popularity,
                vote_count: r.data.vote_count,
                genres: r.data.genres,
                production_countries: r.data.production_countries,
            }
            setData(data)
            setIsDataLoading(false)
        })
    }, [])

    function navigateToMainPage() {
        navigate('/')
    }

    return (
        <div className="Page">
            <div className="page-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                {isDataLoading ? null : <div className="page-nav-title">{`${data.title}`}</div>}
            </div>
            {isDataLoading ? null : <div className="page-content">
                <img src={`https://image.tmdb.org/t/p/original/${data.poster}`}></img>
                <div className="text-content">
                    {data.genres.map((genre) => {return (<Gradient className='genre' gradients={gradient} property='background' angle='0deg'>{`${genre.name}`}</Gradient>)})}
                    <div className="desc">{`${data.overview}`}</div>
                </div>
            </div>}
        </div>
    )
}


export default MoviePage;
