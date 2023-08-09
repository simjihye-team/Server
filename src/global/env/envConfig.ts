const { OPENAI_SECRET,FILEPATH,NAVER_CLIENT_ID,NAVER_CLIENT_SECRET } = process.env;


if(!OPENAI_SECRET || !FILEPATH || !NAVER_CLIENT_ID || !NAVER_CLIENT_SECRET) throw new Error("env")
const getOpenAISecret = ():string => OPENAI_SECRET
const getFilePath = ():string => FILEPATH

const getNaver =():{Id:string,Secret:string} => {
    return {"Id": NAVER_CLIENT_ID, "Secret": NAVER_CLIENT_SECRET}
}


export {
    getOpenAISecret,
    getFilePath,
    getNaver
}
