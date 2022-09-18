import express from 'express';
import controller from '../controllers/school.controller';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.get('/board-types', middleware.verifyToken, controller.getBoardTypes);
router.get('/board-types/:id', middleware.verifyToken, controller.getBoardTypeById);
router.get('/board-type-by-title/:title', middleware.verifyToken, controller.getBoardTypeByTitle);

router.put('/board-types/:id', middleware.verifyToken, controller.updateBoardTypeById);

router.post('/board-types', middleware.verifyToken, controller.addBoardType);
router.post('/board-types2', middleware.verifyToken, controller.addBoardType2);

router.delete('/board-types/:id', middleware.verifyToken, controller.deleteBoardTypeById);


export default { router }; 