import { LoginResponse } from "../dtos/loginRespones.dto";
import User from "../entities/User";


export interface IAuthService {
    saveUser(user : User): Promise<User>;
    login(userName: string, password: string): Promise<LoginResponse>;
    //get user details
    getUserDetails(userId: number): Promise<User>;
}