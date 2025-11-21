import { Request, Response } from "express";
import { people } from "../../data/people.json";

export const getAllPeople = (_req: Request, res: Response) => {
  return res.json(people);
};

export const createPerson = (req: Request, res: Response) => {
  const newPerson = req.body as any;
  // for simplicity we'll use the length + 1 as id (string)
  newPerson.id = (people.length + 1).toString();
  people.push(newPerson);
  return res.json(newPerson);
};

export const getPersonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  return res.json(person);
};

// update a person by id
export const updatePersonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedPerson = req.body;
  const index = people.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Person not found" });
  }
  people[index] = { ...people[index], ...updatedPerson };
  return res.json(people[index]);
};

// delete a person by id
export const deletePersonById = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = people.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Person not found" });
  }
  const deletedPerson = people.splice(index, 1);
  return res.json(deletedPerson[0]);
};

// add a person to a person's friends list
export const addFriendToPerson = (req: Request, res: Response) => {
  const { id } = req.params;
  const { friendId } = req.body;
  const person = people.find((p) => p.id === id);
  const friend = people.find((p) => p.id === friendId);
  if (!person || !friend) {
    return res.status(404).json({ message: "Person or friend not found" });
  }
  if (!person.friends) {
    person.friends = [];
  }
  person.friends.push(friendId);
  return res.json(person);
};

// remove a person from a person's friends list
export const removeFriendFromPerson = (req: Request, res: Response) => {
  const { id, friendId } = req.params;
  const person = people.find((p) => p.id === id);
  if (!person || !person.friends) {
    return res
      .status(404)
      .json({ message: "Person or friends list not found" });
  }
  const friend = people.find((p) => p.id === friendId);
  if (!friend) {
    return res.status(404).json({ message: "Friend not found" });
  }
  person.friends = person.friends.filter((fId) => fId !== friendId);
  return res.json(person);
};

// search a person by name and look in the forename and surname fields
export const searchPeopleByName = (req: Request, res: Response) => {
  const { name } = req.params;
  const results = people.filter(
    (p) =>
      p.forename.toLowerCase().includes(name.toLowerCase()) ||
      p.surname.toLowerCase().includes(name.toLowerCase())
  );
  return res.json(results);
};
