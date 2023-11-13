'use client'
import { useState } from 'react';
import { Button, Container, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react'
import KYCForm from './components/KYC/Form';
import KYBForm from './components/KYB/Form';
import Footer from './components/common/Footer';
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
        <Text fontSize={36}>Welcome</Text>
        <Image alignSelf={'center'} width={'60vw'} src="/toronto.jpg" alt="toronto"/>
        <Text fontSize={24}> At Morgan Stanley we leverage Verifiable Credentials to help you open an account in a matter of minutes.</Text>
      </Stack>
    </Flex>
    <Flex w={"100%"} alignItems={'center'} flexDirection={'column'}>
    <Text  fontSize={22}>Are you a business or an individual?</Text>
      <Flex flexDirection={'row'} justifyContent={'space-around'}>
        <Button m={5} color={'#261803'} variant={'outline'} onClick={handleKYBForm}>Start Business Application Now</Button>
        <Button m={5} color={'#261803'} variant={'outline'} onClick={handleKYCForm}>Start Individual Application Now</Button>
      </Flex>
      <Image alignSelf={'center'} height={512} src="/credit_cards.jpg"  alt="credit cads" ></Image>
    </Flex>
    </Stack>
    <Footer/>
    </>
  )
}
