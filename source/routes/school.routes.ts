import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/board-types', controller.getBoardTypes);
router.get('/board-types/:id', controller.getBoardTypeById);
router.get('/board-type-by-title/:title', controller.getBoardTypeByTitle);

router.put('/board-types/:id', controller.updateBoardTypeById);

router.post('/board-types', controller.addBoardType);
router.post('/board-types2', controller.addBoardType2);

router.delete('/board-types/:id', controller.deleteBoardTypeById);


export default { router }; 