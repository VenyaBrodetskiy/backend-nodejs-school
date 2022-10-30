import { RouteConfig } from '../../framework/route.config';
import { Application } from "express";
import UserController from "./user.controller";
import AuthMiddleware from '../../core/middleware/auth.middleware';
import { Role } from '../../enums';

export class UserRoutes extends RouteConfig {
    
    constructor(app: Application) {
        super(app, "UserRoutes", "user");
    }

    configureRoutes() {
        // this.app.route(`/${this.baseUrl}/:id`)
        //     .get([AuthMiddleware.verifyToken([Role.Administrator]), UserController.getUserById]);

        this.app.route(`/${this.baseUrl}/`)
            .post([AuthMiddleware.verifyToken([Role.Administrator]), UserController.add]);

        this.app.route(`/${this.baseUrl}/:id`)
            .post([AuthMiddleware.verifyToken([Role.Administrator]), UserController.updateById]);

        this.app.route(`/${this.baseUrl}/:id`)
            .delete([AuthMiddleware.verifyToken([Role.Administrator]), UserController.deleteById]);

        return this.app;
    }
}