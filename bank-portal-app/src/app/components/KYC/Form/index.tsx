import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import VerificationModal from "../../common/VerificationModal";
import { parseDateOfBirth, parseDollarAmount } from "@/app/utils/helpers";
import { LuPartyPopper } from "react-icons/lu";
import {
  EmploymentCredential,
  KYCCredentials,
  PassportCredential,
  UtilityBillCredential,
} from "@/app/utils/constants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KYC {
  identityVC: any | undefined;
  addressVC: any | undefined;
  employmentVC: any | undefined;
}

const KYCForm = ({ isOpen, onClose }: ModalProps) => {
  // ui elements state
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // credentials state
  const [credentialType, setCredentialType] = useState("");
  const [kycData, setKycData] = useState<KYC>({
    identityVC: undefined,
    addressVC: undefined,
    employmentVC: undefined,
  });

  const handleAutofill = (cType: string) => {
    setCredentialType(cType);
    setIsVerificationModalOpen(true);
  };

  const setKYCFormData = (data: any) => {
    if (data.length > 1) {
      setKycData({
        identityVC: data[0].credentialSubject,
        addressVC: data[1].credentialSubject,
        employmentVC: data[2].credentialSubject,
      });
    } else {
      if (credentialType === PassportCredential) {
        setKycData({
          identityVC: data[0].credentialSubject,
          addressVC: kycData.addressVC,
          employmentVC: kycData.employmentVC,
        });
      }
      if (credentialType === UtilityBillCredential) {
        setKycData({
          identityVC: kycData.identityVC,
          addressVC: data[0].credentialSubject,
          employmentVC: kycData.employmentVC,
        });
      }
      if (credentialType === EmploymentCredential) {
        setKycData({
          identityVC: kycData.identityVC,
          addressVC: kycData.addressVC,
          employmentVC: data[0].credentialSubject,
        });
      }
    }
  };

  const updateProgressBar = () => {
    const base = 33;
    let multiplier = 0;
    if (kycData.identityVC) multiplier += 1;
    if (kycData.addressVC) multiplier += 1;
    if (kycData.employmentVC) multiplier += 1;
    setProgress(base * multiplier);
  };

  const getCredentialType = () => {
    if (credentialType === "KYC")
      // pass an array containing all the credentials required for the KYC verification
      return KYCCredentials;
    else {
      // return the specific credential
      return [credentialType];
    }
  };

  useEffect(() => {
    updateProgressBar();
    console.log(kycData);
  }, [kycData, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        setFormData={setKYCFormData}
        getCredentialType={getCredentialType}
      />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex w="100%" justify="space-between">
            <Text fontWeight="bold">Application Summary</Text>
            <Button onClick={onClose} variant="close">
              Close
            </Button>
          </Flex>
          <Divider border="2px solid #FOBD3F"></Divider>
          <Progress value={progress} size="xs" colorScheme="green" />
          {!isSubmitted && (
            <Flex alignItems={"center"}>
              <Button
                width={"100%"}
                variant={kycData.identityVC ? "outline" : "solid"}
                isDisabled={
                  !!kycData.identityVC &&
                  !!kycData.addressVC &&
                  !!kycData.employmentVC
                }
                onClick={() => handleAutofill("KYC")}
                m={4}
                backgroundColor={"whitesmoke"}
                color={"#261803"}
              >
                Autofill KYC Form
              </Button>
            </Flex>
          )}
        </ModalHeader>
        <ModalBody justifyContent={"center"}>
          {!isSubmitted ? (
            <div>
              <Divider border="2px solid #FOBD3F"></Divider>
              <FormControl isRequired>
                <Stack spacing={2}>
                  <Text textAlign={"center"}>Identity Information</Text>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    variant={kycData.identityVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.identityVC ? kycData.identityVC.firstName : ""
                    }
                    type="text"
                    placeholder="Bob"
                  />
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    variant={kycData.identityVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.identityVC ? kycData.identityVC.lastName : ""
                    }
                    type="text"
                    placeholder="Fischer"
                  />
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    variant={kycData.identityVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.identityVC
                        ? parseDateOfBirth(kycData.identityVC.dateOfBirth)
                        : ""
                    }
                    type="text"
                  />
                  <Button
                    variant={kycData.identityVC ? "outline" : "solid"}
                    isDisabled={!!kycData.identityVC}
                    onClick={() => handleAutofill(PassportCredential)}
                    mb={4}
                    backgroundColor={"whitesmoke"}
                    color={"#261803"}
                  >
                    {kycData.identityVC
                      ? "Identity Verified"
                      : "Autofill with Identity VC"}
                  </Button>
                </Stack>
              </FormControl>
              <Divider border="2px solid #FOBD3F"></Divider>
              <FormControl isRequired>
                <Stack spacing={2}>
                  <Divider border="2px solid #FOBD3F"></Divider>
                  <Text textAlign={"center"}>Address Information</Text>
                  <FormLabel>Country</FormLabel>
                  <Input
                    variant={kycData.addressVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.addressVC ? kycData.addressVC.country : ""
                    }
                    type="text"
                    placeholder="United States"
                  />
                  <FormLabel>State</FormLabel>
                  <Input
                    variant={kycData.addressVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.addressVC ? kycData.addressVC.state : ""
                    }
                    type="text"
                    placeholder="New York"
                  />
                  <FormLabel>City</FormLabel>
                  <Input
                    variant={kycData.addressVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.addressVC ? kycData.addressVC.city : ""
                    }
                    type="text"
                    placeholder="New York"
                  />
                  <FormLabel>Address Line</FormLabel>
                  <Input
                    variant={kycData.addressVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.addressVC ? kycData.addressVC.address : ""
                    }
                    type="text"
                    placeholder="7th Avenue"
                  />
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    variant={kycData.addressVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.addressVC ? kycData.addressVC.zipCode : ""
                    }
                    type="text"
                    placeholder="M5H 2X4"
                  />
                  <Button
                    variant={kycData.addressVC ? "outline" : "solid"}
                    isDisabled={!!kycData.addressVC}
                    onClick={() => handleAutofill(UtilityBillCredential)}
                    mb={4}
                    backgroundColor={"whitesmoke"}
                    color={"#261803"}
                  >
                    Autofill with Address VCs
                  </Button>
                </Stack>
              </FormControl>
              <FormControl isRequired>
                <Stack spacing={2}>
                  <Divider border="2px solid #FOBD3F"></Divider>
                  <Text textAlign={"center"}>Employment Information</Text>
                  <FormLabel>Employer Name</FormLabel>
                  <Input
                    variant={kycData.employmentVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.employmentVC
                        ? kycData.employmentVC.employerName
                        : ""
                    }
                    type="text"
                    placeholder="Abbott Inc."
                  />
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    variant={kycData.employmentVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.employmentVC ? kycData.employmentVC.jobTitle : ""
                    }
                    type="text"
                    placeholder="Data Analyst"
                  />
                  <FormLabel>Salary</FormLabel>
                  <Input
                    variant={kycData.employmentVC ? "filled" : "outline"}
                    defaultValue={
                      kycData.employmentVC
                        ? parseDollarAmount(kycData.employmentVC.salary)
                        : ""
                    }
                    type="text"
                    placeholder="$"
                  />
                  <Button
                    variant={kycData.employmentVC ? "outline" : "solid"}
                    isDisabled={!!kycData.employmentVC}
                    onClick={() => handleAutofill(EmploymentCredential)}
                    backgroundColor={"whitesmoke"}
                    color={"#261803"}
                  >
                    Autofill with Employment VCs
                  </Button>
                </Stack>
              </FormControl>
              <FormControl mt={5} isRequired>
                <Stack spacing={2}>
                  <Button
                    isDisabled={progress < 99}
                    onClick={() => setIsSubmitted(true)}
                    mb={4}
                    color={"#261803"}
                    backgroundColor={"white"}
                    variant={"outline"}
                  >
                    Submit Application
                  </Button>
                </Stack>
              </FormControl>
            </div>
          ) : (
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Text
                mb={4}
                textAlign={"center"}
                fontSize={24}
                fontWeight={"bold"}
              >
                Congratulations Your Application has been approved!
              </Text>
              <Text textAlign={"center"} fontSize={16}>
                You will receive your credit card by mail in the next 7 business
                days
              </Text>
              <Icon
                m={10}
                boxSize={150}
                color={"blueviolet"}
                as={LuPartyPopper}
              ></Icon>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KYCForm;
