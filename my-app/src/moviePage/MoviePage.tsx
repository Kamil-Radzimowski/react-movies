import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './styleMoviePage.scss';
import { Gradient } from 'react-gradient';
import movie_logo from "../assets/the-movie-db-logo.svg";
import {Box, Card, CardContent, CardMedia, Paper, Rating, Typography} from "@mui/material";
import {useGetMovieDetailsByIdQuery, useVoteOnMovieMutation} from "../apiEndpoints/MovieEndpoints";
import config from "../Util/Config";
import CommentSection from "../comments/CommentSection";
import NavBar from "../navBar/NavBar";
import Cookies from 'js-cookie'




const MoviePage = () => {
    const [user, setUser] = useState(Cookies.get("username"))
    const [vote, setVote] = React.useState<number | null>(null)
    const {movieId} = useParams<{ movieId: string }>()
    const navigate = useNavigate()
    const gradient = config.getGradient()

    const [voteQuery] = useVoteOnMovieMutation()
    const { data, isLoading} = useGetMovieDetailsByIdQuery(movieId || "")

    function navigateToMainPage() {
        navigate('/')
    }

    const isVotingDisabled = () => {
        return vote != null
    }

    const getVote = () => {
        if(vote == null){
            return (data?.vote_average ?? 0)
        } else {
            return vote
        }
    }

    const postVote = (newValue: number | null) => {
        setVote(vote)
        voteQuery({id: movieId || "1", vote: newValue || 0})
    }

    const handleNavBarCallback = () => {
        // pass
    }


    return (
        <div className="Page">
            <NavBar text={isLoading ? "" : `${data?.title}`} user={user} callback={handleNavBarCallback}/>
            {isLoading ? null : <div className="page-content">
                <Card sx={{display: 'flex', flex: '1'}}>
                    <CardMedia
                        sx = {{width: 250}}
                        component="img"
                        image={`http://localhost:3000/movie/poster/${data?.poster_path}`}
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: '1', flexWrap: 'wrap'}}>
                                {data?.genres.map((genre) => {return (
                                    <Paper sx={{marginRight: 2, padding: 1}} key={genre}>
                                        <Typography>{`${genre}`}</Typography>
                                    </Paper>
                                )})}
                                <Rating sx={{paddingLeft: 2}} className='rating' disabled={vote != null} onChange={(event, newValue) => {
                                    postVote(newValue)
                                }} value={getVote()} precision={1}></Rating>
                            </CardContent>
                            <CardContent>
                                <Typography>
                                    {`${data?.overview}`}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                {/*
                                <Typography>{`Kraj Produkcji: ${data?.production_countries.reduce((acc, current, index) => {
                                    if(index == 0) {
                                        return acc.concat(current.name)
                                    }
                                    else{
                                        return acc.concat(', ').concat(current.name)
                                    }
                                }, "")}`}</Typography>
                                */}
                            </CardContent>
                        </Box>
                    </Box>
                </Card>
                <Gradient className='search-text' gradients={gradient} property='text' angle='45deg'>Komentarze</Gradient>
                <CommentSection id={movieId}></CommentSection>
            </div>}
        </div>
    )
}


export default MoviePage;
