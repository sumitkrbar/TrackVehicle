import express from 'express';
import {addVehicleController} from '../controllers/addVehicleController.js';
import {trackVehicleController} from '../controllers/trackVehicleController.js';

const router = express.Router();

router.post('/add-vehicle', addVehicleController);
router.get('/track-vehicle', trackVehicleController);


export default router;