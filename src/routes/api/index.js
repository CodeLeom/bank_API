import express from 'express';

import method from 'utils/method';
import Controller from 'controllers/index';

const router = express.Router();

router.route('/banks').get(Controller.getAllBanks).all(method);

router.route('/banks').post(Controller.addBank).all(method);

router.route('/banks/:id').put(Controller.updateBank).all(method);

router.route('/banks/:id').delete(Controller.deleteBank).all(method);

export default router;
