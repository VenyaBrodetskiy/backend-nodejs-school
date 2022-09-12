import express from 'express';
import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/general/board-types', controller.getBoardTypes);
router.get('/general/board-types/:id', controller.getBoardTypeById);
router.get('/general/board-type-by-title/:title', controller.getBoardTypeByTitle);

router.put('/general/board-types/:id', controller.updateBoardTypeById);

router.post('/general/board-types', controller.addBoardType);
router.post('/general/board-types2', controller.addBoardType2);

router.delete('/general/board-types/:id', controller.deleteBoardTypeById);


export default { router }; 