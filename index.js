import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './db.js';
import jobsRouter from "./routes/jobRoute.js"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/jobs', jobsRouter);

app.get("/", (req, res) => {
  res.send("webscrapping is listening on port....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Lead Scraper Server running on port ${PORT}`);
});