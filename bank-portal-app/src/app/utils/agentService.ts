import axios, { AxiosError } from 'axios'; 
import { ReusableKYCCredential, verifierUsername } from './constants';

const agentAPIUrl = 'http://localhost:8000';

export const login = async (username:string, password:string) => {
    const url = agentAPIUrl+'/login'; 

    const response = await axios.post(url, {username:username, password:password}); 
    if(response.status === 200) {
        return response.data.did; 
    }
}

export const getDID = async (username:string) => {
    const url = agentAPIUrl+'/discover/'+username; 
    const response = await axios.get(url);
    // return the did
    return response.data.did;  

}

export const requestPresentation = async (targetDID:any,credentialType:string[]) => {
    // get the bank's did
    const did = await getDID(verifierUsername); 
    // get the user's di
    //build the url
    const url = agentAPIUrl+'/request-presentation';
    // send the request
    let response = await axios.post(url, {did:did,targetDID:targetDID,credentialTypes:credentialType}); 
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
    try {
        const response = await axios.post(url, {did:did, id:presentationID})
        // extract the object
        //TODO: run an example to see the response
        const obj = response.data; 

        return obj; 
    } catch(error:AxiosError|any) {
    }
}

export const getBalance = async (did:string) => {
    const url = agentAPIUrl+'/get-balance/'+did; 

    const response = await axios.get(url); 
    if(response.status === 200) {
        return response.data.balance; 
    }
}

export const  issueReusableKYC = async (targetDID:string, credentialData:ReusableKYCCredential) => {
    const url = agentAPIUrl+ '/issue'; 

    const did = await getDID(verifierUsername); 

    const response = await axios.post(url,{did:did, targetDID:targetDID, subjectData:credentialData,credentialType:"ReusableKYCCredential",claimValues:undefined,additionalParams:undefined}); 
    console.log(response.data.data);
    return response.data.data.credential; 
}

export const saveCredential = async (vc:any, did:any) => {
    const url = agentAPIUrl + '/save'
    const response = await axios.post(url,{did:did, vc:vc}); 
    console.log(response)
    return response; 
}







