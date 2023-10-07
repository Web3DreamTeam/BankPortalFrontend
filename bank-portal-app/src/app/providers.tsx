'use client'; 
import { ChakraProvider } from "@chakra-ui/react";
import DIDProvider from "./context";

export function Providers ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ChakraProvider>
            <DIDProvider>
                {children}
            </DIDProvider>
        </ChakraProvider>
    )
}