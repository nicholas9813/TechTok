const mongoose = require("mongoose");


const validateEmail = function(email){
  var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email)
}

//minimo 8 caratteri, almeno 1 lettera e un numero
const validatePassword = function(password){
  var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regexPassword.test(password)
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, validate:[validateEmail, 'ValidationError']},
    password: { type: String, required: true, validate:[validatePassword, 'ValidationError'] },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);