const router = require("express").Router();
const User = require("../models/User")
//per la criptazione della password usiamo AES da CryptoJS
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");


///REGISTRAZIONE

//async permette di non avere problemi con il .save()
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json("savedUser");
    } catch (err) {
        if (err._message == "User validation failed")
            res.status(507).send("inserimento errato")
        else
            res.status(500).send("Errore");
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        if (!user)
            return res.status(401).send("Username sbagliato")
        //decriptazione password

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if (Originalpassword != req.body.password)
            return res.status(401).send("Password Sbagliata");
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "350d" }
        );
        //permette di non poter visualizzare nemmeno la chiave generata dalla password
        const { password, ...others } = user._doc;
        return res.status(200).send({ logged: true, token: accessToken });
    } catch (err) {
        return res.status(500).send("Errore");
    }
});

module.exports = router;