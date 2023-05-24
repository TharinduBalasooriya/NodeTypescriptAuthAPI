import { Request, Response } from "express";
import { ApplicationError } from "../consts/ApplicationErrors";
import { SignupDTO } from '../dtos/signup.dot'
import User from "../entities/User";
import { AuthService } from "../services/impl/AuthService";
import { handleError } from "../utils/errorHandling";
import { omit } from 'lodash';

export default class AuthController {
    
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public  async signUp(req: Request, res: Response) {

        try{
            const { email, password , firstName , lastName} = req.body;
            const validation = SignupDTO.safeParse({ email, password, firstName, lastName });
            if(!validation.success){
                throw new ApplicationError("Invalid data" , 400 , JSON.parse(validation.error.message));
            }
            const reqUser = new User(email, password, firstName, lastName);
            const user = await this.authService.saveUser(reqUser);
            const userWithoutPassword = omit(user, 'password');
            //User created successfully
            return res.status(201).json(userWithoutPassword);
        }catch(err : any){
            console.log(err);
            if(err instanceof ApplicationError){
                return handleError(res, err.code, err.message)
            }
            return handleError(res, 500, err.message)
        }

        
    }

    public async login(req: Request, res: Response) {
        try{
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            return res.status(200).json(token);
        }catch(err : any){
            console.log(err);
            if(err instanceof ApplicationError){
                return handleError(res, err.code, err.message)
            }
            return handleError(res, 500, err.message)
        }
    }

    public async getUserData(req: Request, res: Response) {
        console.log("Get user data");
        try{
            //Get id from query params
            const userId = parseInt(req.params.id)
            const user = await this.authService.getUserDetails(userId);
            const userWithoutPassword = omit(user, 'password');
            return res.status(200).json(userWithoutPassword);
        }catch(err : any){
            console.log(err);
            if(err instanceof ApplicationError){
                return handleError(res, err.code, err.message)
            }
            return handleError(res, 500, err.message)
        }
    }
}