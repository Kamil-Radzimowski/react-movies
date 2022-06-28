import React from "react";
import {movie} from "../Util/types";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

type property = {
    data : movie;
}

function MovieItemCard(prop: property) {
    const navigate = useNavigate()
    let desc = prop.data.overview
    if(desc == ''){
        desc = 'Brak opisu'
    }

    function navigateToMovieDetails(id: number){
        navigate(`/movie/${id}`)
    }

    return (
        <Card sx={{display: 'flex', margin: 2}}>
            <CardMedia
                sx = {{width: 250}}
                component="img"
                image={`https://image.tmdb.org/t/p/original/${prop.data.poster_path}`}
            />
            <Box sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '1 0 auto', flexWrap: 'wrap'}}>
                        <Typography variant="h5" >{`${prop.data.title}`}</Typography>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                            <Typography sx={{padding: 2}}>{`Popularność: ${prop.data.popularity}`}</Typography>
                            <Typography sx={{padding: 2}}>{`Liczba głosów ${prop.data.vote_count}`}</Typography>
                            <CardActions sx={{padding: 2}}>
                                <Button size="medium" color="primary" onClick={() => {
                                    navigateToMovieDetails(prop.data.id)
                                }}>
                                    Więcej
                                </Button>
                            </CardActions>
                        </CardContent>
                    </CardContent>
                    <CardContent>
                        <Typography>
                            {`${desc}`}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    )
}

export default MovieItemCard;
