import React, {useEffect, useState} from "react";
import config from "../Util/Config";
import movie_logo from "../assets/the-movie-db-logo.svg";
import RecommendedMovieCard from "./recommendedMovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Gradient } from 'react-gradient';
import '../assets/style.scss';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {Search} from "@mui/icons-material";
import {movie} from "../Util/types";
import {useGetRecommendedMoviesQuery} from "../Util/MovieService";
import theme from "../Util/theme";


function Main() {
    // const [recommendationsData, setRecommendationsData] = useState([] as movie[])
    // const [searchedMovies, setSearchedMovies] = useState([])
    const { data, isLoading } = useGetRecommendedMoviesQuery()
    const [searchInput, setSearchInput] = useState("")
    const gradient = config.getGradient()

    const navigate = useNavigate()

    function loadMovies(s: unknown[]){
        console.log(s)
        return s;
    }

    function onSearchKeyPressed(key){
        if(key.keyCode == 13){
            navigateToMovieList()
        }
    }

    function navigateToMovieList(){
        navigate(`/movieList/${searchInput}`)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };


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
                <FormControl className='search' variant="outlined">
                    <InputLabel htmlFor='display-name'>Szukaj</InputLabel>
                        <OutlinedInput  onChange={handleChange} value={searchInput} onKeyDown={key => onSearchKeyPressed(key)} label="Szukaj" endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="search"
                                    onClick={() => {navigateToMovieList()}}
                                >
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                }></OutlinedInput>
                </FormControl>
            </div>
            <div className="App-recommendations">
                <Gradient className='recommendations-text' gradients={gradient} property='text' angle='45deg'>Nasze Rekomendacje</Gradient>
                {isLoading ? (<div className="recommendations-loading"><CircularProgress/></div>) : (<div className="recommendations">
                    {data?.map((e: movie) => {return <RecommendedMovieCard key={e.id} data={e}/>})}
                </div>)}
            </div>
        </div>
    );
}

export default Main;
