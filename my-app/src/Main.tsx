import React, {useEffect} from "react";
import axios from "axios";
import config from "./Config";
import movie_logo from "./assets/the-movie-db-logo.svg";
import TextField from "@mui/material/TextField";
import MovieCard from "./MovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Gradient } from 'react-gradient';
import './assets/style.scss';
import {useNavigate} from "react-router-dom";

const gradient = [
    ['#90cea1', '#01b4e4'],
]

function Main() {
    const [recommendationsData, setRecommendationsData] = React.useState([])

    useEffect(() => {
        console.log("ok")
        // Get 5 recommendations
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${config.getApiKey()}`).then((res) => {
            const fiveRecommendations = res.data["results"].slice(0, 5).map((entry: any) => {
                return {
                    title: entry.title,
                    popularity: entry.popularity,
                    poster: entry.poster_path,
                    vote_count: entry.vote_count,
                    overview: entry.overview
                };
            })
            console.log(fiveRecommendations)
            setRecommendationsData(fiveRecommendations)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <div className="Header-left">
                    <img src={movie_logo} alt='movie database logo'/>
                    <div>Filmy</div>
                </div>
                <div>Zaloguj się</div>
            </header>
            <div className="App-search">
                <Gradient className='search-text' gradients={gradient} property='text' angle='45deg'>Szukaj Filmu</Gradient>
                <TextField className="search" id="outlined" label="Nazwa Filmu" variant="outlined"></TextField>
            </div>
            <div className="App-recommendations">
                <Gradient className='recommendations-text' gradients={gradient} property='text' angle='45deg'>Nasze Rekomendacje</Gradient>
                {recommendationsData.length > 0 ? (<div className="recommendations">
                    {recommendationsData.map((e) => {return <MovieCard data={e}/>})}
                </div>) : (<CircularProgress className="recommendations-loading"/>)}
            </div>
        </div>
    );
}

export default Main;
