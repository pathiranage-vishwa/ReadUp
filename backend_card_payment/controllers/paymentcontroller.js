import Payment from '../models/paymentmodel.js';
import md5 from 'md5';
import nodemailer from 'nodemailer';

export const saveDetails  = async (req,res)=>{
    console.log(req.body)
    const PaymentType = req.body.PaymentType;
    const Username = req.body.Username;
    const payment_ID = md5(`${req.body.userId}${req.body.time}${req.body.date}`);
    const nameOnCard =req.body.nameOnCard;
    const email =req.body.email;
    const amount = req.body.transfer_amount;
    const cardNo = md5(`${req.body.cardNumber}`);

    const Paymentdetails = new Payment ({PaymentType,Username,payment_ID,nameOnCard,email,amount,cardNo})

    try {
        await Paymentdetails.save();
   
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getDetails = async (req,res)=>{
    try {
        const paydetails = await Payment.find();
        res.json(paydetails);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 




