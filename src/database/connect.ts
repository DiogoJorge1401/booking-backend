import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string

mongoose.connection.on('disconnected', () => console.log("mongodb disconnected"))
mongoose.connection.on('connected', () => console.log("mongodb connected"))

;(async () => await mongoose.connect(MONGO_URI))()
