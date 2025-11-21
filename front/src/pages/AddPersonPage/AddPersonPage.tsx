import { Box, Heading } from "@chakra-ui/react";
import { PersonDetails } from "../../components/PersonDetails/PersonDetails";
import { createPerson, type Person } from "../../api/apis/api";
import { useNavigate } from "react-router-dom";
import { PAGE_PATH } from "../../const";
import { toaster, ToasterComponent } from "../../components/common/toaster";
import { useState } from "react";

const defaultEmptyPerson = {
  forename: "",
  surname: "",
  dob: "",
  ssn: "",
  issuedDateAndTime: new Date().toISOString(),
  friends: [],
  image: "",
  primaryLocation: {
    type: "Point",
    coordinates: [0, 0],
  },
} as Person;

export const AddPersonPage = () => {
  const [isReadOnly, setIsReadOnly] = useState(false);
  const navigate = useNavigate();
  const addPersonHandler = async (person: Person) => {
    try {
      await createPerson(person);
      toaster.create({
        title: "Person added successfully",
        type: "success",
      });
      setIsReadOnly(true);
    } catch (error) {
      toaster.create({
        title: "Failed to add person, try again later.",
        type: "error",
      });
      console.log(error);
    }
  };
  return (
    <Box p={4}>
      <Heading mb={4}>Person details</Heading>
      <ToasterComponent />

      <PersonDetails
        person={defaultEmptyPerson}
        onSubmit={async (newPerson) => {
          await addPersonHandler(newPerson);
        }}
        isSubmitButtonEnabled={!isReadOnly}
        onCancel={() => navigate(PAGE_PATH.People)}
      />
    </Box>
  );
};
