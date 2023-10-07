import { requestPresentation, verifyCredentials } from "@/app/utils/agentService";
import { Button, Divider, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {BiSolidCheckCircle} from 'react-icons/bi'

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void; 
    getCredentialType:() => string; 
    setVCData: (data:any) => void;
}

const VerificationModal = ({isOpen, onClose, getCredentialType, setVCData}:VerificationModalProps) => {
    // verification process states
    const [targetUsername, setTargetUsername] = useState('');
    const [qrData, setQRData] = useState<any>(undefined); 
    const [verified, setVerified] = useState(false); 
    // UI states
    const [errorMessage, setErrorMessage] = useState(''); 
    const [isLoading, setIsLoading] = useState(false)

    const handlePresentationRequest = async () => {
        setIsLoading(true);
        const data = await requestPresentation(targetUsername, getCredentialType());
        console.log(data);
        setIsLoading(false);
        setQRData(data); 
    }

    const handleVerifyPresentation = async () => {
        setErrorMessage(''); 
        if(qrData) {
            setIsLoading(true);
            const data = await verifyCredentials(qrData.data.id); 
            console.log(data.verifiablePresentation.verifiableCredential[0].credentialSubject); 
            setIsLoading(false)
            // if verification successful
                // set verified to true
            setVerified(data.verified); 
            // bubble up the VC data to fill the form
            setVCData(data.verifiablePresentation.verifiableCredential[0].credentialSubject);
            // else
                // setErrorMessage 
        } 
    }

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
                            {(!qrData && !verified) &&
                            <Flex justifyContent={'center'} flexDirection={'column'}>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" placeholder="username" onChange={(e) => setTargetUsername(e.target.value)}></Input>
                                <Button m={4} isLoading={isLoading} onClick={handlePresentationRequest} mb={4} color="white" backgroundColor={"green.400"} variant={'solid'}>Request Verifiable Presentation QR</Button>
                            </Flex>}
                            {(qrData && !verified) &&
                            <Flex alignItems={'center'} flexDirection={'column'}>
                                <FormLabel>Scan QR</FormLabel>
                                <QRCode size={200} value={JSON.stringify(qrData)}/>
                                <Button m={4} isLoading={isLoading} onClick={handleVerifyPresentation} borderColor={errorMessage && 'red.400'} mb={4} color="white" backgroundColor={"green.400"} variant={'solid'}>Verify My credentials</Button>
                                {errorMessage && <Text color={'red.400'}>Please Retry</Text>}
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