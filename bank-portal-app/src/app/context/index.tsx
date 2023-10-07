'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface DIDContextValue {
    did:string; 
    setDID: (did:string) => void; 
}

interface DIDProviderProps {
    children:ReactNode;
}

export const DIDContext = createContext<DIDContextValue | undefined>(undefined); 

const DIDProvider:React.FC<DIDProviderProps> = ({
    children,
}) => {
    const [did, setDID] = useState<string>(''); 

    useEffect(() =>{},[]); 

    return (
        <DIDContext.Provider
            value={{
                did, 
                setDID
            }}
        >
            {children}
        </DIDContext.Provider>
    ); 
}

export const useDIDContext = () => {
    const contextValue = useContext(DIDContext); 
    if(!contextValue) {
        throw new Error('useDIDContext must be within a DIDContextProvider'); 
    }

    return contextValue; 
}

export default DIDProvider; 