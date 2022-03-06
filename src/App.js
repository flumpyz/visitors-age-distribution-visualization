import React, {useEffect, useState} from "react";
import useSWR from 'swr';
import './App.css';

import BarChart from "./Components/BarChart";
import Filter from './Components/Filter';
import {getAllDevices} from "./dataParser";
import {ageDistributionURL} from "./Constants/ageDistributionURL";

const url = ageDistributionURL;

const getData = async () => {
    const response = await fetch(url);
    return response.json();
};

function App() {
    const [ selectedDevices, setSelectedDevices ] = useState([]);

    const {data, error} = useSWR(url, getData);

    useEffect(() => {
        if (data) {
            setSelectedDevices(getAllDevices(data));
        }
    }, [data, error]);

    if (data) {
        let options = getAllDevices(data);

        return (
            <div className="App">
                <div className="App-content">
                    <Filter optionsArray={options} changeSelectedDevices={setSelectedDevices}/>
                    <BarChart data={data} selectedDevices={selectedDevices}/>
                </div>
            </div>
        );
    }

    return <div>Загрузка...</div>;
}

export default App;
