import { columnDefinition, tableDefinition } from "../db-entities";
import { systemError } from "../entities";
import { ColumnType, ColumnUpdateType, Status } from "../enums";
import { DateHelper } from "../framework/date.helper";
import { SqlHelper } from "./sql.helper";

interface IDbTable<T> {
    // instanceGenericType: T;

    getById<T>(id: number): Promise<T>;
    updateById<T>(id: number, original: T, userId: number): Promise<void>;
}

export class DbTable<T> implements IDbTable<T> {
    private _table: tableDefinition;
    // private _instanceGenericType: T;

    constructor(table: tableDefinition) {
        this._table = table;
        // this._instanceGenericType = {} as T;
    }

    public async getById<T>(id: number): Promise<T> {
        let queriedFields: string = 
            this._table.fields
            .filter((column: columnDefinition) => column.isForOutput)
            .map((column: columnDefinition) => column.dbName)
            .join(', ');
        let sql: string = `
            SELECT ${queriedFields}
            FROM ${this._table.name}
            WHERE id = ? and status_id = ?`;

        const result: T = await SqlHelper.executeQuerySingleResult<T>(sql, id, Status.Active);
        
        // parse result from dbName to serverName
        // ex.: {first_name = "Demo", id = 2} => {firstName = "Demo", id = 2}
        this._table.fields.forEach((column: columnDefinition) => {
            if (column.type === ColumnType.Date) {
                (result as any)[column.name] = DateHelper.dateToString((result as any)[column.dbName]);
            } else {
                (result as any)[column.name] = (result as any)[column.dbName];
            }

            if (column.name !== column.dbName) {
                delete ((result as any)[column.dbName]);
            }
        });
        
        return result;
    }

    public async updateById<T>(id: number, original: T, userId: number): Promise<void> {
        const updatableFields: columnDefinition[] = this._table.fields
            .filter((column: columnDefinition) => column.updateType === ColumnUpdateType.Always);

        const currentDateFields: columnDefinition[] = this._table.fields
            .filter((column: columnDefinition) => column.updateType === ColumnUpdateType.CurrentDate);
        const currentDateFieldsClause: string = currentDateFields
            .map((column: columnDefinition) => `${column.dbName} = ?`)
            .join(', ');

        const currentUserFields: columnDefinition[] = this._table.fields
            .filter((column: columnDefinition) => column.updateType === ColumnUpdateType.CurrentUser);
        const currentUserFieldsClause: string = currentUserFields
            .map((column: columnDefinition) => `${column.dbName} = ?`)
            .join(', ');
            
        const sql: string = `
            UPDATE ${this._table.name}
            SET ${updatableFields.map((column: columnDefinition) => `${column.dbName} = ?`).join(', ')}
                ${currentDateFieldsClause ? ', ' + currentDateFieldsClause : ''}
                ${currentUserFieldsClause ? ', ' + currentUserFieldsClause : ''}
            WHERE id = ? and status_id = ${Status.Active}`;

        const params: (string | number | boolean)[] = [];
        updatableFields.forEach((column: columnDefinition) => {
            params.push((original as any)[column.name]);
        });

        currentDateFields.forEach(() => {
            params.push(DateHelper.dateToString(new Date()));
        });

        currentUserFields.forEach(() => {
            params.push(userId)
        });

        params.push(id);

        try {
            await SqlHelper.executeQueryNoResult(sql, false, ...params);
        }
        catch (error) {
            throw(error as systemError);
        }
    }
}