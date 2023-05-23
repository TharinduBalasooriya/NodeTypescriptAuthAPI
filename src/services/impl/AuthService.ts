
import { myDataSource } from "../../app-data-source";
import { ApplicationError, INVALID_CREDENTIALS_ERR_CODE, INVALID_CREDENTIALS_ERR_MESSAGE, INVALID_CREDENTIALS_ERR_NAME, USER_ALREADY_EXIST_ERR_MESSAGE, USER_ALREADY_EXIST_ERR_NAME, USER_NOT_FOUND_ERR_CODE, USER_NOT_FOUND_ERR_MESSAGE, USER_NOT_FOUND_ERR_NAME, } from "../../consts/ApplicationErrors";
import User from "../../entities/User";
import { IAuthService } from "../IAuthService";
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

export class AuthService implements IAuthService {
   

    async saveUser(user: User): Promise<User> {

        const userRepository = myDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email: user.email });
        if (existingUser) {
            throw new ApplicationError(USER_ALREADY_EXIST_ERR_NAME, USER_NOT_FOUND_ERR_CODE, USER_ALREADY_EXIST_ERR_MESSAGE);
        }
        const hashedPassword = await hash(user.password, 10);
        user.password = hashedPassword;
        const savedUser = await userRepository.save(user);
        return savedUser;
    }

    async login(userName: string, password: string): Promise<string> {
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email: userName });
        if (!user) {
            throw new ApplicationError(INVALID_CREDENTIALS_ERR_NAME, INVALID_CREDENTIALS_ERR_CODE, INVALID_CREDENTIALS_ERR_MESSAGE);
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApplicationError(INVALID_CREDENTIALS_ERR_NAME, INVALID_CREDENTIALS_ERR_CODE, INVALID_CREDENTIALS_ERR_MESSAGE);
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret is not defined in the environment variables.');
        }


        //Generate JWT
        const token = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token
    }

    async getUserDetails(userId: number): Promise<User> {
        const userRepository = myDataSource.getRepository(User);
        console.log("User Id : " + userId)
        // const user = await userRepository.findOneBy({id : userId});
        // if (!user) {
        //     throw new ApplicationError(USER_NOT_FOUND_ERR_NAME, USER_NOT_FOUND_ERR_CODE,USER_NOT_FOUND_ERR_MESSAGE);
        // }
        return new User(",", ",", ",", ",");
    }

}