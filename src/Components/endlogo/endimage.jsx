import React from 'react';
import './EndImage.css';

const EndImage = () => {
  return (

    <div className="container mb-5">
      <div className="row">
        <div className="col-xl-8 m-auto col-lg-8 text-center col-md-12 col-sm-12 col-xs-12">
         
            <img
              src={process.env.PUBLIC_URL + '/MMH_logo.png'}
              alt="Logo"
              className="center-logo text-center"

            />
            <p className="lorem-text">Capture a house photo and see it transform into 8+ themes instantly. Join our satisfied
              customers and <br />revamp your space today!</p>
          
        </div>
      </div>
    </div>



  );
};

export default EndImage;