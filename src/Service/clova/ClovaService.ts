import axios from "axios";
import * as fs from "fs";
import {getFilePath} from "@global/env/envConfig";
import * as Path from "path";
const ChangeVoice2Text = async (filename:string) => {
    const { data } = await axios.post("https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Jpn",
        fs.createReadStream(Path.join(getFilePath(),filename)),
        {
            headers:{
                "X-NCP-APIGW-API-KEY-ID":"16j94nh715",
                "X-NCP-APIGW-API-KEY":"2XUptShqV4yyhTWbyur3d2nfXmqWdXeS42Lmnj8z",
                "Content-Type":"application/octet-stream"
            },
        })

    console.log(data)

    return data;
}

export {
    ChangeVoice2Text
}