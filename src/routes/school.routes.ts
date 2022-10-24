import express from 'express';
import controller from '../controllers/school.controller';
import { Role } from '../enums';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/board-types', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardTypes);
router.get('/board-types/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardTypeById);
router.get('/board-type-by-title/:title', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getBoardTypeByTitle);

router.put('/board-types/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.updateBoardTypeById);

router.post('/board-types', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addBoardType);
router.post('/board-types2', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addBoardType2);
router.post('/board-types-sp', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.addBoardTypeByStoredProcedure);

router.delete('/board-types/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.deleteBoardTypeById);


export default { router }; 