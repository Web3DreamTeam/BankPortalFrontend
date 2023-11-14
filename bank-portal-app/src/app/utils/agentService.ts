import axios, { AxiosError } from 'axios'; 
import { verifierUsername } from './constants';

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
export const issueCredentials = async (targetDID:string,subjectData:any,credentialType:string) => {
    const url = agentAPIUrl+'/issue'

    const did = await getDID('JPM'); 

    const body = {
        did:did,
        targetDID:targetDID,
        subjectData: subjectData,
        credentialType: credentialType,
        claimValues:undefined,
        additionalParams:undefined,
    }

    let response = await axios.post(url,body); 
    console.log(response.data.data.credential); 
    return response.data.data.credential; 
}

export const saveVC = async (did:string, vc:any) => {
    const url = agentAPIUrl+'/save'; 
    const body = {did:did, vc:vc}; 

    let response = await axios.post(url,body); 

    return response; 
}

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






