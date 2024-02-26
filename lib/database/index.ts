import mongoose from 'mongoose';

const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if(!NEXT_PUBLIC_MONGODB_URI) throw new Error('NEXT_PUBLIC_MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(NEXT_PUBLIC_MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  return cached.conn;
}