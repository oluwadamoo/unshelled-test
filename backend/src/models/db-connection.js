import { MongoClient } from "mongodb";

export let database;
export let Order;
export let Seller;
export const run = async (mongoUri) => {
  const client = new MongoClient(mongoUri);

  try {
    database = client.db("test");
    Order = database.collection("order_items");
    Seller = database.collection("sellers");

    console.log("connected to mongodb");
  } finally {
    // await client.close();
  }
};
