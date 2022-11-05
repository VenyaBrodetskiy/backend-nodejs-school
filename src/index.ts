import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import { RouteConfig } from "./framework/route.config";
import { UserRoutes } from "./modules/user/user.route";
import { SchoolRoutes } from "./modules/school/school.route";
import { AuthenticationRoutes } from "./core/authentication/authentication.route";
import { Environment } from "./core/env.service";
import LoggerService from "./core/logger.service";


LoggerService.initialize();

const routes: Array<RouteConfig> = [];
const app: Express = express();

app.use(express.json());
app.use(cors());

// will be neede when we add environment
// if (process.env.DEBUG) {
//   process.on("unhandledRejection", (reason) => {
//     process.exit(1);
//   });
// } 

routes.push(new UserRoutes(app));
routes.push(new SchoolRoutes(app));
routes.push(new AuthenticationRoutes(app));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome world")
});

const server: http.Server = http.createServer(app);

server.listen(Environment.serverPort, () => {
  LoggerService.info(`Server is running on ${Environment.serverPort}`);
  routes.forEach((route: RouteConfig) => {
    LoggerService.info(`Routes configured for ${route.getName()}`)
  })
})