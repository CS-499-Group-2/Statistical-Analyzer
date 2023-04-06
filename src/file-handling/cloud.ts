import { getStorage, ref, uploadString, deleteObject } from "firebase/storage";
import useUserStore from "../stores/user-store";
import { CsvData } from "./import";
import { Result } from "../stats/operation";
import { csvToString } from "./data-export";
import ky, { HTTPError } from "ky";

export const saveToStorage = async (spreadsheet: CsvData, results: Result[]) => {
  const currentUser = useUserStore.getState().user;
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
    await ky.post("http://127.0.0.1:5001/statistical-analyzer-cs499/us-central1/addFile", { // URL of the cloud function
      json: {
        filename,
        userId: currentUser.uid,
        results
      },
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors"
    });
    alert("File Saved! Autosave is now enabled.");
  } catch (e: unknown) {
    if (e instanceof HTTPError) {
      console.error(await e.response.text());
      return;
    }
    console.error(e);
    await deleteObject(storageRef);
    alert("Failed to save file");
    return;
  }
};