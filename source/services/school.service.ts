import { Quaries } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { SqlHelper } from '../helpers/sql.helper';
import _ from 'underscore';

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardTypeById(id: number): Promise<whiteBoardType>;
}

interface localWhiteBoardType {
    id: number;
    white_board_type: string;
}

export class SchoolService implements ISchoolService {
    
    public getBoardTypes(): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const result: whiteBoardType[] = [];
            
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(Quaries.WhiteBoardTypes)             
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
            
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(Quaries.WhiteBoardTypesByID, id)
            .then((queryResult: localWhiteBoardType) => {
                resolve(this.parseLocalBoardType(queryResult))
            })
            .catch((error: systemError) => reject(error));
        });
    }

    public getBoardTypeByTitle(title: string): Promise<whiteBoardType[]> {
        return new Promise<whiteBoardType[]>((resolve, reject) => {
            const query: string = `${Quaries.WhiteBoardTypeByTitle} '%${title}%'`;
            SqlHelper.executeQueryArrayResult<localWhiteBoardType>(query)
                .then((queryResult: localWhiteBoardType[]) => {
                    resolve(_.map(queryResult, (result: localWhiteBoardType) => this.parseLocalBoardType(result)));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalBoardType(local: localWhiteBoardType): whiteBoardType {     
        return {
            id: local.id,
            type: local.white_board_type
        }
    }
}
