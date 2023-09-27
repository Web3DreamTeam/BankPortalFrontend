'use client'
import { useState } from 'react';
import { Button, Container, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import KYCForm from './components/KYC/Form';
import KYBForm from './components/KYB/Form';
export default function Home() {

  const [isKYCOpen, setIsKYCOpen] = useState(false); 
  const [isKYBOpen, setIsKYBOpen] = useState(false); 

  const handleKYCForm = () => {
    setIsKYCOpen(true);
  }

  const handleKYBForm = () => {
    setIsKYBOpen(true)
  }

  return (
    <>
    <KYCForm isOpen={isKYCOpen} onClose={() => setIsKYCOpen(false)}></KYCForm>
    <KYBForm isOpen={isKYBOpen} onClose={() => setIsKYBOpen(false)}></KYBForm>
    <Stack spacing={24}>
    <Flex mt={5} w={"100vw"} flexDirection={'column'}>
      <Stack spacing={8} textAlign={'center'}>
        <Text fontSize={36}>Welcome to Building Blocks Bank.</Text>
        <Text fontSize={24}> At Building Blocks Bank we leverage Verifiable Credentials to help you open an account in a matter of minutes.</Text>
      </Stack>
    </Flex>
    <Flex w={"100%"} alignItems={'center'} flexDirection={'column'}>
    <Text  fontSize={22}>Are you a business or an individual?</Text>
      <Flex flexDirection={'row'} justifyContent={'space-around'}>
        <Button m={5} colorScheme='messenger' variant={'outline'} onClick={handleKYBForm}>Start Business Application Now</Button>
        <Button m={5} colorScheme='messenger' variant={'outline'} onClick={handleKYCForm}>Start Individual Application Now</Button>
      </Flex>
    </Flex>
    </Stack>
    </>
  )
}
