const express = require('express')
const router = express.Router()

const {getAllProducts, getProductsStatic} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getProductsStatic)

module.exports = router