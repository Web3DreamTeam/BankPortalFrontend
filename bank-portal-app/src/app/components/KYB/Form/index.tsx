import { Button, Divider, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerificationModal from "../../common/VerificationModal";
import { parseDollarAmount } from "@/app/utils/helpers";
import {LuPartyPopper} from 'react-icons/lu'; 
interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 
}

const KYBForm = ({isOpen, onClose}:ModalProps) => {

    // ui elements state
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false); 
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [progress, setProgress] =  useState(0);

    //credentials state
    const [credentialType, setCredentialType] = useState('');
    const [businessLicenseCredentialData, setBusinessLicenseCredentialData] = useState<any>(undefined); 
    const [incomeStatementCredentialData, setIncomeStatementCredentialData] = useState<any>(undefined);

     const handleAutofill = (cType:string) => {
         // show the verification modal
         setCredentialType(cType);
         setIsVerificationModalOpen(true);  
     }
 
    const handleSubmitApplication = () => {
        setIsSubmitted(true); 
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
                {!isSubmitted ? 
                <div>
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
                                <Button variant={businessLicenseCredentialData ? 'outline' : 'solid'} isDisabled={!!businessLicenseCredentialData} onClick={() => handleAutofill("BusinessLicenseCredential")} mb={4} backgroundColor={'whitesmoke'} color={'#261803'} >{businessLicenseCredentialData ? 'Business License Verified': 'Autofill with Business License VC'}</Button>
                            </Stack>
                        </FormControl>
                        <FormControl>
                            <Stack spacing={2}>   
                                <Divider border='2px solid #FOBD3F'></Divider> 
                                <Text textAlign={'center'}>Financial Information</Text>
                                <FormLabel>Gross Profit</FormLabel>
                                <Input variant={incomeStatementCredentialData ? 'filled' : 'outline'} defaultValue={incomeStatementCredentialData ? parseDollarAmount(incomeStatementCredentialData.grossProfit) : ''} type="text" placeholder="$"/>
                                <FormLabel>Operating Expenses</FormLabel>
                                <Input variant={incomeStatementCredentialData ? 'filled' : 'outline'} defaultValue={incomeStatementCredentialData ? parseDollarAmount(incomeStatementCredentialData.operatingExpenses) : ''} type="text" placeholder="$"/>
                                <FormLabel>Tax Rate</FormLabel>
                                <Input variant={incomeStatementCredentialData ? 'filled' : 'outline'} defaultValue={incomeStatementCredentialData ? incomeStatementCredentialData.taxRate+'%' : ''} type="text" placeholder="%"/>
                                <Button variant={incomeStatementCredentialData ? 'outline' : 'solid'} isDisabled={!!incomeStatementCredentialData} onClick={() => handleAutofill("IncomeStatementCredential")} mb={4} backgroundColor={'whitesmoke'} color={'#261803'} >{businessLicenseCredentialData ? 'Business License Verified': 'Autofill with Income Statement VC'}</Button>
                            </Stack>
                        </FormControl>
                        <FormControl mt={5} isRequired>
                            <Stack spacing={2}>
                                <Button isDisabled={progress < 99} onClick={handleSubmitApplication} mb={4} color={'#261803'} backgroundColor={"white"} variant={'outline'}>Submit Application</Button>
                            </Stack>
                        </FormControl>
                    </div> : 
                    <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Text mb={4} textAlign={'center'} fontSize={24} fontWeight={'bold'}>Congratulations Your Application has been approved!</Text>
                    <Text textAlign={'center'} fontSize={16}>You will receive your credit card by mail in the next 7 business days</Text>
                    <Icon m={10} boxSize={150} color={'blueviolet'} as={LuPartyPopper}></Icon>
                </Flex>}
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default KYBForm; 