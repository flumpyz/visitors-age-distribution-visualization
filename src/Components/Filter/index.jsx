import React from 'react';
// import cx from 'classnames';
// import s from './style.module.css';
import Select from 'react-select';

const options = [
    {value: "young", label: "young"},
    {value: "adult", label: "adult"},
    {value: "kids", label: "kids"},
    {value: "old", label: "old"},
    {value: "undefined", label: "undefined"},
];

const Index = (props) => {
    let selectOptions = props.optionsArray.map((option) => {
        return {
            value: option,
            label: option,
        }
    })

    return (
        <Select
            isMulti
            options={selectOptions}/>
    );
};

export default Index;