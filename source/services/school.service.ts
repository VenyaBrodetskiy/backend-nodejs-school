import { Connection } from 'msnodesqlv8'
import { Quaries } from '../constants';
import { systemError, whiteBoardType } from '../entities';
import { SqlHelper } from '../helpers/sql.helper';

interface ISchoolService {
    getBoardTypes(): Promise<whiteBoardType[]>;
    getBoardType(id: number): Promise<whiteBoardType>;
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

    public getBoardType(id: number): Promise<whiteBoardType> {
        return new Promise<whiteBoardType>((resolve, reject) => {    
            
            SqlHelper.executeQuerySingleResult<localWhiteBoardType>(`${Quaries.WhiteBoardTypesByID} ${id}`)
            .then((queryResult: localWhiteBoardType) => {
                resolve(this.parseLocalBoardType(queryResult))
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
