import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./landingPage/Main";
import MoviePage from "./moviePage/MoviePage";
import MovieList from "./movieList/MovieList";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/movie/:movieId" element={<MoviePage/>}/>
                <Route path="/movieList/:input" element={<MovieList/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
