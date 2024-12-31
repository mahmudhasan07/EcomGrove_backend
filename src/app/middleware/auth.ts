import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";



const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = token && jwt.verify(token, process.env.TOKEN_SECRET as string)
      

      req.user = verifiedUser;

      if (roles.length && !roles.includes((verifiedUser as jwt.JwtPayload).role)) {
        throw new ApiError(
          StatusCodes.FORBIDDEN,
          "Forbidden, You are not authorized!"
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
