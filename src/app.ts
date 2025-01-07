import express, { NextFunction, Request, Response } from 'express'
import cors from "cors"
import { port } from './config/secret'
import router from './app/route/route'
import GlobalErrorHandler from './app/middleware/globalErrorHandler'
import NodeCache from 'node-cache'
import { MongoClient } from 'mongodb'

// import { Prisma } from '@prisma/client'
export const myCache = new NodeCache({ stdTTL: 180 })
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({ message: "Welcome to the server!" })
})

async function connectToMongoDB() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    await new MongoClient(databaseUrl).connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}
connectToMongoDB();



app.use("/api/v1", router)

app.use(GlobalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app