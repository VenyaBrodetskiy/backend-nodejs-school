import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorMessages } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { ErrorHelper } from '../helpers/error.helper';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { SchoolService } from '../services/school.service';

const schoolService: SchoolService = new SchoolService();

const getBoardTypes = async (req: Request, res: Response, next: NextFunction) => {
    schoolService.getBoardTypes()
        .then((result: whiteBoardType[]) => {
            return res.status(200).json({
                result
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

const updateBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: whiteBoardType = req.body;
            // schoolService.getBoardTypeById(id)
            //     .then((result: whiteBoardType) => {
            //         return res.status(200).json(result);
            //     })
            //     .catch((error: systemError) => {
            //         return ResponseHelper.handleError(res, error);
            //     })
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

export default { getBoardTypes, getBoardTypeById, getBoardTypeByTitle, updateBoardTypeById };