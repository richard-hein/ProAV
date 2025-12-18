// dependecies imports
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import path from 'path';

// local imports 
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import ordrRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config()

connectDB()

// Init express
const app = express()


// For passing req body data -> body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Cookie parser middleware -> it allows us to get access req.cookie
app.use(cookieParser())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', ordrRoutes)
app.use('/api/uploads', uploadRoutes)

// Pyapal config
app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

if (process.env.NODE_ENV === 'production') {
  // set static folder
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any route that is not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}



// give access to read uploads file
const __dirname = path.resolve();  //Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// error middlewore funcs
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in  ${PORT}`.yellow.bold
  )
)
