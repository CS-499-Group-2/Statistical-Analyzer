import { Request , Response } from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import { Result } from "../../src/stats/operation";

interface RequestBody {
  results: Result[];
  filename: string;
  userId: string;
}

interface FileDocument {
  lastModified: Date;
  results: string;
}

const db = getFirestore();

/**
 * This is a cloud function that adds a file to the database. It also checks to make sure that the user has not reached the maximum number
 * of files.
 */
const addFileEndpoint = async (request: Request, response: Response) => {
  const { filename, userId, results } = JSON.parse(request.body) as RequestBody;
  if (!filename || !userId || !results) {
    response.status(400).send("Invalid request. Body: " + JSON.stringify(request.body));
    return;
  }
  const userFilesCollection = db.collection(`users/${userId}/files`);
  const totalFiles = (await userFilesCollection.count().get()).data().count;
  if (totalFiles >= 5) {
    response.status(409).send("You have reached the maximum number of files");
    return;
  }
  const fileRef = userFilesCollection.doc(filename);

  const fileData: FileDocument = {
    lastModified: new Date(),
    results: JSON.stringify(results)
  };
  await fileRef.set(fileData);
  response.status(200).send("File added");
};

export default addFileEndpoint;