import { Request, Response, NextFunction } from 'express';
import { NON_EXISTING_ID } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { SchoolService } from '../services/school.service';

const schoolService: SchoolService = new SchoolService();

const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
    schoolService.getBoardTypes()
        .then((result: whiteBoardType[]) => {
            return res.status(200).json({
                types: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
    
};

const getBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.getBoardTypeById(numericParamOrError)
                .then((result: whiteBoardType) => {
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

// SQL injection made by sending the following as a parameter: <' OR 1=1 -- >
const getBoardTypeByTitle = async (req: Request, res: Response, next: NextFunction) => {
    let title: string = req.params.title;
    
    schoolService.getBoardTypeByTitle(title)
        .then((result: whiteBoardType[]) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const updateBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: whiteBoardType = req.body;
            const whiteBoard = {
                id: numericParamOrError,
                type: body.type
            };
            
            schoolService.updateBoardTypeById(whiteBoard)
                .then((result: whiteBoardType) => {
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

const addBoardType = async (req: Request, res: Response, next: NextFunction) => {

    const body: whiteBoardType = req.body;
    const whiteBoard = {
        id: NON_EXISTING_ID,
        type: body.type
    };
            
    schoolService.addBoardType(whiteBoard)
        .then((result: whiteBoardType) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
};

const addBoardType2 = async (req: Request, res: Response, next: NextFunction) => {

    const body: whiteBoardType = req.body;
    const whiteBoard = {
        id: NON_EXISTING_ID,
        type: body.type
    };
            
    schoolService.addBoardType(whiteBoard)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
};

const deleteBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            schoolService.deleteBoardTypeById(numericParamOrError)
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



export default { 
    getBoardTypes, 
    getBoardTypeById, 
    getBoardTypeByTitle, 
    updateBoardTypeById, 
    addBoardType, 
    addBoardType2, 
    deleteBoardTypeById 
};