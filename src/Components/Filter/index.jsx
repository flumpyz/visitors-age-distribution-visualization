import React from 'react';
// import cx from 'classnames';
// import s from './style.module.css';
import Select from 'react-select';

const options = [
    {value: "young", label: "Young"},
    {value: "adult", label: "Adult"},
    {value: "kids", label: "Kids"},
    {value: "old", label: "Old"},
    {value: "undefined", label: "Undefined"},
];

const Index = () => {
    return (
        <Select
            isMulti
            options={options}/>
    );
};

export default Index;