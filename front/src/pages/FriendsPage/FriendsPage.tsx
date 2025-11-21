import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFriend,
  deleteFriend,
  getPersonById,
  searchPersonByName,
  type Person,
} from "../../api/apis/api";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  List,
  Span,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { peopleKeys } from "../../api/react-query/queryKeys";
import { useState } from "react";
import { toaster, ToasterComponent } from "../../components/common/toaster";

/** TODO:
 * This page only shows friends ids for current friends. (we could create an endpoint to return flesh out friends with Person DTO model.)
 * In the future we could add Confirmation modal before deleting a friend.
 * also we are missing validation to don't add a duplicate friend, or not to add the current person as friend.
 *  */
export const FriendsPage = () => {
  const { id } = useParams();
  const [friendName, setFriendName] = useState("");
  const [friendsListedBySearch, setFriendsListedBySearch] = useState<Person[]>(
    []
  );

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: [peopleKeys.detail(id!)],
    queryFn: () => getPersonById(id!),
    enabled: !!id,
  });

  const deleteFriendMutation = useMutation({
    mutationFn: (friendId: string) => deleteFriend(id!, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [peopleKeys.detail(id!)] });
      toaster.create({
        title: "Friend deleted successfully",
        type: "success",
      });
    },
  });

  const addFriendMutation = useMutation({
    mutationFn: (friendId: string) => addFriend(id!, friendId),
    onSuccess: () => {
      toaster.create({
        title: "Friend added successfully",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: [peopleKeys.detail(id!)] });
    },
  });

  const friends = data?.data.friends || [];

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <Text>Error loading friends</Text>;
  }

  const handleSearch = async (name: string) => {
    const res = await searchPersonByName(name);
    setFriendsListedBySearch(res.data);
  };

  return (
    <Box p={4}>
      <Heading>Friends list</Heading>
      <ToasterComponent />

      <Flex direction="column" gap={4}>
        <Box>
          <Input
            placeholder="Search friend to add..."
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            maxWidth="300px"
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                handleSearch(friendName);
              }
            }}
          />

          <Button
            ml={2}
            size="sm"
            variant={"outline"}
            onClick={() => {
              handleSearch(friendName);
            }}
          >
            Search
          </Button>
          <Button
            ml={2}
            size="sm"
            variant={"outline"}
            onClick={() => {
              setFriendName("");
              setFriendsListedBySearch([]);
            }}
          >
            Clear
          </Button>
        </Box>

        <Heading size="md">Results</Heading>
        {friendsListedBySearch.length === 0 && <Text>No Results.</Text>}
        <List.Root>
          {friendsListedBySearch.map(
            ({ id: friendId, forename, surname, ssn }) => (
              <List.Item key={friendId}>
                <Span>Id: </Span>
                <Span>{`${friendId} `}</Span>
                <Span>Name: {`${forename} ${surname}`} </Span>
                <Span>SSN: {ssn}</Span>

                <Button
                  variant="subtle"
                  size="sm"
                  marginLeft="2"
                  onClick={async () => {
                    addFriendMutation.mutate(friendId!);
                    setFriendName("");
                    setFriendsListedBySearch([]);
                  }}
                >
                  Add Friend
                </Button>
              </List.Item>
            )
          )}
        </List.Root>

        <Heading size="md">Current list of friends</Heading>
        <List.Root>
          {friends.map((friendId) => (
            <List.Item key={friendId}>
              {friendId}
              <Button
                variant="subtle"
                color={"red.500"}
                ml={4}
                size="sm"
                onClick={() => deleteFriendMutation.mutate(friendId)}
              >
                Delete Friend
              </Button>
            </List.Item>
          ))}
        </List.Root>
        <Link asChild color={"blue.500"} width="150px">
          <RouterLink to={`/people/${id}`} color="blue.500">
            Go back to Person
          </RouterLink>
        </Link>
      </Flex>
    </Box>
  );
};
