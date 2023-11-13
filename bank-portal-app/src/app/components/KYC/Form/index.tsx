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
import { CiSaveDown2 } from "react-icons/ci";
import {
  EmploymentCredential,
  KYCCredentials,
  PassportCredential,
  ReusableKYCCredential,
  UtilityBillCredential,
} from "@/app/utils/constants";
import { issueReusableKYC, saveCredential } from "@/app/utils/agentService";
import { useDIDContext } from "@/app/context";
import { BiSolidCheckCircle } from "react-icons/bi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // credentials state
  const [kycData, setKycData] = useState<KYC>({
    identityVC: undefined,
    addressVC: undefined,
    employmentVC: undefined,
  });
  const [KYCVC, setKYCVC] = useState<ReusableKYCCredential | undefined>(
    undefined
  );

  const { did } = useDIDContext();

  const handleAutofill = (cType: string) => {
    setIsVerificationModalOpen(true);
  };

  const setKYCFormData = (data: any) => {
    console.log(data);
    if (data.length > 1) {
      setKycData({
        identityVC: data[0].credentialSubject,
        addressVC: data[1].credentialSubject,
        employmentVC: data[2].credentialSubject,
      });
    } else {
      if (data[0].type.find((el: string) => el === PassportCredential)) {
        setKycData({
          identityVC: data[0].credentialSubject,
          addressVC: kycData.addressVC,
          employmentVC: kycData.employmentVC,
        });
      }
      if (data[0].type.find((el: string) => el === UtilityBillCredential)) {
        setKycData({
          identityVC: kycData.identityVC,
          addressVC: data[0].credentialSubject,
          employmentVC: kycData.employmentVC,
        });
      }
      if (data[0].type.find((el: string) => el === EmploymentCredential)) {
        setKycData({
          identityVC: kycData.identityVC,
          addressVC: kycData.addressVC,
          employmentVC: data[0].credentialSubject,
        });
      }
      if (data[0].type.find((el: string) => el === ReusableKYCCredential)) {
        const identityVC = {
          firstName: data[0].credentialSubject.firstName,
          lastName: data[0].credentialSubject.lastName,
          dateOfBirth: data[0].credentialSubject.dateOfBirth,
        };
        const addressVC = {
          country: data[0].credentialSubject.country,
          state: data[0].credentialSubject.state,
          city: data[0].credentialSubject.city,
          address: data[0].credentialSubject.address,
          zipCode: data[0].credentialSubject.zipCode,
        };
        const employmentVC = {
          employerName: data[0].credentialSubject.employerName,
          jobTitle: data[0].credentialSubject.jobTitle,
          salary: data[0].credentialSubject.salary,
        };
        setKycData({
          identityVC: identityVC,
          addressVC: addressVC,
          employmentVC: employmentVC,
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

  const handleSubmitKYC = async () => {
    setIsLoading(true);

    // build reusable credential to be issued
    const reusableKYC: ReusableKYCCredential = {
      firstName: kycData.identityVC.firstName,
      lastName: kycData.identityVC.lastName,
      dateOfBirth: kycData.identityVC.dateOfBirth,
      country: kycData.addressVC.country,
      state: kycData.addressVC.state,
      city: kycData.addressVC.city,
      address: kycData.addressVC.address,
      zipCode: kycData.addressVC.zipCode,
      employerName: kycData.employmentVC.employerName,
      jobTitle: kycData.employmentVC.jobTitle,
      salary: kycData.employmentVC.salary,
    };

    // issued the credential
    const vc = await issueReusableKYC(did, reusableKYC);

    setKYCVC(vc);

    setIsSubmitted(true);
  };

  const handleSaveVC = async () => {
    const response = await saveCredential(KYCVC, did);
    if (response.status === 200) {
      setIsSaved(true);
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
        formType="KYC"
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
                    isLoading={isLoading}
                    onClick={handleSubmitKYC}
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
              <Stack spacing={2}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                  <Text mt={10} fontWeight={"bold"} textAlign={"center"} mb={5}>
                    Save your Reusable KYC Credential for even more streamlined
                    KYC Processes with our Partners
                  </Text>
                  {!isSaved ? (
                    <Icon
                      boxSize={100}
                      color={"green.400"}
                      as={BiSolidCheckCircle}
                    ></Icon>
                  ) : (
                    <Icon as={CiSaveDown2} boxSize={100} color={"green"}></Icon>
                  )}
                </Flex>
                <Button
                  m={4}
                  isDisabled={isSaved}
                  onClick={handleSaveVC}
                  mb={4}
                  colorScheme="green"
                  variant={isSaved ? "outline" : "solid"}
                >
                  {isSaved ? "Credential Saved" : "Save Credential"}
                </Button>
              </Stack>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KYCForm;
