import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please define MONGODB_URI in .env.local");

// reuse one client across hot reloads in dev
const g = globalThis as unknown as { _mongoClient?: MongoClient };
export const client = g._mongoClient ?? (g._mongoClient = new MongoClient(uri));
export const db = client.db(); // database name comes from the URI (e.g. .../bazardor)
