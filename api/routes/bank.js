const { default: mongoose } = require("mongoose");
const Card = require("../models/Bank");
const router = require("express").Router();
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
var ObjectId = mongoose.Types.ObjectId;

router.post("/addCard", verifyTokenAndAdmin, async (req, res) => {
    const card = new Card(req.body);
    try {
      const savedCard = await card.save();
      res.status(200).send("Carta inserita");
    } catch (err) {
      res.status(485).send("Errore");
    }
  });

//PAGAMENTO
router.post("/payment", verifyToken, async (req, res) => {
  
  const { CVV, cardNumber, payment } = req.body;
  const carta = await Card.findOne({ CVV, cardNumber });

  if (!carta) {
    return res.status(400).send("Carta di credito non trovata");
  }

  if (carta.balance < payment) {
    return res.status(507).send("fondi insufficenti");
  }

  const updatedCarta = await Card.findOneAndUpdate(
    { CVV, cardNumber },
    { $inc: { balance: -payment } },
    { returnOriginal: false }
  );


  res.send({ message: 'Pagamento effettuato con successo', carta: updatedCarta.value });
});


//GET ALL CARDS
router.get("/", async (req, res) => {
  try {
    let cards; 
    cards = await Card.find();
    res.status(200).json(cards);
 } catch (err) {
    res.status(500).json(err);
 }
});

module.exports = router