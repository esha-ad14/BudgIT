import axios from 'axios';
import { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { listDatas, getData } from '../graphql/queries';
import { createData, updateData } from '../graphql/mutations';
import json5 from 'json5';

function IncomeTax() {
    
    const [income, setIncome] = useState(0);
    
    const [tax, setTax] = useState({
        federal: 0,
        state: 0
    });
    
    //create an array of US states abbreviations
    const states = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];
    const filings = ["single", "married", "married_separately", "head_of_household"];
    const [filing, setFiling] = useState(filings[0]);
    const [state, setState] = useState(states[0]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchData();
        
    }, []);

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

    const saveChanges = async () => {
        const data = userData[0];
        data.data.incometax.statetax = tax.state;
        data.data.incometax.federaltax = tax.federal;
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
    const loadCurrentTax = () => {
        const data = userData[0];
        setTax({
            federal: data.data.incometax.federaltax,
            state: data.data.incometax.statetax
        });
    }
    const calculateIncomeTax = () => {
        const options = {
        method: 'POST',
        url: 'https://taxee.io/api/v2/calculate/2020',
        headers: {
            authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjYxNzk3MzZjNWY4NjM0Mzc4NDRkNmQzYSIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTYzNTM0OTM1Nn0.KhJr_Zi3hxfmHSc6T9kyN3_bfNrOeJ2w2kJ2uLVBQ0Y',
        },
        data: {filing_status: filing, pay_rate: income.toString(), state: state, pay_periods: '1'}
        };
        
        axios.request(options).then(function (response) {
        console.log(response.data);
        setTax({
            federal: response.data.annual.federal.amount,
            state: response.data.annual.state.amount == null ? 0 : response.data.annual.state.amount,
        });
        }).catch(function (error) {
        console.error(error);
        });

    }
    return (
        <div>
            <h1>Income Tax Calculator</h1>
            <div>
                <label>State:</label>
                <select value={state} onChange={(e) => setState(e.target.value)}>
                    {states.map((state) => {
                        return <option key={state} value={state}>{state}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Filing Status:</label>
                <select value={filing} onChange={(e) => setFiling(e.target.value)}>
                    {filings.map((filing) => {
                        return <option key={filing} value={filing}>{filing}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Income:</label>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
            </div>
            
            <div>
                <h3>Federal Tax: ${tax.federal}</h3>
                <h3>State Tax: ${tax.state}</h3>
            </div>
            <button onClick={calculateIncomeTax}>Calculate</button>
            <br />    
            <button onClick={saveChanges}>Save Changes</button>
            <br />
            <button onClick={loadCurrentTax}>Load Current Income Tax</button>
            <br />
            {JSON.stringify(userData)}
            
        </div>
            );
}

export default IncomeTax;