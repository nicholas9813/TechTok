const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();


//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS GROUPPED BY CATEGORY
router.get('/', (req, res) => {
  Product.aggregate([
    {
      $group: {
        _id: "$categoria",
        products: {
          $push: {
            id: "$_id",
            title: "$title",
            description: "$description",
            img: "$img",
            price: "$price",
            quantity: "$quantity"
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        products: 1
      }
    }
  ])
    .exec()
    .then(result => {
      res.json({message: 'Prodotti tornati', data: result});
    })
    .catch(err => {

      res.status(500).json({ error: err.message });
    });
});
module.exports = router