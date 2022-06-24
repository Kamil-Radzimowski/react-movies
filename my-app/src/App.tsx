import React, {useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import MoviePage from "./MoviePage";
import MovieList from "./MovieList";


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
