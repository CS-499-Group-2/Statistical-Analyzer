import { deleteObject, getStorage, ref, uploadString, getBlob } from "firebase/storage";
import useCloudStore from "../stores/cloud-store";
import { CsvData, csvToArray } from "./import";
import { Result } from "../stats/operation";
import { csvToString } from "./data-export";
import ky, { HTTPError } from "ky";

/**
 * Saves the spreadsheet to the user's cloud storage and adds the file to the database
 * @param spreadsheet The spreadsheet to save
 * @param results The results of the spreadsheet
 */
export const saveToStorage = async (spreadsheet: CsvData, results: Result[]) => {
  const currentUser = useCloudStore.getState().user;
  const storage = getStorage();
  const filename = prompt("Enter a name for your file (only letters, numbers and underscores)");
  if (!filename) {
    return;
  }
  if (filename === "" || !/^\w+$/.test(filename)) {
    alert("Invalid filename");
    return;
  }
  const storageRef = ref(storage, `users/${currentUser.uid}/${filename}`);
  const csvString = csvToString(spreadsheet);
  await uploadString(storageRef, csvString);
  try {
    await ky.post("https://us-central1-statistical-analyzer-cs499.cloudfunctions.net/addFile", { // URL of the cloud function
      json: {
        filename,
        userId: currentUser.uid,
        results
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + await currentUser.getIdToken()
      },
    });
    useCloudStore.getState().setActiveFile(filename);
    alert("File Saved! Autosave is now enabled.");
  } catch (e: unknown) {
    if (e instanceof HTTPError) {
      console.error(e.response.status);
      console.error(e);
      return;
    }
    console.error(e);
    await deleteObject(storageRef);
    alert("Failed to save file");
    return;
  }
};

/**
 * Autosaves whatever the user is currently working on
 * @param spreadsheet The spreadsheet to save
 * @param results The results of the spreadsheet
 */
export const autoSave = async (spreadsheet: CsvData, results: Result[]) => {
  const currentUser = useCloudStore.getState().user;
  const activeFile = useCloudStore.getState().activeFile;
  if (!activeFile || !currentUser) {
    return;
  }
  const storage = getStorage();
  const storageRef = ref(storage, `users/${currentUser.uid}/${activeFile}`);
  const csvString = csvToString(spreadsheet);
  await uploadString(storageRef, csvString);
  await ky.post("https://us-central1-statistical-analyzer-cs499.cloudfunctions.net/addFile", { // URL of the cloud function
    json: {
      filename: activeFile,
      userId: currentUser.uid,
      results
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await currentUser.getIdToken()
    }
  });
};

/**
 * Gets the files from the user's cloud storage
 */
export const getFiles = async (): Promise<string[]> => {
  const currentUser = useCloudStore.getState().user;
  if (!currentUser) {
    return [];
  }
  const response = await ky.post("https://us-central1-statistical-analyzer-cs499.cloudfunctions.net/getFiles", {
    json: {
      userId: currentUser.uid
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await currentUser.getIdToken()
    }
  }).json<{files: string[]}>();
  return response.files;
};

export const getFile = async (filename: string): Promise<{data: CsvData, results: Result[]}> => {
  const currentUser = useCloudStore.getState().user;
  if (!currentUser) {
    throw new Error("Not logged in");
  }
  const resultsResponse = await ky.post("https://us-central1-statistical-analyzer-cs499.cloudfunctions.net/getFile", {
    json: {
      userId: currentUser.uid,
      filename
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await currentUser.getIdToken()
    }
  }).json<{results: Result[]}>();
  const fileRef = ref(getStorage(), `users/${currentUser.uid}/${filename}`);
  const fileBlob = await getBlob(fileRef);
  const fileText = await fileBlob.text();
  const data = csvToArray(fileText);
  return { data, results: resultsResponse.results };
};

export const deleteFile = async (filename: string) => {
  const currentUser = useCloudStore.getState().user;
  if (!currentUser) {
    throw new Error("Not logged in");
  }
  await ky.post("https://us-central1-statistical-analyzer-cs499.cloudfunctions.net/deleteFile", {
    json: {
      userId: currentUser.uid,
      filename
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + await currentUser.getIdToken()
    }
  });
  const fileRef = ref(getStorage(), `users/${currentUser.uid}/${filename}`);
  await deleteObject(fileRef);
};
