import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoute from './router/auth.router';
import cookieParser from 'cookie-parser';
import projectRoute from './router/project.router';
import nameSpaceRoute from './router/nameSpace.router';
import saveCredentialsRoute from './router/integrationCrediantial.router';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cookieParser())
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

app.use('/api/v1/auth', authRoute);
app.use('/api/v1', nameSpaceRoute);
app.use('/api/v1/credential', saveCredentialsRoute);
app.use('/api/v1/project', projectRoute);
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})
