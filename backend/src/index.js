import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});