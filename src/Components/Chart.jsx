import React from 'react';
import useSWR from 'swr'
// import cx from 'classnames';
// import s from './style.module.css';
import ageDistributionURL from "../Constants/ageDistributionURL";
import getTotalAgeDistribution from "../dataParser";

const Chart = () => {
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

        console.log(inf);

        return <div>привет, {data.data.o[0].n}!</div>
    }
};

export default Chart;
