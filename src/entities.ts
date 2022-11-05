import { AppError, Role, Status } from "./enums";
import { Request } from "express";
export interface entityWithId{
    id: number;
}

export interface whiteBoardType extends entityWithId {
    type: string;
}

export interface user extends entityWithId {
    firstName: string;
    lastName: string;
    login?: string;
    password?: string;
    role?: string;
}

export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface sqlParameter {
    name: string;
    type: any;
    value: string | number;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface AuthenticatedRequest extends Request, authenticationToken {}
export interface jwtUserData {
    userId: number;
    roleId: Role;
}

export interface environment {
    dbConnectionString: string;
    tokenSecret: string;
    logsFolder: string;
    serverPort: number;
}

export interface entityBase extends entityWithId {
    createDate?: string;
    updateDate?: string;
    createUser?: user;
    updateUser?: user;
    statusId?: Status;
}

export interface classRoom extends entityBase {
    roomNumber: number;
    roomFloor: number;
    hasProjector: boolean;
    whiteBoardType: whiteBoardType;
}

export interface teacher extends entityWithId {
    firstName: string;
    lastName: string;
    birthdate: Date;
    isMale: boolean;
    graduations: teacherGraduation[];
}

export interface profession extends entityWithId {
    title: string; 
}

export interface teacherGraduation {
    profession: profession;
    graduationYear: number;
}