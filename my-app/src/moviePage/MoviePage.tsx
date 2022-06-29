import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import '../assets/styleMoviePage.scss';
import movie_logo from "../assets/the-movie-db-logo.svg";
import {Box, Card, CardContent, CardMedia, Paper, Rating, Typography} from "@mui/material";
import { useGetMovieDetailsByIdQuery } from "../Util/MovieService";



const MoviePage = () => {
    const {movieId} = useParams<{ movieId: string }>()
    const navigate = useNavigate()

    const { data, isLoading} = useGetMovieDetailsByIdQuery(movieId || "")

    function navigateToMainPage() {
        navigate('/')
    }

    return (
        <div className="Page">
            <div className="page-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                {isLoading ? null : <div className="page-nav-title">{`${data?.title}`}</div>}
            </div>
            {isLoading ? null : <div className="page-content">
                <Card sx={{display: 'flex', flex: '1'}}>
                    <CardMedia
                        sx = {{width: 250}}
                        component="img"
                        image={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: '1', flexWrap: 'wrap'}}>
                                {data?.genres.map((genre) => {return (
                                    <Paper sx={{marginRight: 2, padding: 1}} key={genre.id}>
                                        <Typography>{`${genre.name}`}</Typography>
                                    </Paper>
                                )})}
                                <Rating sx={{paddingLeft: 2}} className='rating' readOnly value={(data?.vote_average ?? 0) / 2} precision={0.25}></Rating>
                            </CardContent>
                            <CardContent>
                                <Typography>
                                    {`${data?.overview}`}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography>{`Kraj Produkcji: ${data?.production_countries.reduce((acc, current, index) => {
                                    if(index == 0) {
                                        return acc.concat(current.name)
                                    }
                                    else{
                                        return acc.concat(', ').concat(current.name)
                                    }
                                }, "")}`}</Typography>
                            </CardContent>
                        </Box>
                    </Box>
                </Card>
            </div>}
        </div>
    )
}


export default MoviePage;
