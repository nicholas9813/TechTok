const mongoose = require("mongoose")

const validateCVV = function(CVV){
    var regex = /^[0-9]{3}$/;
    return regex.test(CVV)
}

const BankSchema = new mongoose.Schema(
    {
        cardNumber:{type: Number , required:true, unique:true},
        CVV:{type: Number, required:true, validate:[validateCVV, 'Sbagliato CVV']},
        Expire_date:{type: Date, required:true},
        balance:{type: Number, required:true}
    },
);

module.exports = mongoose.model("Bank", BankSchema)