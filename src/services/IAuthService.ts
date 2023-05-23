import User from "../entities/User";


export interface IAuthService {
    saveUser(user : User): Promise<User>;
    login(userName: string, password: string): Promise<string>;
}