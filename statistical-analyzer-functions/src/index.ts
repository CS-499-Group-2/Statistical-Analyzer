import * as functions from "firebase-functions";
import setup from "./setup";
import addFileEndpoint from "./add-file-endpoint";

setup();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Bernard!");
});

export const addFile = functions.https.onRequest(addFileEndpoint);

