import React from 'react';
import './Rank.css';

const Rank  = ({ name, entries }) => {

    return (
       
        <div>
            
            <div className='fontFamily1 white f1'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='fontFamily2 white f1'>
                {'#' + entries}
            </div>
        </div>

    );
}


export default Rank;