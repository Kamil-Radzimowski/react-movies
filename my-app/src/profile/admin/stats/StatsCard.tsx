import React from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import StatItem from "./StatItem";
import {
    useGetMostCommentedMoviesQuery, useGetMostPopularGenresQuery, useGetMostPopularMoviesQuery,
    useGetMoviesWithHighestVoteScoreQuery
} from "../../../apiEndpoints/MovieEndpoints";

function StatsCard(){
    const {data: commentData} = useGetMostCommentedMoviesQuery()
    const {data: voteData} = useGetMoviesWithHighestVoteScoreQuery()
    const {data: genresData} = useGetMostPopularGenresQuery()
    const {data: popularityData} = useGetMostPopularMoviesQuery()

    return <Card>
        <CardHeader title='Statystyki'/>
        <CardContent>
            {commentData != undefined ? <StatItem data={commentData} label={"Najchętniej komentowane filmy"}></StatItem> : null}
            {voteData != undefined ? <StatItem data={voteData} label={"Najwyżej oceniane filmy"}></StatItem> : null}
            {genresData != undefined ? <StatItem data={genresData} label={"Liczba filmów pod względem gatunku"}></StatItem> : null}
            {popularityData != undefined ? <StatItem data={popularityData} label={"Najbardziej popularne filmy"}></StatItem> : null}
        </CardContent>
    </Card>
}

export default StatsCard