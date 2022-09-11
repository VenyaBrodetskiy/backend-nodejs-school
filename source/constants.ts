export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;

}

export class ErrorMessages {
    public static DBConnectionError: string = "DB server connection error";
    public static SQLQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplied";
    public static InputParameterNotSupplied: string = "Input Parameter Not Supplied";
}

export class SqlParameters {
    public static Id: string = "id";
}
export class Quaries {
    public static WhiteBoardTypes: string = "SELECT * FROM white_board_type";
    public static WhiteBoardTypesByID: string = `SELECT * FROM white_board_type WHERE id = ?`;
    public static WhiteBoardTypeByTitle: string = "SELECT * FROM white_board_type WHERE white_board_type LIKE ";
    public static UpdateWhiteBoardTypeById: string = "UPDATE white_board_type SET white_board_type = ? WHERE id = ?";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";