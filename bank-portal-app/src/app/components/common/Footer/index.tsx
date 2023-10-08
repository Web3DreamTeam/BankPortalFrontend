'use client'
import {Divider, Flex, Image, Text } from "@chakra-ui/react";

const Footer = () => {

   
    return (
        <Flex w={'100%'} boxShadow={'xl'} height={"10vh"}>
        <Flex w={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex flexDirection={'column'}>
                    <Divider w={'72%'} ml={12} border={'8px solid'} color={'#261803'}/>
                    <Text fontWeight={'light'} ml={12} mb={2} fontSize={32} fontFamily={'Times New Roman'} color={'#261803'}>J.P.MORGAN</Text>
                </Flex>
                <Flex flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                    <Text m={4} color={'#261803'}> Contact</Text>
                    <Text m={4} color={'#261803'}> Privacy</Text>
                    <Text m={4} color={'#261803'}> Terms of Use</Text>
                </Flex>
        </Flex>
    </Flex>
    ); 
}

export default Footer; 