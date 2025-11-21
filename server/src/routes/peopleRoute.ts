import { Router } from "express";
import {
  getAllPeople,
  createPerson,
  getPersonById,
  updatePersonById,
} from "../controllers/peopleController";

const router = Router();

router.get("/", getAllPeople);
router.post("/", createPerson);
router.get("/:id", getPersonById);
router.put("/:id", updatePersonById);

export default router;
