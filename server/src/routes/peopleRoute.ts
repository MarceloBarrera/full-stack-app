import { Router } from "express";
import {
  getAllPeople,
  createPerson,
  getPersonById,
  updatePersonById,
  deletePersonById,
  addFriendToPerson,
  removeFriendFromPerson,
  searchPeopleByName,
} from "../controllers/peopleController";

const router = Router();

router.get("/", getAllPeople);
router.post("/", createPerson);
router.get("/:id", getPersonById);
router.put("/:id", updatePersonById);
router.delete("/:id", deletePersonById);
router.post("/:id/friends", addFriendToPerson);
router.delete("/:id/friends/:friendId", removeFriendFromPerson);
router.get("/search/:name", searchPeopleByName);

export default router;
