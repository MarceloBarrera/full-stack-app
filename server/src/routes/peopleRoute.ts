import { Router } from "express";
import {
  getAllPeople,
  createPerson,
  getPersonById,
} from "../controllers/peopleController";

const router = Router();

router.get("/", getAllPeople);
router.post("/", createPerson);
router.get("/:id", getPersonById);

export default router;
