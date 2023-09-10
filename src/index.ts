import express from "express";
import "#core/load-env.js";
import {createRestApiServer, connectToDBServer, db} from '#core/servers/index.js';
import path from "path";
import url from "url";
import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from "#common/middlewares/index.js";
import { envConstants } from "#core/constants/index.js";
import { booksApi } from "#pods/book/index.js";
//  npm install mongodb --save

const restApiServer = createRestApiServer();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
restApiServer.use("/", express.static(staticFilesPath));

restApiServer.use(logRequestMiddleware);

restApiServer.use("/api/books", booksApi);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(envConstants.PORT, async () => {
  if(envConstants.isApiMock) {
    console.log("Running API mock")
  }else{
    await connectToDBServer(envConstants.MONGODB_URI);
    // await db.collection('books').insertOne({name: "Book 1"});
    const books = await db.collection('books').find().toArray();
    console.log({books});
  };
  console.log(`Server ready at port ${envConstants.PORT}`);
});