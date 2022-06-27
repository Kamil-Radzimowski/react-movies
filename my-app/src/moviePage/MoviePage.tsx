import React, {useEffect, useState} from "react";
import config from "../Util/Config";
import {useNavigate, useParams} from "react-router-dom";
import '../assets/styleMoviePage.scss';
import movie_logo from "../assets/the-movie-db-logo.svg";
import { Gradient } from 'react-gradient';
import {Rating} from "@mui/material";
import { useGetMovieDetailsByIdQuery } from "../Util/MovieService";



const MoviePage = () => {
    const {movieId} = useParams<{ movieId: string }>()
    const navigate = useNavigate()
    const gradient = config.getGradient()

    const { data, error, isLoading} = useGetMovieDetailsByIdQuery(movieId || "")

    useEffect(() => {
        // console.log(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.getApiKey()}&language=pl`)
    }, [])

    function navigateToMainPage() {
        navigate('/')
    }

    return (
        <div className="Page">
            <div className="page-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                {isLoading ? null : <div className="page-nav-title">{`${data?.title}`}</div>}
            </div>
            {isLoading ? null : <div className="page-content">
                <img src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}></img>
                <div className="text-content">
                    <div className="top-content">
                        {data?.genres.map((genre) => {return (<Gradient className='genre' key={genre.id} gradients={gradient} property='background' angle='0deg'>{`${genre.name}`}</Gradient>)})}
                        <Rating className='rating' readOnly value={(data?.vote_average ?? 0) / 2} precision={0.25}></Rating>
                    </div>
                    <div className="desc">{`${data?.overview}`}</div>
                    <div className='production-country'>{`Kraj Produkcji: ${data?.production_countries.reduce((acc, current, index) => {
                        if(index == 0) {
                            return acc.concat(current.name)
                        }
                        else{
                           return acc.concat(', ').concat(current.name)
                        }
                    }, "")}`}</div>
                </div>
            </div>}
        </div>
    )
}


export default MoviePage;
