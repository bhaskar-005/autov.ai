import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';


dotenv.config();
const app = express();
const port = process.env.PORT;


app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
}));


app.get('/status', (req:Request, res:Response):any => {
    return res.status(200).json({
        message: "server is running.."
    })
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})
