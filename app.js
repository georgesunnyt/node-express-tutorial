require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

const port = process.env.PORT || 3334

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)

const start = async () => {
    try {
        const connectionString =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1gqps1n.mongodb.net/Cluster0?retryWrites=true&w=majority`
        await connectDB(connectionString)
        app.listen(port, () => {
            console.log(`app is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
