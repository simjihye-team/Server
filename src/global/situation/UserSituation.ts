let Id:number = 1;

const getId = ():number => {
    return Id++
}

type Role ='user'|'assistant'|'system'|'function'

type RUST = {
    role:Role
    content: string;
    pronun?:string
};

type userSituationType = {
    [key:number]:RUST[]
}




const UserSituation:userSituationType = {}

export {
    UserSituation,
    getId
}