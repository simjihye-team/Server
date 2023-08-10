import { Configuration, OpenAIApi} from "openai"
import {getOpenAISecret} from "@global/env/envConfig";
import {UserSituation} from "@global/situation/UserSituation";
import {BadRequestException, TooManyRequestException} from "@global/exception/Exceptions";
import {AxiosError} from "axios";
import {speechService} from "@src/Service/speech/speechService";

const configuration = new Configuration({
    apiKey: getOpenAISecret(),
});

const openai = new OpenAIApi(configuration);

const GetResultFromDefult = async(Id:number) => {

    try{
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", messages: UserSituation[Id].map(d => { return{role:d.role,content:d.content}}),
        })

        const result = response.data.choices[0]

        if(!result.message) throw new BadRequestException()

        const {role,content} = result.message

        if(!role || !content) throw new BadRequestException()

        const pronun = await speechService(content)

        UserSituation[Id].push({role,content,pronun})

        content.replace( /\(.*\)/ig,"")
        return {role,content:content.replace( /\(.*\)/ig,""),pronun}
    }catch (e:AxiosError | any) {
        console.log(e)
        if(e?.response?.status == 429){
            throw new TooManyRequestException()
        }
        throw e;
    }
}

export {
    GetResultFromDefult
}