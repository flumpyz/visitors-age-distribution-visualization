import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import useSWR from 'swr';
import BarChart from "./Components/BarChart";
import Filter from './Components/Filter';
import ageDistributionURL from "./Constants/ageDistributionURL";
import './dataParser';
import {getAgeDistributionByDevices, getAllDevices} from "./dataParser";

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
            setSelectedDevices(getAllDevices(data.data));
        }
    }, [data, error]);

    if (data) {
        let options = getAllDevices(data.data);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <BarChart data={data} selectedDevices={selectedDevices}/>
                    <Filter optionsArray={options} changeSelectedDevices={setSelectedDevices}/>
                </header>
            </div>
        );
    }

    return <div>Загрузка...</div>;
}

export default App;
