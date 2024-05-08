const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
const cookieParser = require('cookie-parser');

// Database connection
const connectDB = require('./config/db')
connectDB()

// configuration
const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(helmet())
app.use(morgan('common'))
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const userRouter = require('./routes/userRoute')
const customerRouter = require('./routes/customerRoute')
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/orderRoute')
const teamRouter = require('./routes/teamRoute')

app.use('/api/v1/user', userRouter)
app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/team', teamRouter)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
})

