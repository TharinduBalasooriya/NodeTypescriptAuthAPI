/**
 * Auth Middleware
 * 
 */

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { myDataSource } from '../app-data-source';
import  User  from '../entities/User';
import  {handleError } from '../utils/errorHandling';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return handleError(res, 401, 'Authorization header missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret is not defined in the environment variables.');
    }
    const decodedToken: any = verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const userRepository = myDataSource.getRepository(User);

    // Retrieve the user from the database based on the decoded token
    const user = await userRepository.findOneBy({id : userId});

    if (!user) {
      return handleError(res, 401, 'Invalid token');
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
        return handleError(res, 401, error.message);
    }
    handleError(res, 401, 'Internal server error');
  }
};
