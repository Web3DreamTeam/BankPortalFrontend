import { Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerificationModal from "../../common/VerificationModal";
import { parseDateOfBirth,parseSalary } from "@/app/utils/helpers";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 

}

const KYCForm = ({isOpen, onClose}:ModalProps) => {

    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false); 

    // credentials state
    const [credentialType, setCredentialType] = useState('');
    const [identityCredentialsData, setIdentityCredentialsData] = useState<any>(undefined); 
    const [addressCredentialsData, setAddressCredentialsData] = useState<any>(undefined); 
    const [employmentCredentialsData, setEmploymentCredentialsData] = useState<any>(undefined); 

    // ui elements state
    const [progress, setProgress] =  useState(0);

    const handleAutofill = (cType:string) => {
        // show the verification modal
        setCredentialType(cType);
        setIsVerificationModalOpen(true);  
    }

    const handleSubmitApplication = () => {

    }

    const updateProgressBar = () => {
        const base = 33;
        let multiplier = 0; 
        if(identityCredentialsData)
            multiplier+=1
        if(addressCredentialsData)
            multiplier+=1
        if(employmentCredentialsData)
            multiplier+=1
        setProgress(base*multiplier); 
    }

    const selectCredentialDataState = (credentialType:string) => {
        if(credentialType === 'PassportCredential')
            return setIdentityCredentialsData; 
        if(credentialType === 'UtilityBillCredential')
            return setAddressCredentialsData;
        if(credentialType === 'EmploymentCredential')
            return setEmploymentCredentialsData;
    }

    useEffect(() => {
        updateProgressBar(); 
        console.log(identityCredentialsData); 
    },[identityCredentialsData, addressCredentialsData, employmentCredentialsData, isOpen])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <VerificationModal 
                            isOpen={isVerificationModalOpen} 
                            onClose={() => setIsVerificationModalOpen(false)} 
                            setVCData={selectCredentialDataState(credentialType)!} 
                            getCredentialType={() => credentialType}
                            />
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                <Flex w='100%' justify='space-between'>
                    <Text fontWeight='bold'>Application Summary</Text>
                    <Button onClick={onClose} variant='close'>Close</Button>
                    </Flex>
                    <Divider border='2px solid #FOBD3F'></Divider>
                    <Progress value={progress} size='xs' colorScheme='green' />
                </ModalHeader>
                <ModalBody justifyContent={'center'}>
                <Divider border='2px solid #FOBD3F'></Divider>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <Text textAlign={'center'}>Identity Information</Text>
                            <FormLabel>First Name</FormLabel>
                            <Input variant={identityCredentialsData ? 'filled' : 'outline'} defaultValue={identityCredentialsData ? identityCredentialsData.firstName : ''} type="text" placeholder="Bob"/>
                            <FormLabel >Last Name</FormLabel>
                            <Input variant={identityCredentialsData ? 'filled' : 'outline'} defaultValue={identityCredentialsData ? identityCredentialsData.lastName : ''} type="text" placeholder="Fischer"/>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input variant={identityCredentialsData ? 'filled' : 'outline'} defaultValue={identityCredentialsData ? parseDateOfBirth(identityCredentialsData.dateOfBirth) : ''} type="text"/>
                            <Button variant={identityCredentialsData ? 'outline' : 'solid'} isDisabled={!!identityCredentialsData} onClick={() => handleAutofill("PassportCredential")} mb={4} colorScheme={'green'} >{identityCredentialsData ? 'Identity Verified': 'Autofill with Identity VC'}</Button>
                        </Stack>
                    </FormControl>
                    <Divider border='2px solid #FOBD3F'></Divider>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                        <Divider border='2px solid #FOBD3F'></Divider>
                        <Text textAlign={'center'}>Address Information</Text>
                        <FormLabel>Country</FormLabel>
                        <Input variant={addressCredentialsData ? 'filled' : 'outline'} defaultValue={addressCredentialsData ? addressCredentialsData.country : ''} type="text" placeholder="United States"/>
                        <FormLabel>State</FormLabel>
                        <Input variant={addressCredentialsData ? 'filled' : 'outline'} defaultValue={addressCredentialsData ? addressCredentialsData.state : ''} type="text" placeholder="New York"/>
                        <FormLabel>City</FormLabel>
                        <Input variant={addressCredentialsData ? 'filled' : 'outline'} defaultValue={addressCredentialsData ? addressCredentialsData.city : ''} type="text" placeholder="New York"/>
                        <FormLabel>Address Line</FormLabel>
                        <Input variant={addressCredentialsData ? 'filled' : 'outline'} defaultValue={addressCredentialsData ? addressCredentialsData.address : ''} type="text" placeholder="7th Avenue"/>
                        <FormLabel>Zip Code</FormLabel>
                        <Input variant={addressCredentialsData ? 'filled' : 'outline'} defaultValue={addressCredentialsData ? addressCredentialsData.zipCode : ''} type="text" placeholder="M5H 2X4"/>
                        <Button variant={addressCredentialsData ? 'outline' : 'solid'} isDisabled={!!addressCredentialsData} onClick={() => handleAutofill("UtilityBillCredential")} mb={4}  colorScheme={"green"}> Autofill with Address VCs</Button>
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <Divider border='2px solid #FOBD3F'></Divider>
                            <Text textAlign={'center'}>Employment Information</Text>
                            <FormLabel>Employer Name</FormLabel>
                            <Input variant={employmentCredentialsData ? 'filled' : 'outline'} defaultValue={employmentCredentialsData ? employmentCredentialsData.employerName : ''} type="text" placeholder="Abbott Inc."/>
                            <FormLabel>Job Title</FormLabel>
                            <Input variant={employmentCredentialsData ? 'filled' : 'outline'} defaultValue={employmentCredentialsData ? employmentCredentialsData.jobTitle : ''} type="text" placeholder="Data Analyst"/>
                            <FormLabel>Salary</FormLabel>
                            <Input variant={employmentCredentialsData ? 'filled' : 'outline'} defaultValue={employmentCredentialsData ? parseSalary(employmentCredentialsData.salary) : ''} type="text" placeholder="$"/>
                            <Button variant={employmentCredentialsData ? 'outline' : 'solid'} isDisabled={!!employmentCredentialsData} onClick={() => handleAutofill("EmploymentCredential")} color="white" colorScheme={"green"}>Autofill with Employment VCs</Button>
                        </Stack>
                    </FormControl>
                    <FormControl mt={5} isRequired>
                        <Stack spacing={2}>
                            <Button isDisabled={progress < 99} onClick={handleSubmitApplication} mb={4} color="blue.400" backgroundColor={"white"} variant={'outline'}>Submit Application</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default KYCForm; 