import {MongoClient, Db} from 'mongodb';

export let db: Db;

export const connectToDBServer = async (conncetionURI: string) => {

 const client = new MongoClient(conncetionURI);
 await client.connect();

 db = client.db();
};
