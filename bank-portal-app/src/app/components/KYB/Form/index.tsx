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
                            <FormLabel>Fill out Business details</FormLabel>
                            <Input type="text" placeholder="Business Legal Name"/>
                            <Input type="text" placeholder="License Number"/>
                            <FormLabel>Issuance Date</FormLabel>
                            <Input type="date" placeholder="Issuance Date"/>
                            <FormLabel>Expiry Date</FormLabel>
                            <Input type="date" placeholder="Expiry Date"/>
                            <Input type="text" placeholder="Tax Identification Number"/>
                            <Input type="email" placeholder="Mailing Address"/>
                            <Input type="text" placeholder="City"/>
                            <Input type="text" placeholder="Zip Code"/>
                            <Button color="white" backgroundColor={"green.400"} variant={'solid'}>Autofill with Business License VC</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default KYBForm; 