'use client'
import React from "react";
import {Flex, Image } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {

    return (
        <Flex w={'100%'} boxShadow={'xl'} height={"10vh"}>
            <Flex w={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex  alignItems={'center'}>
                    <Link href="/"><Image ml={5} height={"8vh"} src="/logo.jpg" alt="Logo"></Image></Link>
                </Flex>
            </Flex>
        </Flex>
    ); 
}

export default Navbar; 