import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createData } from '../graphql/mutations';
import { listDatas } from '../graphql/queries';

const handleSignUp = async (formData) => {
  const param = {
    ...formData,
    attributes: {
      ...formData.attributes,
      'preferred_username': formData.username,
    }
  }
  const data = await Auth.signUp(param);
  
  return data;
}


const Login = () => {

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (authState === undefined) {
      Auth.currentAuthenticatedUser().then(authData => {
        setAuthState(AuthState.SignedIn);
        setUser(authData);
        createDataForUser();
      });
    }
    
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  const createDataForUser = async () => {
    const userData = await API.graphql(graphqlOperation(listDatas));
    const userList = userData.data.listDatas.items;
    if(userList.length === 0) {
    try {
      const basedata = {
        incometax: {
          statetax : 0,
          federaltax : 0,
        },
        propertytax:0,
        budget: {},
      }
      const querydetails = { data : basedata}
      await API.graphql(graphqlOperation(createData, {input: querydetails}));
    } catch (e) {
      console.error(e);
    }
  }
  }

  if (authState === AuthState.SignedIn && user) {
    
    return <div>
             <div>Hello, {user.username}</div>
             
             <AmplifySignOut />
           </div>;
  }
  return <AmplifyAuthenticator>
           <AmplifySignUp
             formFields={[
               { type: 'username' },
               { type: 'password' },
             ]}
             handleSignUp={handleSignUp}
             slot="sign-up"
           ></AmplifySignUp>
         </AmplifyAuthenticator>;
};

export default Login;
