import { Quaries, TEMP_USER_ID } from '../constants';
import { entityWithId, systemError, whiteBoardType } from '../entities';
import { SqlHelper } from '../helpers/sql.helper';
import _ from 'underscore';
import { Status } from '../enums';
import { DateHelper } from '../helpers/date.helper';
import { ErrorService } from './error.service';

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardTypeById(id: number): Promise<whiteBoardType>;
    getBoardTypeByTitle(title: string): Promise<whiteBoardType[]>
    updateBoardTypeById(whiteBoardType: whiteBoardType): Promise<whiteBoardType>;
    addBoardType(whiteBoardType: whiteBoardType): Promise<whiteBoardType>;
    addBoardType2(whiteBoardType: whiteBoardType): Promise<whiteBoardType>;
    deleteBoardTypeById(id: number): Promise<void>;
}

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: number;
}

export class SchoolService implements ISchoolService {
    
    constructor(private errorService: ErrorService) {

    }

    // this is same as
    // constructor(errorService: ErrorService) {
    //    this.errorService = ErrorService
    // }
    
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
            
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(this.errorService, Quaries.WhiteBoardTypes, Status.Active)             
            .then((queryResult: localWhiteBoardType[]) => {
                queryResult.forEach((whiteBoardType: localWhiteBoardType) => {
                    result.push(this.parseLocalBoardType(whiteBoardType))
                });
                resolve(result);
            })
            .catch((error: systemError) => reject(error));
        });
    }

    public getBoardTypeById(id: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {    
            
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(this.errorService, Quaries.WhiteBoardTypesByID, id, Status.Active)
            .then((queryResult: localWhiteBoardType) => {
                resolve(this.parseLocalBoardType(queryResult))
            })
            .catch((error: systemError) => reject(error));
        });
    }

    public getBoardTypeByTitle(title: string): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(this.errorService, Quaries.WhiteBoardTypeByTitle, `%${title}%`)
                .then((queryResult: localWhiteBoardType[]) => {
                    resolve(_.map(queryResult, (result: localWhiteBoardType) => this.parseLocalBoardType(result)));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public updateBoardTypeById(whiteBoardType: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const updateDate: Date = new Date();
            const updateUser: number = TEMP_USER_ID;
            SqlHelper.executeQueryNoResult(this.errorService, Quaries.UpdateWhiteBoardTypeById, false, whiteBoardType.type, DateHelper.dateToString(updateDate), updateUser, whiteBoardType.id, Status.Active)
            .then(() => {
                resolve(whiteBoardType);
            })
            .catch((error: systemError) => reject(error));
        });
    }

    public addBoardType(whiteBoardType: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            const createUser: number = TEMP_USER_ID;

            SqlHelper.createNew(this.errorService, Quaries.AddWhiteBoardType, whiteBoardType, whiteBoardType.type, createDate, createDate, createUser, createUser, Status.Active)
            .then((result: entityWithId) => {
                resolve(result as whiteBoardType);
            })
            .catch((error: systemError) => reject(error));
        });
    }

    // let's try to do in other logic
    public addBoardType2(whiteBoardType: whiteBoardType): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Quaries.AddWhiteBoardType, false, whiteBoardType.type)
            .then(() => {
                return SqlHelper.executeQuerySingleResult<localWhiteBoardType>(this.errorService, Quaries.SelectIdentity);
            })
            .then((queryResult: localWhiteBoardType) => {
                resolve(this.parseLocalBoardType(queryResult));
            })
            .catch((error: systemError) => reject(error));
        });
    }

    public deleteBoardTypeById(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            const updateUser: number = TEMP_USER_ID;
            SqlHelper.executeQueryNoResult(this.errorService, Quaries.DeleteWhiteBoardTypeById, true, DateHelper.dateToString(updateDate), updateUser, Status.NotActive, id, Status.Active)
            .then(() => {
                resolve();
            })
            .catch((error: systemError) => reject(error));
        });
    }


    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {     
        return {
            id: local.id,
            type: local.white_board_type
        }
    }
}
