const Product = require('../models/product')

const getProductsStatic = async (req, res) => {
    //throw new Error('testing errors')
    const products = await Product.find({}).select('name price').limit(5)
    res.status(200).json({nbHits: products.length, msg: products})
}

const getAllProducts = async (req, res) => {
    const { name, featured, sort, fields, numericFilters } = req.query
    const queryObject = {}

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if(numericFilters) {
        const operatorMap = {
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
            '>=': '$gte',
            '>': '$gt'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if(options.includes(field)) {
                queryObject[field] = {[operator] : Number(value)}
            }
        });
    }

    console.log(queryObject)
    
    let result = Product.find(queryObject)

    if(sort) {
        sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)
    console.log(req.query)
    const products = await result
    res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
    getProductsStatic,
    getAllProducts
}