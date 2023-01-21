import {Link, useParams} from "react-router-dom";
import React, {useState} from "react";
import './styleMovieList.scss';
import config from "../Util/Config";
import { Gradient } from 'react-gradient';
import CircularProgress from "@mui/material/CircularProgress";
import {useGetMovieByGenreQuery} from "../apiEndpoints/MovieEndpoints";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Pagination,
    PaginationItem,
    Paper,
    Radio,
    RadioGroup
} from "@mui/material";
import MovieItemCard from "./MovieItemCard";
import NavBar from "../navBar/NavBar";
import Cookies from 'js-cookie'



function MovieListByGenre() {
    const params = useParams<{genre: string, page: string }>()
    const [sortMethod, setSortMethod] = useState<string>("default");
    const {data, isLoading} = useGetMovieByGenreQuery({genre: params.genre || '',  page: params.page || "1", sortOption: sortMethod})
    const [user, setUser] = useState(Cookies.get("username"))
    const gradient = config.getGradient()

    const handleNavBarCallback = () => {
        setUser(Cookies.get("username"))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortMethod((event.target as HTMLInputElement).value);
    };

    return (
        <div className="Main">
            <NavBar text={`Wyniki wyszukiwania dla ${params.genre}`} user={user} callback={handleNavBarCallback}></NavBar>
            <Paper sx={{margin: 2}}>
                <FormControl sx={{margin: 2}}>
                    <FormLabel id="demo-controlled-radio-buttons-group">Sortuj wyniki po:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={sortMethod}
                        onChange={handleChange}
                    >
                        <FormControlLabel  value="default" control={<Radio  />} label="Domyślnie" />
                        <FormControlLabel value="popularity" control={<Radio />} label="Popularność" />
                        <FormControlLabel value="votes" control={<Radio />} label="Liczba głosów" />
                    </RadioGroup>
                </FormControl>
            </Paper>
            {isLoading ?  <CircularProgress className="list-loading"/> : <div className="list-wrapper">
                {(data?.results || []).length > 0 ? <div className="list">
                    <Gradient className='list-results-num' gradients={gradient} property='text' angle='45deg'>{`Znaleziono ${(data?.total_results || 0)} wyników`}</Gradient>
                    {data?.results?.map((movieData) => {return <MovieItemCard key={movieData.id} data={movieData}/>})}
                </div> : <Gradient className='list-empty-text' gradients={gradient} property='text' angle='45deg'>Brak wyników dla podanej frazy</Gradient>}
            </div> }
            <Pagination className="page-nav" page={parseInt(params.page as string)} count={data?.number_of_pages || 10} renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/movieListByGenre/${params.genre}/${item.page}`}
                    {...item}
                />
            )}/>
        </div>
    )
}

export default MovieListByGenre;
