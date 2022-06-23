import React, {useEffect} from 'react';
import movie_logo from './the-movie-db-logo.svg';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import config from './Config'
import axios from 'axios';
import { MovieCard } from './MovieCard'
import './style.scss';

// const GradientText = require('react-gradient-text')

function App() {
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
            <div className="search-text">Szukaj Filmu</div>
            <TextField className="search" fullWidth id="outlined" label="Nazwa Filmu" variant="outlined"></TextField>
        </div>
        <div className="App-recommendations">
            {recommendationsData.length > 0 ? (<div className="recommendations">
                {recommendationsData.map((e) => {return MovieCard(e)})}
            </div>) : (<CircularProgress className="recommendations-loading"/>)}
        </div>
    </div>
  );
}

export default App;
