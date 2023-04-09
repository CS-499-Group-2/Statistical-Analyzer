import { Request , Response } from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import { verifyToken } from "./index";

interface RequestBody {
  userId: string;
}

interface ResponseBody {
  files: string[];
}

const db = getFirestore();

/**
 * This is a cloud function that adds a file to the database. It also checks to make sure that the user has not reached the maximum number
 * of files.
 */
const getFilesEndpoint = async (request: Request, response: Response) => {
  const bodyString = JSON.stringify(request.body);
  const bodyObject = JSON.parse(bodyString);
  const { userId } = bodyObject as RequestBody;
  if (!userId) {
    response.status(400).send("Invalid request. Body: " + JSON.stringify(request.body));
    return;
  }
  if (!await verifyToken(request, userId)) {
    response.status(401).send("Unauthorized");
    return;
  }
  const userFilesCollection = db.collection(`users/${userId}/files`);
  const filesSnapshot = (await userFilesCollection.orderBy("lastModified").get());
  const files = filesSnapshot.docs.map(doc => doc.id);
  const responseBody: ResponseBody = {
    files
  }
  response.status(200).send(responseBody);
};

export default getFilesEndpoint;
