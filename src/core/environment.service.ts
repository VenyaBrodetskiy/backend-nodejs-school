// this is just a demonstration that environment service can be done as class with intances
import { environment } from "../entities";

interface IEnvironmentService {
    environment: environment;
}

class EnvironmentService implements IEnvironmentService {
    private _environment: environment = {} as any;

    constructor() {
    }

    public get environment() {
        return this._environment;
    }

    public initialize(): void {
        this._environment = {
            dbConnectionString: process.env.DB_CONNECTION_STRING as string,
            tokenSecret: process.env.TOKEN_SECRET as string,
            logsFolder: process.env.DEFAULT_LOG_FOLDER as string,
            serverPort: parseInt(process.env.SERVER_PORT as string)
        }
    }
}

export default new EnvironmentService();