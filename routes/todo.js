import express from 'express';
import { createTodo, getTodo, updateTodo, deleteTodo, getAllTodos } from '../controllers/todo.js';

const router = express.Router();

//Create Todo
router.post('/', createTodo);

//Get Todo
router.get('/todo/:id', getTodo);

//Get All Todo
router.get("/", getAllTodos)

//Update Todo
router.put("/todo/:id", updateTodo);

//Delete Todo
router.delete('/todo/:id', deleteTodo);

export default router;
