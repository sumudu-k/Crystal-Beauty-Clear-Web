import express from 'express';
import { getStudents, createStudent, deleteStudent } from '../controllers/studentController.js';

// create student router
const studentRouter = express.Router();

studentRouter.get("/", getStudents);    // get all students

studentRouter.post("/", createStudent);    // create a student  

studentRouter.delete("/", deleteStudent);    // delete a student

export default studentRouter;