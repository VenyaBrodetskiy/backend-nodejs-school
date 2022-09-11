export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;

}

export class ErrorMessages {
    public static DBConnectionError: string = "DB server connection error";
    public static SQLQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Data not found";
}

export class Quaries {
    public static WhiteBoardTypes: string = "SELECT * FROM white_board_type";
    public static WhiteBoardTypesByID: string = "SELECT * FROM white_board_type WHERE id = ";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";