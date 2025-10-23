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
