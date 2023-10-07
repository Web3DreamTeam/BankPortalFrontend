import axios from 'axios'; 
import { verifierUsername } from './constants';

const agentAPIUrl = 'http://localhost:8000'

// verify VP
    // request presentation status
    // get the JWT 
    // verify it
    // return the data, component can pick it up
// request presentation + embed in QR

// the bank is the verifier
    // requests a presentation
        // receives data for a qr code
            // generate the qr code and show it on the frontend
            // request presentation status with the id to get the JWT
            // verify the presentation with the JWT you got
export const getDID = async (username:string) => {
    const url = agentAPIUrl+'/discover/'+username; 
    const response = await axios.get(url);
    // return the did
    return response.data.did;  

}

export const requestPresentation = async (targetUsername:any,credentialType:string) => {
    // get the bank's did
    const did = await getDID(verifierUsername); 
    // get the user's did
    const targetDID = await getDID(targetUsername); 
    //build the url
    const url = agentAPIUrl+'/request-presentation';
    // send the request
    const response = await axios.post(url, {did:did,targetDID:targetDID,credentialTypes:[credentialType]}); 
    // return the qr data with the vp id
    return response.data; 
}
/*
export const requestPresentationStatus = async (presentationID:string) => {
    // get the did of the verifier, i.e. the bank
    const did = await getDID(verifierUsername);
    //build the url
    const url = agentAPIUrl+'/request-presentation-status'; 
    // get the status 
    const response = await axios.post(url,{did,presentationID}); 
    // extract the VP JWT
    const JWT = response.data;
    
    return JWT;
    
} */

export const verifyCredentials = async (presentationID:string) => {
    const url = agentAPIUrl+'/verify'; 
    // get the verifier's did
    const did = await getDID(verifierUsername);
    // verify the presentation 
    const response = await axios.post(url, {did:did, id:presentationID}); 
    // extract the object
    //TODO: run an example to see the response
    const obj = response.data; 

    return obj; 
}

export const getBalance = async (did:string) => {
    const url = agentAPIUrl+'/get-balance/'+did; 

    const response = await axios.get(url); 
    if(response.status === 200) {
        return response.data.balance; 
    }
}

export const login = async (username:string, password:string) => {
    const url = agentAPIUrl+'/login'; 

    const response = await axios.post(url, {username:username, password:password}); 
    if(response.status === 200) {
        return response.data.did; 
    }
}




