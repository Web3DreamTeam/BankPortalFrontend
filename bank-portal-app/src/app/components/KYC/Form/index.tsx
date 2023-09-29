import { Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 

}
const KYCForm = ({isOpen, onClose}:ModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                <Flex w='100%' justify='space-between'>
                    <Text fontWeight='bold'>Application Summary</Text>
                    <Button onClick={onClose} variant='close'>Close</Button>
                    </Flex>
                    <Divider border='2px solid #FOBD3F'></Divider>
                    <Progress value={50} size='xs' colorScheme='green' />
                </ModalHeader>
                <ModalBody justifyContent={'center'}>
                <Divider border='2px solid #FOBD3F'></Divider>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <Text textAlign={'center'}>Identity Information</Text>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" placeholder="Bob"/>
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" placeholder="Fischer"/>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input type="date"/>
                            <Button mb={4} color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Identity VC</Button>
                        </Stack>
                    </FormControl>
                    <Divider border='2px solid #FOBD3F'></Divider>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                        <Divider border='2px solid #FOBD3F'></Divider>
                        <Text textAlign={'center'}>Address Information</Text>
                        <FormLabel>Country</FormLabel>
                        <Input type="text" placeholder="United States"/>
                        <FormLabel>City</FormLabel>
                        <Input type="text" placeholder="New York"/>
                        <FormLabel>Address Line</FormLabel>
                        <Input type="text" placeholder="7th Avenue"/>
                        <FormLabel>Zip Code</FormLabel>
                        <Input type="text" placeholder="M5H 2X4"/>
                        <Button mb={4} color="white" backgroundColor={"green.400"} variant={'solid'}> Autofill with Address VCs</Button>
                        </Stack>
                    </FormControl>
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <Divider border='2px solid #FOBD3F'></Divider>
                            <Text textAlign={'center'}>Employment Information</Text>
                            <FormLabel>Employer Name</FormLabel>
                            <Input type="text" placeholder="Abbott Inc."/>
                            <FormLabel>Job Title</FormLabel>
                            <Input type="text" placeholder="Data Analyst"/>
                            <FormLabel>Salary</FormLabel>
                            <Input type="text" placeholder="$"/>
                            <Button color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Employment VCs</Button>
                        </Stack>
                    </FormControl>
                    <FormControl mt={5} isRequired>
                        <Stack spacing={2}>
                            <Button mb={4} color="blue.400" backgroundColor={"white"} variant={'outline'}>Submit Application</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default KYCForm; 