import React, {useEffect, useState} from "react";
import axios from "axios";
import config from "./Config";
import movie_logo from "./assets/the-movie-db-logo.svg";
import MovieCard from "./MovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Gradient } from 'react-gradient';
import './assets/style.scss';
import {Autocomplete, IconButton, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const gradient = [
    ['#90cea1', '#01b4e4'],
]

function Main() {
    const [recommendationsData, setRecommendationsData] = useState([])
    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchInput, setSearchInput] = useState("")

    let navigate = useNavigate()

    function loadMovies(s: unknown[]){
        console.log(s)
        return s;
    }

    function onSearchKeyPressed(key){
        if(key.keyCode == 13){
            navigate(`/movieList/${searchInput}`)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };


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
                {/* <Autocomplete className='search' filterOptions={(x) => {return loadMovies(x)}} renderInput={(params) => <TextField {...params} label="Szukaj Filmu"></TextField>} options={searchedMovies}></Autocomplete>*/}
                <OutlinedInput className='search' onChange={handleChange} value={searchInput} onKeyDown={key => onSearchKeyPressed(key)} color='primary' label="Szukaj Filmu" endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                        >
                        </IconButton>
                    </InputAdornment>
                }></OutlinedInput>
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
