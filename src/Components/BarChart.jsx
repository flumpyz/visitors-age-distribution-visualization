import React from 'react';
import useSWR from 'swr'
// import cx from 'classnames';
// import s from './style.module.css';
import ageDistributionURL from "../Constants/ageDistributionURL";
import '../dataParser';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {getAllAgeGroups, getTotalAgeDistribution} from "../dataParser";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Total views: Age (by day of week)',
        },

        legend: {
            position: "bottom",
        }
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const backgroundColors = ['#0000CD', '#00FA9A', '#B22222', '#808080', '#1E90FF'];

const BarChart = () => {
    const url = ageDistributionURL;

    const getData = async () => {
        const response = await fetch(url);
        return response.json();
    };

    const {data, error} = useSWR(url, getData);

    if (error) return <div>ошибка загрузки</div>
    if (!data) return <div>загрузка...</div>

    if (data) {
        let inf = getTotalAgeDistribution(data.data);
        let ages = getAllAgeGroups(data.data);

        let agesDatasets = [];

        ages.map((age, index) => {
            agesDatasets.push({
                label: age,
                data: labels.map((dayLabel) => {
                    if (!inf.has(dayLabel)) {
                        return 0;
                    } else if (!inf.get(dayLabel).has(age)) {
                        return 0;
                    } else {
                        return inf.get(dayLabel).get(age);
                    }
                }),
                backgroundColor: backgroundColors[index],
            })
            ;
        })

        const datas = {
            labels,
            datasets: agesDatasets,
        };

        console.log(agesDatasets);

        console.log(inf);

        return <Bar options={options} data={datas}></Bar>
    }
};

export default BarChart;
