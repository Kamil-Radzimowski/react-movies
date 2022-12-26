import {Link, useNavigate, useParams} from "react-router-dom";
import React from "react";
import './styleMovieList.scss';
import movie_logo from "../assets/the-movie-db-logo.svg";
import config from "../Util/Config";
import { Gradient } from 'react-gradient';
import CircularProgress from "@mui/material/CircularProgress";
import {useGetMovieByNameQuery} from "../Util/MovieService";
import {Pagination, PaginationItem} from "@mui/material";
import MovieItemCard from "./MovieItemCard";


function MovieList() {
    const params = useParams<{ input: string, page: string }>()
    const { data, isLoading } = useGetMovieByNameQuery({str: params.input || "", page: params.page || "1"})
    const gradient = config.getGradient()
    const navigate = useNavigate()

    function navigateToMainPage() {
        navigate('/')
    }


    return (
        <div className="Main">
            <div className="top-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                <div className="nav-input-text">{`Wyniki wyszukiwania dla ${params.input}`}</div>
            </div>
            {isLoading ?  <CircularProgress className="list-loading"/> : <div className="list-wrapper">
                {(data?.results || []).length > 0 ? <div className="list">
                    <Gradient className='list-results-num' gradients={gradient} property='text' angle='45deg'>{`Znaleziono ${(data?.total_results || 0)} wyników`}</Gradient>
                    {data?.results?.map((movieData) => {return <MovieItemCard key={movieData.id} data={movieData}/>})}
                </div> : <Gradient className='list-empty-text' gradients={gradient} property='text' angle='45deg'>Brak wyników dla podanej frazy</Gradient>}
            </div> }
            <Pagination className="page-nav" page={parseInt(params.page as string)} count={10} renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/movieList/${params.input}/${item.page}`}
                    {...item}
                />
            )}/>
        </div>
    )
}

export default MovieList;
