import React from 'react';


const Selection = ({name, value, options, handleChange}) => {  
  return (
  <select
    name={name}
    value={value}
    onChange={ (e) => handleChange(e.target.value) }>

    {
      options.map((option, index) => (
        <option
          value={option}
          key={index}>
          { option }
        </option>
      ))
    }
  </select>
)};

export default Selection;
