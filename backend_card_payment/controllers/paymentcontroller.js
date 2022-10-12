import Payment from '../models/paymentmodel.js';
import md5 from 'md5';


export const saveDetails  = async (req,res)=>{
    const PaymentType = req.body.PaymentType;
    const Username = req.body.Username;
    const payment_ID = md5(`${req.body.order_id}`);
    const nameOnCard =req.body.nameOnCard;
    const email =req.body.email;
    const amount = req.body.transfer_amount;
    var reCardNo = req.body.cardNumber;
    if(reCardNo.toString().length==16){
       const cardNo = md5(`${req.body.cardNumber}`);
       const Paymentdetails = new Payment ({PaymentType,Username,payment_ID,nameOnCard,email,amount,cardNo})
       try {
        await Paymentdetails.save();
   
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    }else{
        const cardNo = req.body.cardNumber;
        const Paymentdetails = new Payment ({PaymentType,Username,payment_ID,nameOnCard,email,amount,cardNo})
        try {
            await Paymentdetails.save();
       
        } catch (error) {
            res.status(400).json({message: error.message});
        }
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




