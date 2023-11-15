'use client'
import React, { useEffect, useState } from "react";
import {Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import UserModal from "./UserModal";
import LoginModal from "./LoginModal";
import { BiLogIn, BiUserCircle } from "react-icons/bi";
import { useDIDContext } from "@/app/context";

const Navbar = () => {

    const {did} = useDIDContext(); 
    const [isUserModalOpen, setIsUserModalopen] = useState(false); 
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 

    useEffect(() => {
    },[did])

    return (
        <Flex w={'100%'} boxShadow={'xl'} height={"10vh"}>
        <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalopen(false)}/>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}/>
        <Flex w={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Flex flexDirection={'column'}>
                    <Divider w={'72%'} ml={12} border={'8px solid'} color={'#00001f'}/>
                    <Text fontWeight={'light'} ml={12} mb={2} fontSize={24} fontFamily={'Times New Roman'} color={'#00001f'}>Morgan Stanley</Text>
                </Flex>
                {
                    !did ? 
                    <Button leftIcon={<BiLogIn/>} onClick={() => setIsLoginModalOpen(true)}  ml={'80vw'} color={'##00001f'}>Login</Button> 
                : 
                    <Button leftIcon={<BiUserCircle/>} onClick={() => setIsUserModalopen(true)} ml={'80vw'} color={'#00001f'}>Profile</Button>
                }
            </Flex>
        </Flex>
    </Flex>
    ); 
}

export default Navbar; 