import express from 'express';
import {addDocController} from '../controllers/addDocController.js';
import {trackDocController} from '../controllers/trackDocController.js';

const router = express.Router();

router.post('/add-doc', addDocController);
router.get('/track-doc', trackDocController);


export default router;