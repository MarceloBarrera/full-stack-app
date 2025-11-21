import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";

import {
  getPersonById,
  updatePerson,
  type Person,
} from "../../api/apis/api.ts";

import ConfirmDialog from "../../components/Dialog/ConfirmDialog.tsx";
import { PersonDetails } from "../../components/PersonDetails/PersonDetails.tsx";
import { PAGE_PATH } from "../../const.ts";
import { toaster, ToasterComponent } from "../../components/common/toaster.tsx";
import { useQuery } from "@tanstack/react-query";
import { peopleKeys } from "../../api/react-query/queryKeys.ts";

export const EditPersonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [newPerson, setNewPerson] = useState<Person | null>(null);

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const navigate = useNavigate();

  const {
    data: person,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [peopleKeys.detail(id!)],
    queryFn: () => getPersonById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Box p={4}>
        <Text color="red.500">Error fetching a person </Text>
      </Box>
    );
  }

  if (!person?.data) {
    return (
      <Box p={4}>
        <Text>No person found.</Text>
      </Box>
    );
  }

  const updatePersonHandler = async (updatedPerson: Person) => {
    try {
      await updatePerson(updatedPerson.id!, updatedPerson);
      toaster.create({
        title: "Person updated successfully",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Failed to update person, try again later.",
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
        person={person.data}
        onSubmit={(updatedPerson) => {
          setIsOpenConfirmModal(true);
          setNewPerson(updatedPerson);
        }}
        onCancel={() => navigate(PAGE_PATH.People)}
        shouldManageFriends={true}
      />
      {isOpenConfirmModal && (
        <ConfirmDialog
          isOpen={isOpenConfirmModal}
          onConfirm={async () => {
            setIsOpenConfirmModal(false);
            await updatePersonHandler(newPerson!);
          }}
          onClose={() => setIsOpenConfirmModal(false)}
        />
      )}
    </Box>
  );
};
