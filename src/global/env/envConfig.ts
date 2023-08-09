const { OPENAI_SECRET,FILEPATH,NAVER_CLIENT_ID,NAVER_CLIENT_SECRET,GOOGLE_APIKEY } = process.env;


if(!OPENAI_SECRET || !FILEPATH || !NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET||!GOOGLE_APIKEY) throw new Error("env")
const getOpenAISecret = ():string => OPENAI_SECRET
const getFilePath = ():string => FILEPATH

const getNaver =():{Id:string,Secret:string} => {
    return {"Id": NAVER_CLIENT_ID, "Secret": NAVER_CLIENT_SECRET}
}

const getGoogle = () => GOOGLE_APIKEY


export {
    getOpenAISecret,
    getFilePath,
    getNaver,
    getGoogle
}
