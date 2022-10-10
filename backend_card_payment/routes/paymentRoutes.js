import express from 'express';
const router = express.Router();
import {makePayment, saveCardPayment} from '../controllers/GatewayController.js'
import {saveDetails,getDetails} from '../controllers/paymentcontroller.js'



router.post('/addpayment',makePayment);
router.post('/payment',saveDetails);
router.post('/saveCardPayment',saveCardPayment);

export default router;