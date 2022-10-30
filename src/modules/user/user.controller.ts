import { Request, Response, NextFunction } from "express";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, systemError, user } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import bcrypt from 'bcryptjs';
import UserService from "./user.service";
import { NON_EXISTING_ID } from "../../constants";
import LoggerService from "../../core/logger.service";

class UserController {

    constructor() {}

    // public async getUserById(req: Request, res: Response, next: NextFunction) {
    //     LoggerService.debug("getUserById method start");
    //     const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    //     if (typeof numericParamOrError === "number") {
    //         if (numericParamOrError > 0) {
    //             LoggerService.debug("getUserById successful return");
    //             const result: user = await UserService.getById(numericParamOrError);
    //             return res.status(200).json(result);
    //         }
    //         else {
    //             // TODO: Error handling
    //             LoggerService.debug("getUserById unhandled error");
    //         }
    //     }
    //     else {
    //         LoggerService.debug("getUserById failure response");
    //         return ResponseHelper.handleError(res, numericParamOrError);
    //     }
    //     LoggerService.debug("getUserById method end");
    // }

    public updateById(req: Request, res: Response, next: NextFunction) {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: user = req.body;
    
                const user = {
                    id: numericParamOrError,
                    firstName: body.firstName,
                    lastName: body.lastName,
                };
                
                UserService.updateById(user, (req as AuthenticatedRequest).userData.userId)
                    .then((result: user) => {
                        return res.status(200).json(result);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    })
            }
            else {
                // TODO: Error handling
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }  
    };
    
    public add(req: Request, res: Response, next: NextFunction) {
        const body: user = req.body;
        const hashedPasword: string = bcrypt.hashSync(body.password as string);
    
        const user = {
            id: NON_EXISTING_ID,
            firstName: body.firstName,
            lastName: body.lastName,
            login: body.login,
            password: hashedPasword
        };
                
        UserService.add(user, (req as AuthenticatedRequest).userData.userId)
            .then((result: user) => {
                // it's important to replace returnUser in order to hide password
                const returnUser: user = {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName
                }
                return res.status(200).json(returnUser);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            })
    };
    
    
    public deleteById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                UserService.deleteById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                    .then(() => {
                        return res.sendStatus(200);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    })
            }
            else {
                // TODO: Error handling
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
        
    };
}

// creating singleton
export default new UserController();