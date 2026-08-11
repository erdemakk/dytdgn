import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

const client = new MongoClient(MONGODB_URI);

export const clientPromise = client.connect();
export const db = client.db("dytdgn");