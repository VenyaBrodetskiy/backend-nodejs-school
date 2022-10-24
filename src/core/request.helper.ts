import { NON_EXISTING_ID } from "../constants";
import { systemError } from "../entities";
import { AppError } from "../enums";
import ErrorService from "./error.service";

export class RequestHelper {
    
    public static ParseNumericInput(input: string): number | systemError {
        let result: number = NON_EXISTING_ID; // declare default value, which obviously cannot work

        if (isNaN(Number(input))) {
            const nonNumericError: systemError = ErrorService.getError(AppError.NonNumericInput);
            return nonNumericError;
        }
    
        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            const noInputParameterError: systemError = ErrorService.getError(AppError.InputParameterNotSupplied);
            return noInputParameterError;
        }

        return result;
    }
}

