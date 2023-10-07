import { Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerificationModal from "../../common/VerificationModal";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 
}

const KYBForm = ({isOpen, onClose}:ModalProps) => {

    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false); 

    //credentials state
    const [credentialType, setCredentialType] = useState('');
    const [businessLicenseCredentialData, setBusinessLicenseCredentialData] = useState<any>(undefined); 
    const [incomeStatementCredentialData, setIncomeStatementCredentialData] = useState<any>(undefined);
    
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
        const base = 50;
        let multiplier = 0; 
        if(businessLicenseCredentialData)
            multiplier+=1
        if(incomeStatementCredentialData)
            multiplier+=1
        setProgress(base*multiplier); 
    }

    const selectCredentialDataState = (credentialType:string) => {
        if(credentialType === 'BusinessLicenceCredential')
            return setBusinessLicenseCredentialData; 
        if(credentialType === 'IncomeStatementCredential')
            return setIncomeStatementCredentialData;
    }
    useEffect(() => {
        updateProgressBar(); 
        console.log(businessLicenseCredentialData); 
    },[businessLicenseCredentialData, incomeStatementCredentialData,isOpen])
    
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
                <Divider />
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <Text textAlign={'center'}>Business Information</Text>
                            <FormLabel>Business Legal Name</FormLabel>
                            <Input variant={businessLicenseCredentialData ? 'filled' : 'outline'} defaultValue={businessLicenseCredentialData ? businessLicenseCredentialData.legalName : ''} type="text" placeholder="Business Legal Name"/>
                            <FormLabel>License Number</FormLabel>
                            <Input variant={businessLicenseCredentialData ? 'filled' : 'outline'} defaultValue={businessLicenseCredentialData ? businessLicenseCredentialData.licenseNumber : ''} type="text" placeholder="License Number"/>
                            <FormLabel>Tax Identification Number</FormLabel>
                            <Input variant={businessLicenseCredentialData ? 'filled' : 'outline'} defaultValue={businessLicenseCredentialData ? businessLicenseCredentialData.taxIdentificationNumber : ''} type="text" placeholder="Tax Identification Number"/>
                            <FormLabel>Mailing Address</FormLabel>
                            <Input variant={businessLicenseCredentialData ? 'filled' : 'outline'} defaultValue={businessLicenseCredentialData ? businessLicenseCredentialData.mailingAddress : ''} type="email" placeholder="Mailing Address"/>
                            <FormLabel>City</FormLabel>
                            <Input variant={businessLicenseCredentialData ? 'filled' : 'outline'} defaultValue={businessLicenseCredentialData ? businessLicenseCredentialData.city : ''} type="text" placeholder="City"/>
                            <FormLabel>Zip Code</FormLabel>
                            <Input variant={businessLicenseCredentialData ? 'filled' : 'outline'} defaultValue={businessLicenseCredentialData ? businessLicenseCredentialData.zipCode : ''} type="text" placeholder="Zip Code"/>
                            <Button variant={businessLicenseCredentialData ? 'outline' : 'solid'} isDisabled={!!businessLicenseCredentialData} onClick={() => handleAutofill("BusinessLicenseCredential")} mb={4} colorScheme={'green'} >{businessLicenseCredentialData ? 'Business License Verified': 'Autofill with Business License VC'}</Button>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <Stack spacing={2}>   
                            <Divider border='2px solid #FOBD3F'></Divider> 
                            <Text textAlign={'center'}>Financial Information</Text>
                            <FormLabel>Gross Profit</FormLabel>
                            <Input variant={incomeStatementCredentialData ? 'filled' : 'outline'} defaultValue={incomeStatementCredentialData ? incomeStatementCredentialData.grossProfit : ''} type="text" placeholder="$"/>
                            <FormLabel>Operating Expenses</FormLabel>
                            <Input variant={incomeStatementCredentialData ? 'filled' : 'outline'} defaultValue={incomeStatementCredentialData ? incomeStatementCredentialData.operatingExpenses : ''} type="text" placeholder="$"/>
                            <FormLabel>Tax Rate</FormLabel>
                            <Input variant={incomeStatementCredentialData ? 'filled' : 'outline'} defaultValue={incomeStatementCredentialData ? incomeStatementCredentialData.taxRate+'%' : ''} type="text" placeholder="%"/>
                            <Button variant={incomeStatementCredentialData ? 'outline' : 'solid'} isDisabled={!!incomeStatementCredentialData} onClick={() => handleAutofill("IncomeStatementCredential")} mb={4} colorScheme={'green'} >{businessLicenseCredentialData ? 'Business License Verified': 'Autofill with Income Statement VC'}</Button>
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

export default KYBForm; 