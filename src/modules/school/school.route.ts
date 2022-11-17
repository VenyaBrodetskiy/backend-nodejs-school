import { RouteConfig } from '../../framework/route.config';
import { Application } from "express";
import SchoolController from "./school.controller";
import AuthMiddleware from '../../core/middleware/auth.middleware'
import { Role } from '../../enums';

export class SchoolRoutes extends RouteConfig {
    
    constructor(app: Application) {
        super(app, "SchoolRoutes", "general");
    }

     public configureRoutes() {
        this.app.route(`/${this.baseUrl}/board-types`)
            .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), 
                SchoolController.getBoardTypes]);

        this.app.route(`/${this.baseUrl}/board-type/:id`)
            .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]), 
                SchoolController.getBoardTypeById]);

        this.app.route(`/${this.baseUrl}/board-type-by-title/:title`)
            .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.getBoardTypeByTitle]);

        this.app.route(`/${this.baseUrl}/board-type/:id`)
            .put([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.updateBoardTypeById]);

        this.app.route(`/${this.baseUrl}/board-types`)
            .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.addBoardType]);

        this.app.route(`/${this.baseUrl}/board-types2`)
            .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.addBoardType2]);

        this.app.route(`/${this.baseUrl}/board-types-sp`)
            .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.addBoardTypeByStoredProcedure]);

        this.app.route(`/${this.baseUrl}/board-type/:id`)
            .delete([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.deleteBoardTypeById]);

        this.app.route(`/${this.baseUrl}/room/:id`)
            .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.getRoomById]);

        this.app.route(`/${this.baseUrl}/room/:id`)
            .put([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.updateRoomById]);

        this.app.route(`/${this.baseUrl}/room`)
            .post([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.addRoom]);

        this.app.route(`/${this.baseUrl}/teacher/:id`)
            .get([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.getTeacherById]);

        this.app.route(`/${this.baseUrl}/teacher/:id`)
            .put([AuthMiddleware.verifyToken([Role.Administrator, Role.RegularUser]),
                SchoolController.updateTeacherById]);

        return this.app;
    }
}