import { Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Progress, Stack, Text } from "@chakra-ui/react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 
}

const KYBForm = ({isOpen, onClose}:ModalProps) => {
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
                <Divider />
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <Text textAlign={'center'}>Business Information</Text>
                            <FormLabel>Business Legal Name</FormLabel>
                            <Input type="text" placeholder="Business Legal Name"/>
                            <FormLabel>License Number</FormLabel>
                            <Input type="text" placeholder="License Number"/>
                            <FormLabel>Tax Identification Number</FormLabel>
                            <Input type="text" placeholder="Tax Identification Number"/>
                            <FormLabel>Mailing Address</FormLabel>
                            <Input type="email" placeholder="Mailing Address"/>
                            <FormLabel>City</FormLabel>
                            <Input type="text" placeholder="City"/>
                            <FormLabel>Zip Code</FormLabel>
                            <Input type="text" placeholder="Zip Code"/>
                            <Button mb={4} color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Business License VC</Button>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <Stack spacing={2}>   
                            <Divider border='2px solid #FOBD3F'></Divider> 
                            <Text textAlign={'center'}>Financial Information</Text>
                            <FormLabel>Gross Profit</FormLabel>
                            <Input type="text" placeholder="$"/>
                            <FormLabel>Operating Expenses</FormLabel>
                            <Input type="text" placeholder="$"/>
                            <FormLabel>Net Income</FormLabel>
                            <Input type="text" placeholder="$"/>
                            <Button mb={4} color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Business License VC</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default KYBForm; 