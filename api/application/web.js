import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { publicRouter } from '../routes/public-api.js';
import { userRouter } from '../routes/api.js';

export const web = express();

// middleware
web.use(cors());
web.use(bodyParser.json());
web.use(bodyParser.urlencoded({ extended: true }));

// router
web.use(publicRouter)
web.use(userRouter)

dotenv.config();