import React, {useEffect, useState} from "react";
import config from "../Util/Config";
import RecommendedMovieCard from "./recommendedMovieCard";
import CircularProgress from "@mui/material/CircularProgress";
import { Gradient } from 'react-gradient';
import './style.scss';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, ThemeProvider} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Search} from "@mui/icons-material";
import {movie, news} from "../Util/types";
import { useGetRecommendedMoviesQuery} from "../apiEndpoints/MovieEndpoints";
import {useGetAllNewsQuery} from "../apiEndpoints/NewsEndpoints";
import theme from "../Util/theme";
import Cookies from 'js-cookie'
import NavBar from "../navBar/NavBar";
import NewsCard from "./NewsCard";
import {getClient} from "../Util/WebSocket";


function Main() {
    const { data, isLoading } = useGetRecommendedMoviesQuery()
    const [newsState, setNewsState] = useState<news[] | undefined>(undefined)
    const {data: news = [], isLoading: areNewsLoading} = useGetAllNewsQuery()
    const [searchInput, setSearchInput] = useState("")
    const [user, setUser] = useState(Cookies.get("username"))
    const gradient = config.getGradient()

    const navigate = useNavigate()

    useEffect(() => {
        setNewsState(news)
        const client = getClient()

        client.onmessage = (message) => {
            const obj = JSON.parse(message.data)
            if(obj.type === "NEWS"){
                const newItem: news = obj.news
                addNews(newItem)
                //pass
            }
        }
    }, [data])

    const addNews = (news: news) => {
        setNewsState(oldArray => {
            if(oldArray != undefined){
                return [...oldArray, news]
            } else {
                return oldArray
            }
        });
    }


    function onSearchKeyPressed(key){
        if(key.keyCode == 13){
            navigateToMovieList()
        }
    }

    function navigateToMovieList(){
        navigate(`/movieList/${searchInput}/1`)
    }

    function navigateToLiveChat(){
        navigate(`liveChat`)
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const loginOrRegisterAction = () => {
        console.log("action")
        setUser(Cookies.get("username"))
    }


    return (
        <div className="App">
            <NavBar text={"Filmy"} user={user} callback={loginOrRegisterAction}></NavBar>
            <div className="App-search">
                <Gradient className='search-text' gradients={gradient} property='text' angle='45deg'>Szukaj Filmu</Gradient>
                {/* <Autocomplete className='search' filterOptions={(x) => {return loadMovies(x)}} renderInput={(params) => <TextField {...params} label="Szukaj Filmu"></TextField>} options={searchedMovies}></Autocomplete>*/}
                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
            </div>
            <div className="App-recommendations">
                <Gradient className='recommendations-text' gradients={gradient} property='text' angle='45deg'>Nasze Rekomendacje</Gradient>
                {isLoading ? (<div className="recommendations-loading"><CircularProgress/></div>) : (<div className="recommendations">
                    {data?.map((e: movie) => {return <RecommendedMovieCard key={e.id} data={e}/>})}
                </div>)}
            </div>
            <div className='App-news'>
                <Gradient className='news-text' gradients={gradient} property='text' angle='45deg'>Newsy</Gradient>
                {!areNewsLoading && newsState != undefined ? newsState.map((item) => {
                    return <NewsCard key={item._id} title={item.title} desc={item.desc} date={item.date}/>
                }) : null}
            </div>
            <div className='Live-chat'>
                <Gradient className='live-text' gradients={gradient} property='text' angle='45deg'>Chat na żywo!</Gradient>
                <Button onClick={navigateToLiveChat} variant='outlined'>Wypróbuj</Button>
            </div>
        </div>
    );
}

export default Main;
