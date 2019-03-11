import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {

    return (

        <div className='ma center'>

            <div className='mt3 absolute'>

                <img alt='' 
                     id = 'inputimage'
                     src={imageUrl}  
                     width='500px' 
                     height='auto' 

                />
                <div className='bounding-box' 
                     style={{top: box.topRow, 
                             right: box.rightCol, 
                             bottom: box.bottomRow, 
                             left: box.leftCol}}>

                </div>
            </div>
               
        </div>

    );
}

export default FaceRecognition;