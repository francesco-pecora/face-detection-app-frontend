import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain.png';

const Logo = () => {

    return(


        <div className='ma4 mt0'>

            <Tilt className="Tilt ba br4 b--black shadow-3" options={{ max : 55 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner">
                    <img alt='Logo' src={brain} height='150px' width='150px' style={{paddingTop: '25px'}} />
                </div>
            </Tilt>

        </div>
    )
}

export default Logo;