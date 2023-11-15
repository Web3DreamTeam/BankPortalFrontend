'use client'
import {Divider, Flex, Image, Text } from "@chakra-ui/react";

const Footer = () => {

   
    return (
        <Flex w={'100%'} boxShadow={'xl'} height={"10vh"}>
        <Flex w={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex flexDirection={'column'}>
                    <Divider w={'72%'} ml={12} border={'8px solid'} color={'#00001f'}/>
                    <Text fontWeight={'light'} ml={12} mb={2} fontSize={32} fontFamily={'Times New Roman'} color={'#00001f'}>Morgan Stanley</Text>
                </Flex>
                <Flex flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                    <Text m={4} color={'#00001f'}> Contact</Text>
                    <Text m={4} color={'#00001f'}> Privacy</Text>
                    <Text m={4} color={'#00001f'}> Terms of Use</Text>
                </Flex>
        </Flex>
    </Flex>
    ); 
}

export default Footer; 