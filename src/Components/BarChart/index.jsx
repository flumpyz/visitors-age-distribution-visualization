import React from 'react';
import {DAYS_OF_WEEK} from "../../Constants/daysOfWeek";
import {OPTIONS} from "../../Constants/barOptions";
import {BACKGROUND_COLORS} from "../../Constants/backgroundColors";
import {Bar} from 'react-chartjs-2';
import {getAgeDistributionByDevices, getAllAgeGroups} from "../../dataParser";

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

const options = OPTIONS;
const labels = DAYS_OF_WEEK;
const backgroundColors = BACKGROUND_COLORS;

const Index = (props) => {
    let inf = getAgeDistributionByDevices(props.data, props.selectedDevices);
    let ageGroups = getAllAgeGroups(props.data);

    let agesDatasets = [];

    // eslint-disable-next-line array-callback-return
    ageGroups.map((ageGroup, index) => {
        agesDatasets.push({
            label: ageGroup,
            data: labels.map((dayLabel) => {
                if (!inf.has(dayLabel)) {
                    return 0;
                } else if (!inf.get(dayLabel).has(ageGroup)) {
                    return 0;
                } else {
                    return inf.get(dayLabel).get(ageGroup);
                }
            }),
            backgroundColor: backgroundColors[index],
        });
    })

    const datasets = {
        labels,
        datasets: agesDatasets,
    };

    return <Bar options={options} data={datasets} type={'bar'}>
    </Bar>;
};

export default Index;
