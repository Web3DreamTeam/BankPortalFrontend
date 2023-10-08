import { useDIDContext } from "@/app/context";
import { login } from "@/app/utils/agentService";
import { Button, Divider, FormControl,Icon, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

import {BsFillKeyFill} from 'react-icons/bs';
import {FaRegUserCircle} from 'react-icons/fa'


interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 
}

const LoginModal = ({isOpen, onClose}:ModalProps) => {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    const {setDID} = useDIDContext(); 

    const [errorMessage, setErrorMessage] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); 
    
    const handleLogin = async () => {
        setErrorMessage('');
        setIsLoading(true); 
       // load the first account
        const did = await login(username, password); 
        if(did) {
            setDID(did); 
            onClose();
        } else {
            setErrorMessage('Something went wrong, try again')
        }
        setIsLoading(false); 
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <Button ml={'75%'} onClick={onClose} variant='close'>Close</Button>
                <ModalBody mb={5} justifyContent={'center'}>
                <Divider />
                    <FormControl isRequired>
                        <Stack alignItems={'center'} spacing={2}>
                            <Text textAlign={'center'}>Login with your DID</Text>
                            <InputGroup mb={6} w={'80%'}>
                                <InputLeftElement>
                                    <Icon as={FaRegUserCircle}></Icon>
                                </InputLeftElement>
                                <Input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="test123"/>
                            </InputGroup>
                            <InputGroup mb={6} w={'80%'}>
                                <InputLeftElement>
                                    <Icon as={BsFillKeyFill}></Icon>
                                </InputLeftElement>
                                <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="test123"/>
                            </InputGroup>
                            {errorMessage && <Text color={'red.500'}>{errorMessage}</Text>}
                            <Button w={'60%'} isLoading={isLoading} onClick={handleLogin} mb={4} color={'#261803'} >Login</Button>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default LoginModal; 