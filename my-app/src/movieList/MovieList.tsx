import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../assets/styleMovieList.scss';
import movie_logo from "../assets/the-movie-db-logo.svg";
import config from "../Util/Config";
import { Gradient } from 'react-gradient';
import CircularProgress from "@mui/material/CircularProgress";
import MovieListItem from "./MovieListItem";
import {useGetMovieByNameQuery} from "../Util/MovieService";


function MovieList() {
    // const [movies, setMovies] = useState([] as movie[])
    // const [areMoviesLoaded, setMoviesLoaded] = useState(false)
    const params = useParams<{ input: string }>()
    const { data, error, isLoading } = useGetMovieByNameQuery(params.input || "")
    const gradient = config.getGradient()
    const navigate = useNavigate()

    function navigateToMainPage() {
        navigate('/')
    }


    return (
        <div className="Main">
            <div className="top-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                <div className="nav-input-text">{`Wyniki wyszukiwania dla ${params.input}`}</div>
            </div>
            {isLoading ?  <CircularProgress className="list-loading"/> : <div className="list-wrapper">
                {(data || []).length > 0 ? <div className="list">
                    <Gradient className='list-results-num' gradients={gradient} property='text' angle='45deg'>{`Znaleziono ${(data || []).length} wyników`}</Gradient>
                    {data?.map((movieData) => {return <MovieListItem key={movieData.id} data={movieData}/>})}
                </div> : <Gradient className='list-empty-text' gradients={gradient} property='text' angle='45deg'>Brak wyników dla podanej frazy</Gradient>}
            </div> }

        </div>
    )
}

export default MovieList;
