import React, {useEffect} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import MoviePage from "./MoviePage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/movie/:movieId" element={<MoviePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
