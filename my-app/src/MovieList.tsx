import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './assets/styleMovieList.scss';
import movie_logo from "./assets/the-movie-db-logo.svg";
import axios from "axios";
import config from "./Config";
import { Gradient } from 'react-gradient';
import CircularProgress from "@mui/material/CircularProgress";
import MovieListItem from "./MovieListItem";



function MovieList() {
    const [movies, setMovies] = useState([])
    const [areMoviesLoaded, setMoviesLoaded] = useState(false)
    const gradient = config.getGradient()
    let params = useParams()


    useEffect(() => {
        console.log(`https://api.themoviedb.org/3/search/movie?api_key=${config.getApiKey()}&query=${params.input}`)
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.getApiKey()}&query=${params.input}&language=pl`).then(r => {
            setMoviesLoaded(true)
            const data = r.data.results.map((entry) => {
                return {
                    id: entry.id,
                    title: entry.title,
                    popularity: entry.popularity,
                    poster: entry.poster_path,
                    vote_count: entry.vote_count,
                    overview: entry.overview
                };
            })
            setMovies(data)
        }).catch(e => {
            console.log(e)})
    }, [])

    return (
        <div className="Main">
            <div className="top-nav">
                <img src={movie_logo} alt='movie database logo'/>
                <div className="nav-input-text">{`Wyniki wyszukiwania dla ${params.input}`}</div>
            </div>
            {areMoviesLoaded ? <div className="list-wrapper">
                {movies.length > 0 ? <div className="list">
                    <Gradient className='list-results-num' gradients={gradient} property='text' angle='45deg'>{`Znaleziono ${movies.length} wyników`}</Gradient>
                    {movies.map((movieData) => {return <MovieListItem data={movieData}/>})}
                </div> : <Gradient className='list-empty-text' gradients={gradient} property='text' angle='45deg'>Brak wyników dla podanej frazy</Gradient>}
            </div> : <CircularProgress className="list-loading"/>}

        </div>
    )
}

export default MovieList;
