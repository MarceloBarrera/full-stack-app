import { useForm, type FieldValues } from "react-hook-form";
import {
  Button,
  Input,
  Field,
  Text,
  Flex,
  Link,
  Alert,
  Image,
} from "@chakra-ui/react";
import { type Person } from "../../api/apis/api";
import { Link as RouterLink } from "react-router-dom";
import defaultImage from "../../assets/react.svg";

export interface PersonDetailsProps {
  person: Person;
  onSubmit: (data: Person) => void;
  onCancel: () => void;
  isSubmitButtonEnabled?: boolean;
  shouldManageFriends?: boolean;
}
export const PersonDetails = ({
  person,
  onSubmit,
  onCancel,
  isSubmitButtonEnabled = true,
  shouldManageFriends = false,
}: PersonDetailsProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      forename: person.forename,
      surname: person.surname,
      dob: person.dob,
      ssn: person.ssn,
    },
  });

  const handleFormSubmit = (data: FieldValues) => {
    onSubmit({
      ...person,
      forename: data.forename,
      surname: data.surname,
      dob: data.dob,
      ssn: data.ssn,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* TODO: We would need an ability to add or edit this image for now we just use a default one */}
      <Image
        src={defaultImage}
        boxSize="150px"
        fit="fill"
        alt={`${person.forename} ${person.surname}`}
      />
      <Field.Root invalid={!!errors.forename} mb={4}>
        <Field.Label htmlFor="forename">Forename</Field.Label>
        <Input
          id="forename"
          placeholder="forename"
          {...register("forename", {
            required: "This is required",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Only letters allowed",
            },
          })}
        />
        <Field.ErrorText>
          <>{errors.forename && errors.forename.message}</>
        </Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.surname} mb={4}>
        <Field.Label htmlFor="surname">Surname</Field.Label>
        <Input
          id="surname"
          placeholder="surname"
          {...register("surname", {
            required: "This is required",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Only letters allowed",
            },
          })}
        />
        <Field.ErrorText>
          <>{errors.surname && errors.surname.message}</>
        </Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.dob} mb={4}>
        <Field.Label htmlFor="dob">Date of Birth</Field.Label>
        <Input
          id="dob"
          type="date"
          placeholder="dob"
          {...register("dob", {
            required: "This is required",
          })}
        />
        <Field.ErrorText>
          <>{errors.dob && errors.dob.message}</>
        </Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.ssn} mb={4}>
        <Field.Label htmlFor="ssn">Social Security Number</Field.Label>
        <Input
          id="ssn"
          placeholder="ssn"
          {...register("ssn", {
            required: "This is required",
            pattern: {
              value: /^[0-9]+$/i,
              message: "Only numbers allowed",
            },
          })}
        />
        <Field.ErrorText>
          <>{errors.ssn && errors.ssn.message}</>
        </Field.ErrorText>
      </Field.Root>

      {shouldManageFriends && (
        <>
          <Text mb={2}>
            <strong>Total Friends:</strong> {person.friends?.length || 0}
          </Text>

          <Link asChild mb={4} color={"blue.500"}>
            <RouterLink to="friends" color="blue.500">
              Manage Friends
            </RouterLink>
          </Link>
        </>
      )}
      {!shouldManageFriends && (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>
            You will be able to add friends to this person after it is created.
          </Alert.Title>
        </Alert.Root>
      )}

      <Flex
        justifyContent="space-between"
        mt={6}
        width="200px"
        alignItems="center"
      >
        <Button onClick={onCancel} variant="outline">
          Close
        </Button>
        <Button
          loading={isSubmitting}
          type="submit"
          disabled={!isSubmitButtonEnabled || isSubmitting}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};
