import express from "express";
import userRouter from './routers/userRouter.js'
import connectDb  from "./config/db.js";
import cors from 'cors';
import dotenv from 'dotenv';
import messageRouter from "./routers/messageRouter.js";
import eventsRouter from "./routers/eventsRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/message',messageRouter)
app.use('/api/events',eventsRouter)

connectDb();

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});