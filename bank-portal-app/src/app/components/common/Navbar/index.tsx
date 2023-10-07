'use client'
import React, { useState } from "react";
import {Button, Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import LoginModal from "./LoginModal";

const Navbar = () => {

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    }

    return (
        <Flex w={'100%'} boxShadow={'xl'} height={"10vh"}>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}/>
            <Flex w={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex alignItems={'center'}>
                    <Link href="/"><Image ml={5} height={"8vh"} src="/logo.jpg" alt="Logo"></Image></Link>
                    <Button ml={'90vw'} onClick={handleLogin} variant={'outline'} colorScheme={'messenger'}>Login</Button>
                </Flex>
            </Flex>
        </Flex>
    ); 
}

export default Navbar; 