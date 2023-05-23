export  class ApplicationError extends Error {
    code : number;
    message : string;

    constructor(name : string , code : number , message : string){
        super(name);
        this.code = code;
        this.message = message;
    }
}

export const USER_NOT_FOUND_ERR_NAME= "UserNotFound";
export const USER_NOT_FOUND_ERR_CODE = 404;
export const USER_NOT_FOUND_ERR_MESSAGE = "User not found";


//Invalid Input name , code , message
export const INVALID_INPUT_ERR_NAME = "InvalidInput";
export const INVALID_INPUT_ERR_CODE = 403;
export const INVALID_INPUT_ERR_MESSAGE = "Invalid Input";

//User Already Exist name , code , message
export const USER_ALREADY_EXIST_ERR_NAME = "UserAlreadyExist";
export const USER_ALREADY_EXIST_ERR_CODE = 409;
export const USER_ALREADY_EXIST_ERR_MESSAGE = "User Already Exist";

export const INVALID_CREDENTIALS_ERR_NAME = "InvalidCredentials";
export const INVALID_CREDENTIALS_ERR_CODE = 403;
export const INVALID_CREDENTIALS_ERR_MESSAGE = "Invalid Credentials";
