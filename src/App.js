import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Particles from 'react-particles-js';
import 'tachyons';

//this object sets up the background particles. Documentation at https://github.com/VincentGarreau/particles.js/
const particlesOptions = {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 900,
      }
    }
  },
  interactivity : {

    detect_on : 'window',
    events: {

      onhover:{
        enable: true,
        mode: 'repulse',
      }
    }
  }
}

const initialState = {

  input: '',
  imageUrl: '',
  box: {},
  route:'signin',
  isSignedIn: false,
  user: {

    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {

  constructor() {

    super();

    this.state = initialState;
  }

  loadUser = (data) => {

    this.setState({user: {
      
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,     
    }})
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    //Clarifai returns the "coordinates" of the box as percentages from the edges of the picture
    return {

      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),

    }
  }

  displayFaceBox = (box) => {

    this.setState({box: box});
  }

  onInputChange = (event) => {

    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {

    this.setState({imageUrl: this.state.input});

      //This fetch returns the response from Clarifai API.
      //The actual API call is now in the backend to protect API key
      fetch('https://desolate-reaches-34910.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: this.state.input,
              })
            })
            .then (response => response.json())
            .then( response => {
              
              if(response){  

                //updating entry count if image is submitted
                fetch('https://desolate-reaches-34910.herokuapp.com/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      id: this.state.user.id,
                })
              })
              .catch(console.log)
              .then (response => response.json())
              .then (count => {

                this.setState(Object.assign(this.state.user, {entries: count}))
              })
            }

            //displaying the box around the face
            this.displayFaceBox(this.calculateFaceLocation(response))
          })

          //catching errors if any
          .catch(err => console.log("An error occurred. Please try again."));
  }

  onRouteChange = (route) => {

    if(route === 'signout'){
      this.setState(initialState)
    } 
    
    else if (route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  render() {

    //destructuring variables
    const {isSignedIn, box, imageUrl, route, user} = this.state;

    return (

      <div className="App">
        <Particles className='particles'
          params= {particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        
        {/* If statements to control the user moving through the different pages */}
        {route === 'home'
        ? <div>
            <Logo/>
            <Rank name = {user.name} entries={user.entries}/>        
            <ImageLinkForm 
                onInputChange = {this.onInputChange}
                onPictureSubmit = {this.onPictureSubmit}
            />       
            <FaceRecognition box={box} imageUrl = {imageUrl}/>
          </div>
        : (route === 'signin'

            ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            : (route ==='signout'

                ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
                : <Register name= {user.name} entries={user.entries} loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
        )
        }
      </div>
    );
  }
}

export default App;
