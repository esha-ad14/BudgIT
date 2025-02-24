import axios from 'axios';
import { useEffect, useState } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { listDatas, getData } from '../graphql/queries';
import { createData, updateData } from '../graphql/mutations';
import json5 from 'json5';


function PropertyTax() {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];
    const [state, setState] = useState(states[0]);
    const [propertytax, setPropertytax] = useState(0);
    const [userData, setUserData] = useState([]);

    const calculatePropertyTax = () => {
        var options = {
            method: 'GET',
            url: 'https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address1='+address1+'&address2='+address2 + ', ' + state,
            headers: {
                apikey : '4f8fbb87e45aec66f5ce1d446bd320a8'
            },
            data: {
                address1 : address1,
                address2 : address2
            }
        };
        axios.request(options).then((response) => {
            console.log(response.data);
            setPropertytax(response.data.property[0].assessment.tax.taxAmt);
        })
    }
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
          const userDat = await API.graphql(graphqlOperation(listDatas));
          const userList = userDat.data.listDatas.items;
          console.log('user list', userList);
            userList[0].data = userList[0].data.replaceAll("=",":");
            userList[0].data = json5.parse(userList[0].data);
            setUserData(userList);
          
        } catch (error) {
          console.log('error on fetching users', error);
        }
      }
      const loadCurrentTax = () => {
        const data = userData[0];
        setPropertytax(data.data.propertytax);
    }
    const saveChanges = async () => {
        const data = userData[0];
        data.data.propertytax = propertytax;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.owner;
        
        try {
            const upData = await API.graphql(graphqlOperation(updateData, { input: data}));
            const datalist = [...userData];
            datalist[0] = upData.data.updateData;
            setUserData(datalist);
        } catch (error) {
            console.log('error on saving changes', error);
        }
    }
    return (
        <div>
            <h1>Property Tax Calculator</h1>
            <div>
            <label>Address1(Street):</label>
            <input type="text" value={address1} onChange={e => setAddress1(e.target.value)} />
            </div>
            <div>
            <label>Address2(City):</label>
            <input type="text" value={address2} onChange={e => setAddress2(e.target.value)} />
            </div>
            <div>
            <label>State:</label>
                <select value={state} onChange={(e) => setState(e.target.value)}>
                    {states.map((state) => {
                        return <option key={state} value={state}>{state}</option>
                    })}
                </select>
            </div>

            <button onClick={calculatePropertyTax}>Calculate</button>
            <br />
            <button onClick={saveChanges}>Save Changes</button>
            <br />
            <button onClick={loadCurrentTax}>Load Current Property Tax</button>
            <br />
            <div>
                <h3>Property Tax: {propertytax}</h3>

            </div>
            <br />
            {JSON.stringify(userData)}
        </div>
    )
}

export default PropertyTax;