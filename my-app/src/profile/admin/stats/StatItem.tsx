import React from 'react'
import {statsItem} from "../../../Util/types";
import {Bar} from "react-chartjs-2";
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

type statItemProps = {
    data: statsItem,
    label: string
}

const statItem = (props: statItemProps) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: props.label,
            },
        },
    };

    return <>
        <Bar width={100} height={25} options={options} data={props.data}></Bar>
    </>
}

export default statItem