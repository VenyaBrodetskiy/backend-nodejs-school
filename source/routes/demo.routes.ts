import express from 'express';
import controller from '../controllers/demo.controllers';
const router = express.Router();

router.get('/hello-world', controller.getHelloWorld);

router.get('/timeout', controller.getWithTimeout);

router.get('/delay/:seconds', controller.getWithDelay);

router.get('/delay-validated/:seconds', controller.getWithDelayValidated);

export default { router }; 