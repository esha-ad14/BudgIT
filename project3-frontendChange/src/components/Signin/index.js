import React from 'react'
import {Container, FormWrap, Icon, Form, FormH1, FormInput, Text, FormButton, FormContent, FormLabel } from './SigninElements';

const SignIn = () => {
    return (
     <>
       <Container>
           <FormWrap>
               <Icon to= '/'>BudgIt</Icon>
               <FormContent>
                   <Form action='#'>
                       <FormH1>Sign In</FormH1>
                       <FormLabel htmlFor='for'>Email</FormLabel>
                       <FormInput type='email' required />
                       <FormLabel htmlFor='for'>Password</FormLabel>
                       <FormInput type='password' required />
                       <FormButton type='submit'>Continue</FormButton>
                       <Text>Forgot Password</Text>
                   </Form>
               </FormContent>
           </FormWrap>
       </Container>     
     </>
    );
};

export default SignIn;
