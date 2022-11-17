import { ColumnType, ColumnUpdateType, TableNames } from "../enums";
import * as _ from 'underscore';
import { whiteBoardType } from "../entities";
import { columnDefinition, tableDefinition } from "../db-entities";
import { DbTable } from "./db-table.service";

interface localTable<T> {
    table: tableDefinition;
    instance: DbTable<T>;
}

interface IDbService {
    getFromTableById(tableName: TableNames, id: number): Promise<any>;
    updateTableById<T>(tableName: TableNames, id: number, original: T, userId: number): Promise<void>;
}

class DbService implements IDbService {

    private _tables: _.Dictionary<any> = {};

    constructor() {
        this._tables[TableNames.WhiteBoardType] = this.addTableToContext<whiteBoardType>(
            TableNames.WhiteBoardType,
            [{
                dbName: "id",
                name: "id",
                type: ColumnType.Integer,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "white_board_type",
                name: "type",
                type: ColumnType.Varchar,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            } , {
                dbName: 'create_date',
                name: 'createDate',
                type: ColumnType.Date,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
                
            } , {
                dbName: "update_date",
                name: "updateDate",
                type: ColumnType.Date,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.CurrentDate
            }, {
                dbName: "create_user_id",
                name: "createUser",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "update_user_id",
                name: "updateUser",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.CurrentUser
            }, {
                dbName: "status_id",
                name: "statusId",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.None
            }]
        )
    }

    public async getFromTableById(tableName: TableNames, id: number): Promise<any> {
        const dbTableObject: localTable<any> = this._tables[tableName];

        return await dbTableObject.instance.getById(id);
    }

    public async updateTableById<T>(tableName: TableNames, id: number, original: T, userId: number): Promise<void> {
        const dbTableObject: localTable<any> = this._tables[tableName];

        // TODO: ask ilya. why here don't do return. in this case we should lose error
        await dbTableObject.instance.updateById(id, original, userId);
    }

    private addTableToContext<T>(tableName: TableNames, fields: columnDefinition[]): localTable<T> {
        let tableDefinition: tableDefinition = {
            name: tableName,
            fields: fields
        }

        let tableInstance: DbTable<T> = new DbTable(tableDefinition);

        let table: localTable<T> = {
            table: tableDefinition,
            instance: tableInstance
        }

        return table;
    }
}

export default new DbService();
