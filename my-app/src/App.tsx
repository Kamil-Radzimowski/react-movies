import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./landingPage/Main";
import MoviePage from "./moviePage/MoviePage";
import MovieList from "./movieList/MovieList";
import {store} from "./Util/store";
import {Provider} from "react-redux";
import theme from "./Util/theme";
import {ThemeProvider} from "@mui/material";
import ProfilePanel from "./profile/ProfilePanel";
import LiveChat from "./liveChat/LiveChat";
import LiveChatSelector from "./liveChat/LiveChatSelector";


function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/movie/:movieId" element={<MoviePage/>}/>
                    <Route path="/movieList/:input/:page" element={<MovieList/>}/>
                    <Route path="/profile" element={<ProfilePanel/>} />
                    <Route path="/liveChat" element={<LiveChatSelector/>}/>
                    <Route path="/liveChat/:name" element={<LiveChat/>}/>
                </Routes>
            </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}

export default App;
