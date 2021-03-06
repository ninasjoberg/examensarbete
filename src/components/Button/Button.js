import React from 'react';
import './Button.css';

const Button = (props) => {
    const { value, name, onClick, activeButton } = props;

    let color = '#336B87';
    if(activeButton === value) {
        color = 'rgb(111, 37, 111)';
    }

    return (
        <button className='button' style={{backgroundColor: color}} value={value} onClick={onClick}>{name}</button>
    );
}

export default Button;