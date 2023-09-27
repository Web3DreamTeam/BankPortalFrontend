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
                    <Divider />
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <FormLabel>Fill out Identity details</FormLabel>
                            <Input type="text" placeholder="First Name"/>
                            <Input type="text" placeholder="Last Name"/>
                            <Input type="date" placeholder="Date of Birth"/>
                            <Button color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Identity VC</Button>
                        </Stack>
                    </FormControl>
                    <Divider />
                    <FormControl isRequired>
                        <Stack spacing={2}>
                        <FormLabel>Fill out Address details</FormLabel>
                        <Input type="text" placeholder="Country"/>
                        <Input type="text" placeholder="City"/>
                        <Input type="text" placeholder="Address Line 1"/>
                        <Input type="text" placeholder="Address Line 2"/>
                        <Button color="white" backgroundColor={"green.400"} variant={'solid'}> Autofill with Address VCs</Button>
                        </Stack>
                    </FormControl>
                    <Divider />
                    <FormControl isRequired>
                        <Stack spacing={2}>
                            <FormLabel>Fill out Employment Details</FormLabel>
                            <Input type="text" placeholder="Employer Name"/>
                            <Input type="text" placeholder="title"/>
                            <Input type="text" placeholder="Salary"/>
                            <Button color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Employment VCs</Button>
                        </Stack>
                    </FormControl>
                    <FormControl mt={5} isRequired>
                        <Stack spacing={2}>
                            <Button color="blue.400" backgroundColor={"white"} variant={'outline'}>Submit Application</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default KYCForm; 