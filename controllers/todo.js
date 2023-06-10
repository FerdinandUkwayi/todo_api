import Todo from '../models/Todo.js';
import Joi from "joi";

//Create Todo
export const createTodo = async (req, res) => {
  //Input Validation
  const todoSchema = Joi.object({
    title: Joi.string().min(6).max(60).required(),
    description: Joi.string().min(10).max(1000).required(),
    completed: Joi.boolean(),
  });

  const { error } = todoSchema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get All Todos
export const getAllTodos = async (req, res) => {
  const id = req.query.todo;
  try {
    let todos;
    if (id) {
          todos = await Todo.find({ id });
    } else {
      todos = await Todo.find();
    }
    res.status(200).json(todos);
  } catch (error) {
    console.log(error)
  }
}

//Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo.id === req.body.id) {
      try {
        await todo.delete();
        res.status(200).json("Todo deleted successfully!");
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Todo
export const updateTodo = async (req, res) => {

  //Validate user input
  const todoSchema = Joi.object({
    title: Joi.string().min(6).max(60),
    description: Joi.string().min(10).max(1000),
    completed: Joi.boolean(),
  });

  const { error } = todoSchema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Todo not found...");

  const { title, description, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title, 
        description,
        completed
      },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Get Todo
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
};


