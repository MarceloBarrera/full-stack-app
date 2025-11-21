import { Router } from "express";
import {
  getAllPeople,
  createPerson,
  getPersonById,
  updatePersonById,
  deletePersonById,
} from "../controllers/peopleController";

const router = Router();

router.get("/", getAllPeople);
router.post("/", createPerson);
router.get("/:id", getPersonById);
router.put("/:id", updatePersonById);
router.delete("/:id", deletePersonById);

export default router;
