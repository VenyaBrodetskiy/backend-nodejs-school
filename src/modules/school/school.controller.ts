import { Request, Response, NextFunction } from "express";
import { NON_EXISTING_ID } from "../../constants";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, systemError, whiteBoardType } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import SchoolService from './school.service';

class SchoolController {

    constructor() {}

    public getBoardTypes(req: Request, res: Response, next: NextFunction) {
        // console.log("User data: ", (req as AuthenticatedRequest).userData);
        SchoolService.getBoardTypes()
            .then((result: whiteBoardType[]) => {
                return res.status(200).json({
                    types: result
                });
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            })

    }

    public getBoardTypeById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);
    
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.getBoardTypeById(numericParamOrError)
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
    getBoardTypeByTitle(req: Request, res: Response, next: NextFunction) {
        let title: string = req.params.title;
        
        SchoolService.getBoardTypeByTitle(title)
            .then((result: whiteBoardType[]) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    };

    updateBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {

        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: whiteBoardType = req.body;
                const whiteBoard = {
                    id: numericParamOrError,
                    type: body.type
                };
                
                SchoolService.updateBoardTypeById(whiteBoard, (req as AuthenticatedRequest).userData.userId)
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

    addBoardType(req: Request, res: Response, next: NextFunction) {

        const body: whiteBoardType = req.body;
        const whiteBoard = {
            id: NON_EXISTING_ID,
            type: body.type
        };
                
        SchoolService.addBoardType(whiteBoard, (req as AuthenticatedRequest).userData.userId)
            .then((result: whiteBoardType) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            })
    };

    addBoardType2(req: Request, res: Response, next: NextFunction) {

        const body: whiteBoardType = req.body;
        const whiteBoard = {
            id: NON_EXISTING_ID,
            type: body.type
        };
                
        SchoolService.addBoardType(whiteBoard, (req as AuthenticatedRequest).userData.userId)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            })
    };

    addBoardTypeByStoredProcedure(req: Request, res: Response, next: NextFunction) {
        const body: whiteBoardType = req.body;
        const whiteBoard = {
            id: NON_EXISTING_ID,
            type: body.type
        };

        SchoolService.addBoardTypeByStoredProcedure(whiteBoard, (req as AuthenticatedRequest).userData.userId)
            .then((result: whiteBoardType) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    };


    deleteBoardTypeById = async (req: Request, res: Response, next: NextFunction) => {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id);

        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                SchoolService.deleteBoardTypeById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
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
export default new SchoolController();