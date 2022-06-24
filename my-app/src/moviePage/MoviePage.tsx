import {useEffect} from "react";
import axios from "axios";
import config from "../Config";
import {useParams} from "react-router-dom";


function MoviePage(){
    const params = useParams()

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${config.getApiKey()}&language=pl`).then((r) => {
        })
    }, [])

    return <div>HEJ</div>
}


export default MoviePage;
