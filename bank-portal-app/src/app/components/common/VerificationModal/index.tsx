import { requestPresentation, verifyCredentials } from "@/app/utils/agentService";
import { Button, Divider, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text, useInterval } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {BiSolidCheckCircle} from 'react-icons/bi'
import { useDIDContext } from "@/app/context";

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void; 
    getCredentialType:() => string[]; 
    setFormData: (data:any) => void;
}

const VerificationModal = ({isOpen, onClose, getCredentialType, setFormData}:VerificationModalProps) => {
    // verification process states
    const {did} = useDIDContext(); 
    const [qrData, setQRData] = useState<any>(undefined); 
    const [verified, setVerified] = useState(false);

    const handlePresentationRequest = async () => {
        const data = await requestPresentation(did, getCredentialType());
        console.log(data);
        setQRData(data); 
    }

    const handleVerifyPresentation = async () => {
        if(qrData) {
                const data = await verifyCredentials(qrData.data.id); 
                console.log(data);
                if(data && data.vp && data.vp.verified && data.disclosed && data.disclosed.length > 0) { // sd -jwt
                    setVerified(data.vp.verified); 
                    // bubble up the VC data to fill the form
                    setFormData(data);

                }  
                if(data && data.verified) {
                    setVerified(data.verified); 
                    // bubble up the VC data to fill the form
                    setFormData(data.verifiablePresentation.verifiableCredential);
                }
            }
        }
    
    useInterval(() => {
        if(!qrData && isOpen)
            handlePresentationRequest();
        if((qrData && !verified))
            handleVerifyPresentation();
    },!verified ? 2000 : null)     

    useEffect(() => {
    },[qrData,verified]); 

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                <Flex w='100%' justify='space-between'>
                    <Text fontWeight='bold'>Verification Process</Text>
                    <Button onClick={onClose} variant='close'>Close</Button>
                    </Flex>
                </ModalHeader>
                <ModalBody justifyContent={'center'}>
                <Divider border='2px solid #FOBD3F'></Divider>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                        <Text fontWeight={'bold'} textAlign={'center'}>Follow the Instructions</Text>
                            {(qrData && !verified) &&
                            <Flex alignItems={'center'} flexDirection={'column'}>
                                <FormLabel>Scan QR</FormLabel>
                                <QRCode size={200} value={JSON.stringify(qrData)}/>
                            </Flex>
                            }
                            {verified && 
                            <Flex flexDirection={'column'} alignItems={'center'}>
                                <Text>Credentials Verified Successfully</Text>
                                <Icon boxSize={100} color={'green.400'} as={BiSolidCheckCircle}></Icon>
                            </Flex>
                            }
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default VerificationModal;