import React from "react";
import logo from './logo.svg';
import './App.css';
import useSWR from 'swr';
import BarChart from "./Components/BarChart";
import Filter from './Components/Filter';
import ageDistributionURL from "./Constants/ageDistributionURL";
import './dataParser';
import {getAllAgeGroups} from "./dataParser";

function App() {
    const url = ageDistributionURL;

    const getData = async () => {
        const response = await fetch(url);
        return response.json();
    };

    const {data, error} = useSWR(url, getData);

    if (error) return <div>ошибка загрузки</div>
    if (!data) return <div>загрузка...</div>

    if (data) {
        let ageGroups = getAllAgeGroups(data.data);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <BarChart data={data}/>
                    <Filter optionsArray={ageGroups}/>
                </header>
            </div>
        );
    }
}

export default App;
