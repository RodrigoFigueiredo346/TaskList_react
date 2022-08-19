import React  from 'react';
import Radio from '@mui/material/Radio';
import './styleBut.css'


export default function RadioButtons({handleShowPrio, selectedValue, handleChange}) {


  return (
    <div className='radio_but'>
      <div className='radio'>
        <Radio
            id="a_but"
            checked={selectedValue === 'a'}
            onChange={handleChange}
            onClick={() => handleShowPrio('a')}
            value="a"
            name="radio-buttons"
            // inputProps={{'aria-label':'A'}}
        /><span>Todos</span>
      </div>
      <div>
      <Radio
        id="b_but"
        checked={selectedValue === 'b'}
        onChange={handleChange}
        onClick={() => handleShowPrio('b')}
        value="b"
        name="radio-buttons"
        // inputProps={{ 'aria-label': 'B' }}
      /><span>Prioridade</span></div>
      <div>
        <Radio
        id="c_but"
        checked={selectedValue === 'c'}
        onChange={handleChange}
        onClick={() => handleShowPrio('c')}
        value="c"
        name="radio-buttons"
        // inputProps={{ 'aria-label': 'C' }}
      /><span>Normal</span></div>
    </div>
  );
}



