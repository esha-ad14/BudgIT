import React from 'react';
import Budget from '../Components/Budget';
import IncomeTax from '../Components/IncomeTax';
import PropertyTax from '../Components/PropertyTax';

// home page initially displayed


const Home = () => {

    const styleObj = {
        fontSize: 21,
        textAlign: "left",
        padding: 10,
    }
    return(
      <div>
        <center> 
      <IncomeTax />
      <PropertyTax />
      <Budget />
      </center>
      </div>
    )
    
};

export default Home;