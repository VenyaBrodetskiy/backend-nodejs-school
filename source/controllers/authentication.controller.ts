import { Request, Response, NextFunction } from 'express';
import { ErrorService } from '../services/error.service';
import bcrypt from 'bcryptjs';
import { AuthenticationService } from '../services/authentication.service';
import { systemError } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';

interface localUser {
    login: string;
    password: string;
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {

    const body: localUser = req.body;

    authenticationService.login(body.login, body.password)
        .then((id: number) => {
            // TODO: generate JWT token
            const token: string = '';
            return res.status(200).json({
                token: token
            });
            // TODO: handle error
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error, true);
        })
   
};

export default { login }