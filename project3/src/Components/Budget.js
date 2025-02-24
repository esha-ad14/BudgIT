import { useState, useEffect } from "react";
import IncomeTax from "./IncomeTax";
import PropertyTax from "./PropertyTax";
import axios from "axios";
import {Bar, Pie} from 'react-chartjs-2';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { listDatas, getData } from '../graphql/queries';
import { createData, updateData } from '../graphql/mutations';
import json5 from 'json5';


function Budget() {
    const [age, setAge] = useState(0);
    const [grossIncome, setGrossIncome] = useState(0);
    const [housemembers, setHousemembers] = useState(0);
    const [isHomeowner, setIsHomeowner] = useState(0);
    const [zipcode, setZipcode] = useState("");
    const [savings, setSavings] = useState(0);
    const [budgetData, setBudgetData] = useState([]);
    const [barLabels, setBarLabels] = useState([]);
    const [doesDrink, setDoesDrink] = useState(0);
    const [doesSmoke, setDoesSmoke] = useState(0);
    const [drivesVehicle, setDrivesVehicle] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [fullJSON, setFullJSON] = useState({});
    
    //create an array of 38 different colors
    const colors = ['red','blue','green','yellow','pink','purple','black','orange','maroon','grey'];
    const budgetItems = ['food', 'alcohol and tobacco', 'energy', 'vehicle','gasoline','water','mortgage/rent','home items/maintenance',
    'phone','healthcare','hobbies/fun','clothing','pets','life and personal insurance','education','savings', 'miscellaneous', 'debt payment'];
    const [barData, setBarData] = useState([]);
    const fields = ["food_home",
    "food_out",
    "alcoholic_beverages",
    "mortgage_and_rent",
    "home_maintenance_and_repairs",
    "other_lodging",
    "natural_gas",
    "electricity",
    "heating_fuels_other",
    "residential_phone_service",
    "cellular_phone_service",
    "water_and_public_services",
    "household_operations",
    "housekeeping_supplies",
    "furniture_and_appliances",
    "clothing_items_and_services",
    "vehicle_purchase_and_lease",
    "gasoline",
    "vehicle_maintenance_and_repairs",
    "vehicle_insurance",
    "public_and_other_transportation",
    "health_insurance",
    "medical_services",
    "prescription_drugs",
    "medical_supplies",
    "fees_and_admissions",
    "media_hardware_and_services",
    "pets",
    "toys_and_hobbies",
    "personal_care",
    "reading",
    "education",
    "tobacco_and_smoking",
    "miscellaneous",
    "cash_contributions",
    "life_and_personal_insurance",
    "savings",
    "other_debt_payments"]
    const [userData, setUserData] = useState([]);
    const [statetax, setStatetax] = useState(0);
    const [federaltax, setFederaltax] = useState(0);
    const [propertytax, setPropertytax] = useState(0);
    const [rerender, setRerender] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(budgetData.length > 0){
        var d = new Array(budgetItems.length);
          d[0] = budgetData[0] + budgetData[1];
          d[1] = budgetData[2] + budgetData[32];
          d[2] = budgetData[6] + budgetData[7] + budgetData[8];
          d[3] = budgetData[16] + budgetData[18] + budgetData[19];
          d[4] = budgetData[17];
          d[5] = budgetData[11];
          d[6] = budgetData[3] + budgetData[5];
          d[7] = budgetData[4] + budgetData[12] + budgetData[13] + budgetData[14];
          d[8] = budgetData[9] + budgetData[10];
          d[9] = budgetData[21] + budgetData[22] + budgetData[23] + budgetData[24];
          d[10] = budgetData[25] + budgetData[26] + budgetData[28] + budgetData[29];
          d[11] = budgetData[15];
          d[12] = budgetData[27];
          d[13] = budgetData[35];
          d[14] = budgetData[30] + budgetData[31];
          d[15] = budgetData[37];
          d[16] = budgetData[33] + budgetData[34] + budgetData[20];
          d[17] = budgetData[36];
          for(var i =0; i<d.length; i++){
            d[i] = d[i]/12;
          }
          setBarData(d);
        }
    } , [budgetData]);

    const fetchData = async () => {
        try {
          const userDat = await API.graphql(graphqlOperation(listDatas));
          const userList = userDat.data.listDatas.items;
          console.log('user list', userList);
            userList[0].data = userList[0].data.replaceAll("=",":");
            userList[0].data = json5.parse(userList[0].data);
            setPropertytax(userList[0].data.propertytax);
            setStatetax(userList[0].data.incometax.statetax);
            setFederaltax(userList[0].data.incometax.federaltax);
            setUserData(userList);
          
        } catch (error) {
          console.log('error on fetching users', error);
        }
      }

    const saveChanges = async () => {
        const data = userData[0];
        data.data.budget = fullJSON;
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
    const loadCurrentBudget = () => {
        const data = userData[0];
        var datamap = data.data.budget;
        var categorylist = Object.keys(datamap);
        var valuelist = Object.values(datamap);
        setBarLabels(categorylist);
        setBudgetData(valuelist);
        setIsHidden(false);
    }

    const calculateBudget = () => {
        if(age < 18)
        {
            alert("You must be 18 or older to use this tool");
            return;
        }
        const options = {
            method: 'POST',
            url: 'https://spendid.p.rapidapi.com/budgets/generate',
            headers: {
              'content-type': 'application/json',
              'x-rapidapi-host': 'spendid.p.rapidapi.com',
              'x-rapidapi-key': '594156d61bmsh39d66159c053b59p1bd302jsn08061142d6e9'
            },
            data: {
              budget: {
                savings: savings,
                tobacco_and_smoking : doesSmoke == 0 ? 0 : null,
                alcoholic_beverages : doesDrink == 0 ? 0 : null,
                vehicle_purchase_and_lease : drivesVehicle == 0 ? 0 : null,
                gasoline : drivesVehicle == 0 ? 0 : null,
                vehicle_maintenance_and_repairs : drivesVehicle == 0 ? 0 : null,
                vehicle_insurance : drivesVehicle == 0 ? 0 : null,
                other_debt_payments: 0,
              },
              demographics: {
                age: age,
                gross_annual_income: grossIncome,
                household_members: housemembers,
                is_homeowner: isHomeowner == 0 ? false : true,
                net_annual_income: grossIncome - (statetax + federaltax + propertytax),
                zip: zipcode
              }
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              setBarLabels(Object.keys(response.data.budget))
              setBudgetData(Object.values(response.data.budget));
              setFullJSON(response.data.budget);
              setIsHidden(false);
          }).catch(function (error) {
              console.error(error);
          });
          
    }

    return(
        <div>
            <h1>Budget Calculator</h1>
            <h4>Enter your information below</h4>
            <form>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(+(e.target.value))}/>
                <br/>
                <label>Gross Income:</label>
                <input type="number" value={grossIncome} onChange={(e) => setGrossIncome(+(e.target.value))}/>
                <br/>
                <label>Number of Housemembers:</label>
                <input type="number" value={housemembers} onChange={(e) => setHousemembers(+(e.target.value))}/>
                <br/>
                <label>Are you a homeowner?</label>
                <input type="checkbox" value={isHomeowner} onChange={(e) => setIsHomeowner(isHomeowner == 0 ? 1 : 0)}/>
                <br/>
                <label>Zipcode:</label>
                <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)}/>
                <br/>
                <label>How much do you want to save per year?</label>
                <input type="number" value={savings} onChange={(e) => setSavings(+(e.target.value))}/>
                <br/>
                <label>Do you smoke?</label>
                <input type="checkbox" value={doesSmoke} onChange={(e) => setDoesSmoke(doesSmoke == 0 ? 1 : 0)}/>
                <br/>
                <label>Do you drink?</label>
                <input type="checkbox" value={doesDrink} onChange={(e) => setDoesDrink(doesDrink == 0 ? 1 : 0)}/>
                <br/>
                <label>Do you drive a vehicle?</label>
                <input type="checkbox" value={drivesVehicle} onChange={(e) => setDrivesVehicle(drivesVehicle == 0 ? 1 : 0)}/>
            </form>
            <button onClick={calculateBudget}>Calculate</button>
            <br/>
            <button onClick={saveChanges}>Save Changes</button>
            <br/>
            <button onClick={loadCurrentBudget}>Load Current Budget</button>
            <br />
            {statetax}
            <br />
            {federaltax}
            <br />
            {propertytax}
            <br />
            {JSON.stringify(userData)}
            <br />
            {JSON.stringify(fullJSON)}
            <div>
                <h4>Your Monthly Budget</h4>
            
                
                
                <Bar style = {{
                    display: isHidden ? "none" : "block"
                }} data= {{
                    labels : budgetItems,
                    datasets : [{
                        data : barData,
                        backgroundColor : colors,
                     }]
                }} />
                <Bar style = {{
                    display: isHidden ? "none" : "block"
                }} data = {{
                    labels : barLabels,
                    datasets : [{
                        data: budgetData,
                        backgroundColor : colors,
                    }]
                }} />
            </div>

        </div>
    )
}

export default Budget;