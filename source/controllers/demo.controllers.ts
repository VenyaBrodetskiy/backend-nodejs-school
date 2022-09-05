import { Request, Response, NextFunction } from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ // why res in input of function??? if we return it
        message: "Hello world!"
    });
};

export default { getHelloWorld };