import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import todoRoute from './routes/todo.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = 8080 || process.env.PORT;

//Connect to DB;
connectDB();

app.use(bodyparser.json());
app.use("/api/todos", todoRoute);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})