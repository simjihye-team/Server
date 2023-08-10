import express, {Request, Response} from 'express';
import asyncify from 'express-asyncify';
import multer from "multer"
import {getFilePath} from "@global/env/envConfig";
import {BadRequestException} from "@global/exception/Exceptions";
import * as path from "path";
import * as console from "console";
import {UserSituation} from "@global/situation/UserSituation";
import {ChangeVoice2Text} from "@src/Service/clova/ClovaService";
import {GetResultFromDefult} from "@src/Service/gpt/GptService";
import {speechService} from "@src/Service/speech/speechService";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getFilePath())
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        console.log(file)
        // 이름설정 (basename:확장자제외 파일명) + 현재시간 + 확장자
        cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    }
})

const upload = multer({
    preservePath:true,
    storage
})

const router = asyncify(express.Router());

router.post("/text",upload.single('audio'),async(req:Request, res:Response) => {
    if (!req.file) {
        throw new BadRequestException()
    }
    const {data} = req.body;

    const {chatId}: { chatId: number } = JSON.parse(data)
    console.log(chatId)
    if (!chatId) throw new BadRequestException()
    if (!UserSituation[chatId]) throw new BadRequestException()

    const {filename} = req.file
    const {text} = await ChangeVoice2Text(filename)

    const soundName = await speechService(text)
    UserSituation[chatId].push({role: "user", content: text, pronun: soundName})


    return res.status(200).json({result: {role: "user", content: text, pronun: soundName}})

})

router.get("/:filename",(req:Request,res:Response)=>{
    const {filename} = req.params;

    res.status(200).contentType("audio/mp3")
        .sendFile(path.resolve(getFilePath(),'speechaudio',filename))
})



export {
    router as VoiceController
};
