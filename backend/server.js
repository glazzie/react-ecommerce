/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './models/routers/productRouter.js'
import userRouter from './models/routers/userRouter.js'
import orderRouter from './models/routers/orderRouter.js'
import path from 'path'
import uploadRouter from './models/routers/uploadRouter.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/reactecom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '')
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('server is ready')
})
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
})