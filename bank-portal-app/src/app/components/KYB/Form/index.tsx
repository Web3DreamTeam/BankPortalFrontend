import { Button, Divider, Flex, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerificationModal from "../../common/VerificationModal";
import { parseDollarAmount } from "@/app/utils/helpers";
import {LuPartyPopper} from 'react-icons/lu'; 
import { BusinessLicenseCredential, IncomeStatementCredential, KYBCredentials } from "@/app/utils/constants";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 
}

interface KYB {
    businessLicenseVC:any|undefined; 
    incomeStatementVC:any|undefined; 
}

const KYBForm = ({isOpen, onClose}:ModalProps) => {

    // ui elements state
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false); 
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [progress, setProgress] =  useState(0);

    //credentials state
    const [credentialType, setCredentialType] = useState('');
    const [kybData, setKybData] = useState<KYB>({businessLicenseVC: undefined, incomeStatementVC: undefined})

     const handleAutofill = (cType:string) => {
         setCredentialType(cType);
         setIsVerificationModalOpen(true);  
     }
 

    const updateProgressBar = () => {
        const base = 50;
        let multiplier = 0; 
        if(kybData.businessLicenseVC)
            multiplier+=1
        if(kybData.incomeStatementVC)
            multiplier+=1
        setProgress(base*multiplier); 
    }

    const getCredentialType = () => {
        if(credentialType === 'KYB')
            // pass an array containing all the credentials required for the KYC verification
            return KYBCredentials; 
        else { // return the specific credential
            return [credentialType]
        }
    }

    const setKYBFormData = (data:any) => {
        if(data.length > 1) {
            setKybData({businessLicenseVC:data[0].credentialSubject, incomeStatementVC: data[1].credentialSubject})
        } else {
            if(credentialType === BusinessLicenseCredential) {
                setKybData({businessLicenseVC: data[0].credentialSubject, incomeStatementVC: kybData.incomeStatementVC})
            }
            if(credentialType === IncomeStatementCredential) {
                setKybData({businessLicenseVC: kybData.businessLicenseVC, incomeStatementVC: data[0].credentialSubject})
            }
        }
    }

    useEffect(() => {
        updateProgressBar(); 
        console.log(kybData); 
    },[kybData,isOpen])
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
               <VerificationModal 
                            isOpen={isVerificationModalOpen} 
                            onClose={() => setIsVerificationModalOpen(false)} 
                            setFormData={setKYBFormData} 
                            getCredentialType={getCredentialType}
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
                    {!isSubmitted && <Flex alignItems={'center'}>
                        <Button 
                            width={'100%'}
                            variant={kybData.businessLicenseVC && kybData.incomeStatementVC ? 'outline' : 'solid'} 
                            isDisabled={kybData.businessLicenseVC && kybData.incomeStatementVC} 
                            onClick={() => handleAutofill('KYB')} 
                            m={4} 
                            backgroundColor={'whitesmoke'} 
                            color={'#261803'}
                        >
                            Autofill KYC Form
                        </Button>
                    </Flex>}
                </ModalHeader>
                <ModalBody justifyContent={'center'}>
                {!isSubmitted ? 
                <div>
                    <Divider />
                        <FormControl isRequired>
                            <Stack spacing={2}>
                                <Text textAlign={'center'}>Business Information</Text>
                                <FormLabel>Business Legal Name</FormLabel>
                                <Input 
                                    variant={kybData.businessLicenseVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.businessLicenseVC ? kybData.businessLicenseVC.legalName : ''} 
                                    type="text" 
                                    placeholder="Business Legal Name"
                                />
                                <FormLabel>License Number</FormLabel>
                                <Input 
                                    variant={kybData.businessLicenseVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.businessLicenseVC ? kybData.businessLicenseVC.licenseNumber : ''} 
                                    type="text" 
                                    placeholder="License Number"
                                />
                                <FormLabel>Tax Identification Number</FormLabel>
                                <Input 
                                    variant={kybData.businessLicenseVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.businessLicenseVC ? kybData.businessLicenseVC.taxIdentificationNumber : ''} 
                                    type="text" 
                                    placeholder="Tax Identification Number"
                                />
                                <FormLabel>Mailing Address</FormLabel>
                                <Input 
                                    variant={kybData.businessLicenseVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.businessLicenseVC ? kybData.businessLicenseVC.mailingAddress : ''} 
                                    type="email" 
                                    placeholder="Mailing Address"
                                />
                                <FormLabel>City</FormLabel>
                                <Input 
                                    variant={kybData.businessLicenseVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.businessLicenseVC ? kybData.businessLicenseVC.city : ''} 
                                    type="text" 
                                    placeholder="City"
                                />
                                <FormLabel>Zip Code</FormLabel>
                                <Input 
                                    variant={kybData.businessLicenseVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.businessLicenseVC ? kybData.businessLicenseVC.zipCode : ''} 
                                    type="text" 
                                    placeholder="Zip Code"
                                />
                                <Button 
                                    variant={kybData.businessLicenseVC ? 'outline' : 'solid'} 
                                    isDisabled={!!kybData.businessLicenseVC} 
                                    onClick={() => handleAutofill("BusinessLicenseCredential")} 
                                    mb={4} backgroundColor={'whitesmoke'} 
                                    color={'#261803'}
                                    >
                                        {kybData.businessLicenseVC ? 'Business License Verified': 'Autofill with Business License VC'}
                                </Button>
                            </Stack>
                        </FormControl>
                        <FormControl>
                            <Stack spacing={2}>   
                                <Divider border='2px solid #FOBD3F'></Divider> 
                                <Text textAlign={'center'}>Financial Information</Text>
                                <FormLabel>Gross Profit</FormLabel>
                                <Input 
                                    variant={kybData.incomeStatementVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.incomeStatementVC ? parseDollarAmount(kybData.incomeStatementVC.grossProfit) : ''} 
                                    type="text" 
                                    placeholder="$"
                                />
                                <FormLabel>Operating Expenses</FormLabel>
                                <Input 
                                    variant={kybData.incomeStatementVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.incomeStatementVC ? parseDollarAmount(kybData.incomeStatementVC.operatingExpenses) : ''} 
                                    type="text" 
                                    placeholder="$"
                                />
                                <FormLabel>Tax Rate</FormLabel>
                                <Input 
                                    variant={kybData.incomeStatementVC ? 'filled' : 'outline'} 
                                    defaultValue={kybData.incomeStatementVC ? kybData.incomeStatementVC.taxRate+'%' : ''} 
                                    type="text" 
                                    placeholder="%"
                                />
                                <Button 
                                    variant={kybData.incomeStatementVC ? 'outline' : 'solid'} 
                                    isDisabled={!!kybData.incomeStatementVC} 
                                    onClick={() => handleAutofill("IncomeStatementCredential")} 
                                    mb={4} 
                                    backgroundColor={'whitesmoke'} 
                                    color={'#261803'}
                                >
                                    {kybData.businessLicenseVC ? 'Business License Verified': 'Autofill with Income Statement VC'}
                                </Button>
                            </Stack>
                        </FormControl>
                        <FormControl mt={5} isRequired>
                            <Stack spacing={2}>
                                <Button 
                                    isDisabled={progress < 99} 
                                    onClick={() => setIsSubmitted(true)} 
                                    mb={4} 
                                    color={'#261803'} 
                                    backgroundColor={"white"} 
                                    variant={'outline'}
                                >
                                    Submit Application
                                </Button>
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