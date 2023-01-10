import React from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import MostCommentedMovies from "./MostCommentedMovies";
import MoviesWithHighestScore from "./MoviesWithHighestScore";

function StatsCard(){
    return <Card>
        <CardHeader title='Statystyki'/>
        <CardContent>
            <MostCommentedMovies></MostCommentedMovies>
            <MoviesWithHighestScore></MoviesWithHighestScore>
        </CardContent>
    </Card>
}

export default StatsCard