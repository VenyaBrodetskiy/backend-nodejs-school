import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";
import { AuthenticatedRequest, jwtUserData } from "../entities";
interface jwtBase {
    userData: jwtUserData;
    exp: number;
    iat: number;
}

function verifyToken(req: Request, res: Response, next: NextFunction)  {
    let token: string | undefined = req.headers["authorization"]?.toString(); 

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        token = token.substring("Bearer ".length);
        const decoded: string | JwtPayload = jwt.verify(token, TOKEN_SECRET);
        (req as AuthenticatedRequest).userData = (decoded as jwtBase).userData;
    } 
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
        return next();
};

export default { verifyToken }