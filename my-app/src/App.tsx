import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./landingPage/Main";
import MoviePage from "./moviePage/MoviePage";
import MovieList from "./movieList/MovieList";
import {store} from "./Util/store";
import {Provider} from "react-redux";


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/movie/:movieId" element={<MoviePage/>}/>
                    <Route path="/movieList/:input/:page" element={<MovieList/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
