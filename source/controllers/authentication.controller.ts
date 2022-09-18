import { Request, Response, NextFunction } from 'express';
import { ErrorService } from '../services/error.service';
import jwt from 'jsonwebtoken';
import { AuthenticationService } from '../services/authentication.service';
import { jwsUserData, systemError } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { TOKEN_SECRET } from '../constants';

interface localUser {
    login: string;
    password: string;
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {

    const user: localUser = req.body;

    authenticationService.login(user.login, user.password)
        .then((id: number) => {
            // TODO: generate JWT token
            const jwtUser: jwsUserData = {
                userId: id
            };
            const token: string = jwt.sign(
                jwtUser,
                TOKEN_SECRET,
                {
                  expiresIn: "2h",
                }
            );

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