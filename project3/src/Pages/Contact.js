import React from 'react';
import Info from '../Components/Info';

const Contact= () => {
    const styleObj = {
        fontSize: 21,
        textAlign: "center",
        padding: 10,
    }
  return (  
      <div style={styleObj}>
        {/* <h1>Contact Us</h1>
        <p>  Page under construction. Coming soon...     </p> */}
        <h1> Leads </h1> 
        <br></br>
        <Info name="Jackson Engel" title="Back End Lead" email="jacksonengel@tamu.edu" git="https://github.tamu.edu/jacksonengel"/>
        <Info name="Esha Adhawade" title="Front End Lead" email="esha.adhawade@tamu.edu" git="https://github.tamu.edu/esha-adhawade"/>
        <br></br>
        <h1> Developers </h1>
        <br></br>
        <Info name="Ethan McKinney" title="Full Stack Developer" email="ethan.mckinney@tamu.edu" git="https://github.tamu.edu/ethan-mckinney"/>
        <Info name="Matthew Tran" title="Full Stack Developer" email="oe4ef622@tamu.edu" git="https://github.tamu.edu/oe4ef622"/>
        <Info name="Alexander Torres" title="Full Stack Developer" email="robincrass@tamu.edu" git="https://github.tamu.edu/robincrass"/>
      </div>  
  );
};

export default Contact;