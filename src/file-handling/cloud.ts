import { getStorage, ref, uploadString, deleteObject } from "firebase/storage";
import useCloudStore from "../stores/cloud-store";
import { CsvData } from "./import";
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
        "Content-Type": "application/json"
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
      activeFile,
      userId: currentUser.uid,
      results
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
};
