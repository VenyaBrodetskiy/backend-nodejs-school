export enum Status {
    Active = 1,
    NotActive = 2,
}

export enum Role {
    Administrator = 1,
    RegularUser = 2
}

export enum AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumericInput",
    InputParameterNotSupplied = "InputParameterNotSupplied",
    DeletionConflict = "DeletionConflict"
}

export enum TableNames {
    User = '[user]',
    WhiteBoardType = '[white_board_type]',
    Status = '[status]'
}

export enum ColumnType {
    Integer = 1,
    Varchar,
    Boolean,
    Date
}

export enum ColumnUpdateType {
    None = 1,
    Always,
    CurrentDate,
    CurrentUser
}