import React from 'react';
// import cx from 'classnames';
// import s from './style.module.css';
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
import {getAgeDistributionByDevices, getAllAgeGroups, getTotalAgeDistribution} from "../../dataParser";

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

const Index = (props) => {
    let inf = getAgeDistributionByDevices(props.data.data, props.selectedDevices);
    let ages = getAllAgeGroups(props.data.data);

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

    return <Bar options={options} data={datas} type={'bar'}>
    </Bar>;
};

export default Index;
