const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const bankRoute = require("./routes/bank")
const cors = require("cors")
dotenv.config();



mongoose.connect(
    //MONGO_URL contiene la stringa di accesso al db che proteggiamo con la libreria dotenv
    process.env.MONGO_URL)
    .then(()=> console.log("dbConnection Successfull!"))
    .catch((err)=> {
    console.log(err)
});

app.use(cors())
app.options('*', cors());  // enable pre-flight
app.use(express.json())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/bank", bankRoute);


var PORT = process.env.PORT || 3002;
app.listen(PORT,  () => {
    console.log("backend is running")
    console.log(`Server listening at http://localhost:${PORT}`)
});
