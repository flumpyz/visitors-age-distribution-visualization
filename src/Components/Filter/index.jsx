import React from 'react';
// import cx from 'classnames';
// import s from './style.module.css';
import Select from 'react-select';

const Index = (props) => {
    let selectOptions = props.optionsArray.map((option) => {
        return {
            value: option,
            label: option,
        }
    });

    const changeSelectedValues = (newValue) => {
        props.changeSelectedDevices(newValue.map((newValue) => newValue.value));
    };

    return (
        <Select
            isMulti
            options={selectOptions}
            defaultValue={selectOptions}
            onChange={changeSelectedValues} />
    );
};

export default Index;