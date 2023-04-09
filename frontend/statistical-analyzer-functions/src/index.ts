import * as functions from "firebase-functions";
import setup from "./setup";
import * as cors from "cors";
import addFileEndpoint from "./add-file-endpoint";
import { auth } from "firebase-admin";
import { Request } from "firebase-functions";
import getFilesEndpoint from "./get-files-endpoint";
import getFileEndpoint from "./get-file-endpoint";
import deleteFileEndpoint from "./delete-file-endpoint";

setup();

export const verifyToken = async (request: Request, neededUser?: string) => {
  const authorization = request.get("Authorization");
  const tokenId = authorization?.split("Bearer ")[1];
  if (!tokenId) {
    return false;
  }
  try {
    const authResult = await auth().verifyIdToken(tokenId);
    if (neededUser && authResult.uid !== neededUser) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Bernard!");
});

export const addFile = functions.https.onRequest((request, response) => {
  // We have to use cors for some reason, idk it's the only way I could get it to work
  return cors()(request, response, () => {
    return addFileEndpoint(request, response);
  });
});

export const getFiles = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    return getFilesEndpoint(request, response);
  });
});

export const getFile = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    return getFileEndpoint(request, response);
  });
});

export const deleteFile = functions.https.onRequest((request, response) => {
  return cors()(request, response, () => {
    return deleteFileEndpoint(request, response);
  });
});
