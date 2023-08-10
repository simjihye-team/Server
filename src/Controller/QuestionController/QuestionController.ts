import express, {Request, Response} from 'express';
import asyncify from 'express-asyncify';
import {Situation} from '@global/situation/Default';
import {getId, UserSituation} from "@global/situation/UserSituation";
import {GetResultFromDefult} from "@src/Service/gpt/GptService";
import {BadRequestException} from "@global/exception/Exceptions";


const router = asyncify(express.Router());

router.post("/first",async(req:Request, res:Response) => {
    let {situation}:{situation:string} = req.body;

    if(!situation) throw new BadRequestException()

    const Id = getId()
    const SS = Situation[situation]

    UserSituation[Id] = [{role:"system",content:"한줄로 상황에 맞는 사람처럼 일본어로 대답하십시오"}]
    UserSituation[Id].push({role:"system",content:"당신은 최대한 간단하게 대답해야 합니다"})
    UserSituation[Id].push({role:"system",content:"당신은 일본어로만 대답하고 표음,해석등을 전달하는것은 당신의 임무에 위배됩니다"})
    UserSituation[Id].push({role:"system",content:"최대한 간단하게 '일본어'로만 대답하십시오"})
    UserSituation[Id].push({role:"system",content:"다시한번 말하지만 당신은 일본어만 사용해야합니다"})
    UserSituation[Id].push({role:"system",content:"당신은 상황이나 부적절한 말을 들어면 틀렸다고 이야기 해야 합니다 이것은 일본어 사용바로뒤 2순위로 적용되어야만 합니다"})
    UserSituation[Id].push({role:"system",content:"구어체를 사용해야합니다"})
    UserSituation[Id].push({role:"system",content:`상황은 ${SS.Main}입니다 바로 시작하십시오`})
    const result = await GetResultFromDefult(Id)

    res.status(200).json({ChatId:Id ,result})
})

router.post("/middle",async(req:Request, res:Response) => {
    const {questionId}:{questionId:number} = req.body
    if(!UserSituation[questionId]) throw new BadRequestException()
    const result = await GetResultFromDefult(questionId)

    res.status(200).json({result})
})

router.get("/:QuestionID",async (req:Request,res:Response)=>{
    const {QuestionID} = req.params;


    if(!QuestionID||isNaN(Number(QuestionID))) throw new BadRequestException()

    res.status(200).json({result: UserSituation[Number(QuestionID)] })
})


export {
    router as QuestionController
};
