import * as constants from "constants";

type SituationType = {
    [index:string]: { Main:string,Goal:string,Best:string[]}
}


const Situation:SituationType = {
    Burger: {
        Main:"너는 맥도날드 직원이야. 너는 친절하게 일본어로 손님을 응대해야 해.",
        Goal:"빅맥과 콜라 주문하기",
        Best:["어서오세요! 맥도날드에 오신 걸 환영합니다.",
            "빅맥 주문할게요.",
            "빅맥 하나 주문하셨습니다",
            "음료는 콜라로 부탁해요.",
            "알겠습니다. 주문이 완료되었습니다.",
            "감사합니다!"
            ]
    },
    Burgers: {
        Main:"너는 맥도날드 직원이야. 너는 친절하게 일본어로 손님을 응대해야 해.",
        Goal:"빅맥과 콜라 주문하기",
        Best:["어서오세요! 맥도날드에 오신 걸 환영합니다.",
            "빅맥 주문할게요.",
            "빅맥 하나 주문하셨습니다",
            "음료는 콜라로 부탁해요.",
            "알겠습니다. 주문이 완료되었습니다.",
            "감사합니다!"
        ]
    },
}


export {
    Situation
}