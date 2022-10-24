import { NON_EXISTING_ID } from "../constants";
import { systemError } from "../entities";
import { AppError } from "../enums";
import { ErrorService } from "../services/error.service";

export class RequestHelper {
    
    public static ParseNumericInput(errorService: ErrorService, input: string): number | systemError {
        let result: number = NON_EXISTING_ID; // declare default value, which obviously cannot work

        if (isNaN(Number(input))) {
            const nonNumericError: systemError = errorService.getError(AppError.NonNumericInput);
            return nonNumericError;
        }
    
        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            const noInputParameterError: systemError = errorService.getError(AppError.InputParameterNotSupplied);
            return noInputParameterError;
        }

        return result;
    }
}

