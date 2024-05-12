import mongoose from "mongoose"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
 
let client
let clientPromise: Promise<typeof mongoose>
 
if (process.env.NODE_ENV === "development") {
  let globalWithMongoose = global as typeof globalThis & {
    _mongooseClientPromise?: Promise<typeof mongoose>
  }
 
  if (!globalWithMongoose._mongooseClientPromise) {
    client = mongoose.connect(uri)
    globalWithMongoose._mongooseClientPromise = client
  }
  clientPromise = globalWithMongoose._mongooseClientPromise
} else {
  client = mongoose.connect(uri)
  clientPromise = client
}

export default clientPromise
