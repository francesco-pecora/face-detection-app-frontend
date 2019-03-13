import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm  = ({onInputChange, onPictureSubmit}) => {

    return (
       

            <div>
                <p className='f3 
                              white 
                              fontFamily1'>

                    {'Detect faces in your pictures!'}
                </p>

                <div className='center'>
                    <div className='form 
                                    center 
                                    pa4 
                                    br3 
                                    shadow-5'>

                        <input className='inputs
                                          grow 
                                          f4 
                                          pa2
                                          w-70 
                                          center' 
                                
                                type='text'
                                onChange = {onInputChange}    
                                />

                        <button className='inputs 
                                           w-30 
                                           grow 
                                           f4 
                                           link 
                                           ph3 
                                           pv2 
                                           dib 
                                           white 
                                           bg-light-purple 
                                           fontFamily2'

                                onClick = {onPictureSubmit}
                                >
                            Detect
                        </button>
                    </div>
                    
                </div>
            </div>
            
    );
}


export default ImageLinkForm;