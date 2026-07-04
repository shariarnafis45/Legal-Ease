import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const Uri = process.env.MONGODB_URI;

const client = new MongoClient(Uri);
const db = client.db("legalEaseDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      userType: {
        type: "string",
      },
    },
  },
});
