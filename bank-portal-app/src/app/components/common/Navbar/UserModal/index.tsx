import { useDIDContext } from "@/app/context";
import { getBalance } from "@/app/utils/agentService";
import {Button, Divider, Flex, FormControl,Icon, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {FaRegUserCircle} from 'react-icons/fa'
import {FcMoneyTransfer} from 'react-icons/fc'

interface ModalProps {
    isOpen: boolean,
    onClose: () => void; 
}

const UserModal = ({isOpen, onClose}:ModalProps) => {

    const [balance, setBalance] = useState(undefined); 
    const {did} = useDIDContext();

    useEffect(() => {
        const updateBalance = async () => {
            const bal = await getBalance(did); 
            setBalance(bal); 
        }
        if(did)
            updateBalance(); 
    },[isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <Button ml={'75%'} onClick={onClose} variant='close'>Close</Button>
                <ModalBody justifyContent={'center'}>
                <Divider />
                    <FormControl isRequired>
                        <Stack alignItems={'left'} spacing={2}>
                            <Text alignSelf={'center'}>Account Details</Text>
                            <Flex flexDirection={'row'} alignItems={'center'}>
                                <Icon color={'#261803'} mr={2} as={FaRegUserCircle}></Icon>
                                <Text>{did.substring(0,20)+'...'+did.substring(did.length-5,did.length)}</Text>
                            </Flex>
                            <Flex mb={6} flexDirection={'row'} alignItems={'center'}>
                                <Icon mr={2} as={FcMoneyTransfer}></Icon>
                                <Text>{balance} MATIC</Text>
                            </Flex>
                        </Stack>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default UserModal; 