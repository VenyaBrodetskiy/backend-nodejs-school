import express from 'express';
import controller from '../controllers/demo.controllers';
const router = express.Router();

router.get('/demo/hello-world', controller.getHelloWorld);


export default { router }; 