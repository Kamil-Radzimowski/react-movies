import React from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import MostCommentedMovies from "./MostCommentedMovies";

function StatsCard(){
    return <Card>
        <CardHeader title='Statystyki'/>
        <CardContent>
            <MostCommentedMovies></MostCommentedMovies>
        </CardContent>
    </Card>
}

export default StatsCard