import { Button, Divider, FormControl, FormLabel, Icon, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import {FaRegUserCircle} from "react-icons/fa"
interface ModalProps {
    isOpen: boolean;
    onClose: () => void; 
}
const LoginModal = ({isOpen, onClose}:ModalProps) => {

    const [username, setUsername] = useState(undefined);
    
    const handleUsernameChange = (e:any) => {
        setUsername(e.target.value)
    }

    const handleLogin = () => {
        // resolve did
        //update global state
        // close modal
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalBody justifyContent={'center'}>
                <Divider />
                    <FormControl isRequired>
                        <Stack alignItems={'center'} spacing={2}>
                            <Text textAlign={'center'}>Login with your DID</Text>
                            <InputGroup mb={6} w={'80%'}>
                                <InputLeftElement>
                                    <Icon as={FaRegUserCircle}></Icon>
                                </InputLeftElement>
                                <Input onChange={handleUsernameChange} type="text" placeholder="test123"/>
                            </InputGroup>
                            <Button w={'60%'} onClick={handleLogin} mb={4} colorScheme={'messenger'} >Login</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
} 

export default LoginModal; 
