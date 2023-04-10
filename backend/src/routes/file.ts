import express from "express";
import { Result } from "statistical-analyzer/src/stats/operation";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { auth, firestore } from "firebase-admin";
import Timestamp = firestore.Timestamp;

const router = express.Router();
const db = getFirestore();
const storage = getStorage();

interface AddFileBody {
  results: Result[];
  fileContent: string;
}

interface FileDocument {
  lastModified: Date;
  results: string;
}

router.use("/users/:userId", async (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    next();
    return;
  }
  const { userId } = req.params;
  const authorization = req.headers.authorization?.split("Bearer ")[1];
  if (!authorization) {
    res.status(401).send("Unauthorized");
    return;
  }
  const user = await auth().verifyIdToken(authorization);
  if (user.uid !== userId) {
    res.status(403).send("Forbidden");
    return;
  }
  next();
});

router.put("/users/:userId/files/:filename", async (req, res) => {
  console.log("Reached");
  const { userId, filename } = req.params;
  const { results, fileContent } = req.body as AddFileBody;

  if (!userId || !filename || !results || !fileContent) {
    res.status(400).send("Invalid request. Body: " + JSON.stringify(req.body));
    return;
  }
  const userFilesCollection = db.collection(`users/${userId}/files`);
  const totalFiles = (await userFilesCollection.count().get()).data().count;
  if (totalFiles >= 5) {
    res.status(409).send("You have reached the maximum number of files");
    return;
  }
  const fileRef = userFilesCollection.doc(filename);
  await storage.bucket().file(`users/${userId}/${filename}`).save(fileContent);
  const fileData = {
    lastModified: new Date(),
    results: JSON.stringify(results)
  };
  await fileRef.set(fileData);
  res.status(201).send("File added");
});

router.get("/users/:userId/files/:filename", async (req, res) => {
  const { userId, filename } = req.params;
  const fileRef = db.doc(`users/${userId}/files/${filename}`);
  const fileData = (await fileRef.get()).data() as FileDocument;
  if (!fileData) {
    res.status(404).send("File not found");
    return;
  }
  res.status(200).send({filename, data: fileData});
});

router.delete("/users/:userId/files/:filename", async (req, res) => {
  const { userId, filename } = req.params;
  const fileRef = db.doc(`users/${userId}/files/${filename}`);
  const fileData = (await fileRef.get()).data();
  if (!fileData) {
    res.status(404).send("File not found");
    return;
  }
  await fileRef.delete();
  await storage.bucket().file(`users/${userId}/${filename}`).delete();
  res.status(200).send("File deleted");
});

router.get("/users/:userId/files", async (req, res) => {
  const { userId } = req.params;
  const userFilesCollection = db.collection(`users/${userId}/files`).orderBy("lastModified", "desc");
  const files = (await userFilesCollection.get()).docs.map(doc => {
    let data = doc.data() as FileDocument;
    data = {
      ...data,
      lastModified: (data.lastModified as unknown as Timestamp).toDate() // We actually get the last modified date as a Timestamp
    };
    return ({ filename: doc.id, data });
  });
  res.status(200).send(files);
});

export default router;