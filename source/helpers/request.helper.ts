import { ErrorCodes, ErrorMessages, NON_EXISTING_ID } from "../constants";
import { systemError } from "../entities";
import { ErrorHelper } from "./error.helper";

export class RequestHelper {
    
    public static ParseNumericInput(input: string): number | systemError {
        let result: number = NON_EXISTING_ID; // declare default value, which obviously cannot work

        if (isNaN(Number(input))) {
            const nonNumericError: systemError = ErrorHelper.createError(ErrorCodes.NonNumericInput, ErrorMessages.NonNumericInput);
            return nonNumericError;
        }
    
        if (input !== null && input !== undefined) {
            result = parseInt(input);
        }
        else {
            const noInputParameterError: systemError = ErrorHelper.createError(ErrorCodes.InputParameterNotSupplied, ErrorMessages.InputParameterNotSupplied);
            return noInputParameterError;
        }

        return result;
    }
}

