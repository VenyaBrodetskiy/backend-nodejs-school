import { Request, Response, NextFunction } from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ // why res in input of function??? if we return it
        message: "Hello world!"
    });
};

const getWithTimeout = async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
        return res.status(200).json({ // why res in input of function??? if we return it
            message: "Timeout in 2 second!"
        });
    }, 2000);
};

const getWithDelay = async (req: Request, res: Response, next: NextFunction) => {
    // Read the delay in seconds from request parameter
 
    let delayInSeconds: number = parseInt(req.params.seconds);

    setTimeout(() => {
        return res.status(200).json({ // why res in input of function??? if we return it
            message: `Timeout in ${delayInSeconds} second!`
        });
    }, delayInSeconds * 1000);
};

const getWithDelayValidated = async (req: Request, res: Response, next: NextFunction) => {
    // Read the delay in seconds from request parameter
    const secondsStringParameter: string = req.params.seconds;
    if (isNaN(Number(req.params.seconds))) {
        // Error response
       
       // Other way to send error. Looks like "Not Acceptable" as return from the server
       // return res.sendStatus(406);
        return res.status(406).json({
            error: "Incorrect seconds parameter value"
        });
        
    }
    else {
        // all in good: proceed
        let delayInSeconds: number = parseInt(req.params.seconds);
        setTimeout(() => {
            return res.status(200).json({ // why res in input of function??? if we return it
                message: `Timeout in ${delayInSeconds} second!`
            });
        }, delayInSeconds * 1000);
    }
};

export default { getHelloWorld, getWithTimeout, getWithDelay, getWithDelayValidated };