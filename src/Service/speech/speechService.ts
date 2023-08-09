import {BadRequestException} from "@global/exception/Exceptions";
import {getFilePath} from "@global/env/envConfig";
import axios from "axios";
import * as util from "util";
import * as fs from "fs";
import * as path from "path";


const speechService = async (jpn: string) => {
    const {data:{audioContent}} = await axios.post("https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCph7QCAD1DG4lB83AXLgvWc5tz3VpwrV4",
        {
            voice: {
                languageCode: "ja-JP",
                ssmlGender: "FEMALE",
                name: "ja-JP-Standard-A"
            },
            input: {
                text: jpn
            },
            audioConfig: {
                audioEncoding: "mp3"
            }
        })

    const writeFile = util.promisify(fs.writeFile);
    const filename =new Date().valueOf()+'.mp3'

    fs.writeFileSync(path.resolve(getFilePath(),'speechaudio',filename), audioContent,'base64');

    // await writeFile(path.resolve(getFilePath(),'speechaudio',filename), audioContent, 'binary');

    return filename;
}

export {
    speechService
}