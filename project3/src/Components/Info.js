import React from 'react';

function Info(props) {
    return (
    <div>
        <p> <strong> {props.name} </strong>- {props.title} </p>
        <p> <strong> Email: </strong> {props.email} </p>
        <p> <strong> Github: </strong> {props.git}</p>
        <br></br>
    </div>
    );
}

export default Info;