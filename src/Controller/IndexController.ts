import express from 'express';
import asyncify from 'express-asyncify';
import {VoiceController} from "@src/Controller/VoiceController/VoiceController";
import {QuestionController} from "@src/Controller/QuestionController/QuestionController";
import {TranslateController} from "@src/Controller/TarnslateController/TranslateController";

const router = asyncify(express.Router());

router.use("/voice",VoiceController)
router.use("/question",QuestionController)
router.use("/trans",TranslateController)


export {
    router as IndexRouter
};
