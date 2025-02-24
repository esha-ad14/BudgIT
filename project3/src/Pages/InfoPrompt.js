import React from 'react';
import logo from '../logo.svg';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import '../App.css';
import awsconfig from '../aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { listDatas, getData } from '../graphql/queries';
import { createData, updateData } from '../graphql/mutations';
import { AuthState } from '@aws-amplify/ui-components';
import { useState } from 'react';
import { useEffect } from 'react';


const InfoPrompt = () => {

  const [user, setUser] = React.useState();
  const [inputData, setInputData] = useState({
    incometax: 0,
    propertytax: 0,
    budget: 0
  });
  const [editData, setEditData] = useState({
    incometax: 0,
    propertytax: 0,
    budget: 0
  });
  const [userData, setUserData] = useState([]);

  // Get user data from database.
  // Places an array of objects in the userData variable
  const fetchData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listDatas));
      const userList = userData.data.listDatas.items;
      console.log('user list', userList);
      setUserData(userList);
    } catch (error) {
      console.log('error on fetching users', error);
    }
  }

  const changeData = async (data) => {
    try {
      const data = userData[0];
      data.data = editData;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.owner;
      const upData = await API.graphql(graphqlOperation(updateData,{input: data}));
      const datalist = [...userData];
      datalist[0] = upData.data.updateData;
      setUserData(datalist);
    }
    catch (error) {
      console.log('error on updating data', error);
    }
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  const styleObj = {
      fontSize: 21,
      textAlign: "left",
      padding: 10,
  }

  // Create a new data object add it to the database.
  const submit = async () => {
    console.log("Data: " + inputData);
    const queryDetails = { data: inputData };
    try {
      console.log(await API.graphql(graphqlOperation(createData, {input: queryDetails})));
    } catch (e) {
      console.error(e);
    }

    await fetchData();
  };
  return (
      <div>
        <h1>Info Prompt</h1>
        <input type="text" onChange={(e) => {
          inputData.incometax = e.target.value;
          setInputData(inputData);
        }} />
        <button onClick={submit} disabled={userData.length > 0}>Create data</button>
        <br/>
        {JSON.stringify(userData)}
        <br/>
        <input type = "text" onChange={(e) => {
          editData.incometax = e.target.value;
          setEditData(editData);
        }} />
        <button onClick={changeData} disabled={userData.length < 1}>Update data</button>
      </div>
  );
};

export default InfoPrompt;
