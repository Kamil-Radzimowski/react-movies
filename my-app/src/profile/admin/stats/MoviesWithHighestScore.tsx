import React, {useEffect, useState} from "react";
import {
    useGetMoviesWithHighestVoteScoreQuery
} from "../../../apiEndpoints/MovieEndpoints";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const MoviesWithHighestScore = () => {
    const {data} = useGetMoviesWithHighestVoteScoreQuery()
    const [movies, setMovies] = useState(data)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Najwyżej oceniane filmy',
            },
        },
    };

    useEffect(() => {
        setMovies(data)
    }, [data])

    return <>
        {movies != undefined ? <Bar width={100} height={25} options={options} data={movies}></Bar> : null}
    </>
}

export default MoviesWithHighestScore