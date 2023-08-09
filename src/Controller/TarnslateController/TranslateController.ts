import express, {Request, Response} from 'express';
import asyncify from 'express-asyncify';
import axios from "axios";
import {getNaver} from "@global/env/envConfig";


const router = asyncify(express.Router());
router.post("/",async(req:Request, res:Response) => {
    let {japen}:{japen:string} = req.body;
    const {Id,Secret} = getNaver()

    const {data: {message: {result}}} = await axios.post("https://openapi.naver.com/v1/papago/n2mt",`source=ja&target=ko&text=${japen}`,{
        headers: {'X-Naver-Client-Id':Id, 'X-Naver-Client-Secret': Secret}
    })

    res.status(200).json({result})
})


export {
    router as TranslateController
};
