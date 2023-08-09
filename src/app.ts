import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import type {Request,Response,NextFunction,ErrorRequestHandler} from "express";
import cookieParser from "cookie-parser";
import {HttpError, NotFoundException} from "@global/exception/Exceptions";
import {GlobalResponseDTO} from "@global/response/dto/GlobalResponseDTO";
import {GlobalResponseService} from "@global/response/GlobalResponseService";
import {IndexRouter} from "@src/Controller/IndexController";
import {ChangeVoice2Text} from "@src/Service/clova/ClovaService";
import {speechService} from "@src/Service/speech/speechService";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
            origin: true,
            credentials: true,
    }),
);


app.use('/api',IndexRouter);

app.use((req:Request, res:Response, next:NextFunction) => {
        next(new NotFoundException())
});

app.use(((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const {httpCode, message} = err;
        const response = new GlobalResponseDTO(httpCode ?? 500,message ?? "Internal Server Error",null);
        GlobalResponseService(res,response);
}) as ErrorRequestHandler);

app.listen(8088)