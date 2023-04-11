import { getBlob, getStorage, ref } from "firebase/storage";
import useCloudStore from "../stores/cloud-store";
import { CsvData, csvToArray } from "./import";
import { Result } from "../stats/operation";
import { csvToString } from "./data-export";
import ky, { HTTPError } from "ky";

const baseUrl = "https://backend-nncxuhwx6a-uc.a.run.app";
const apiInstance = ky.create({
  prefixUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const currentUser = useCloudStore.getState().user;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});

/**
 * Saves the spreadsheet to the user's cloud storage and adds the file to the database
 * @param spreadsheet The spreadsheet to save
 * @param results The results of the spreadsheet
 */
export const saveToStorage = async (spreadsheet: CsvData, results: Result[]) => {
  const currentUser = useCloudStore.getState().user;
  const filename = prompt("Enter a name for your file (only letters, numbers and underscores)");
  if (!filename) {
    return;
  }
  if (filename === "" || !/^\w+$/.test(filename)) {
    alert("Invalid filename");
    return;
  }
  const csvString = csvToString(spreadsheet);
  try {
    await apiInstance.put(`users/${currentUser.uid}/files/${filename}`, { // Path for the api
      json: {
        results,
        fileContent: csvString
      },
    });
    useCloudStore.getState().setActiveFile(filename);
    alert("File Saved! Autosave is now enabled.");
  } catch (e: unknown) {
    if (e instanceof HTTPError) {
      console.error(e.response.status);
      console.error(e);
      alert("Failed to save file");
      return;
    }
    console.error(e);
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
  const csvString = csvToString(spreadsheet);
  await apiInstance.put(`users/${currentUser.uid}/files/${activeFile}`, {
    json: {
      results,
      fileContent: csvString
    }
  });
};

export interface GetFileResponse {
  filename: string;
  data: {
    lastModified: string;
    results: Result[];
  }
}

/**
 * Gets the files from the user's cloud storage
 */
export const getFiles = async (): Promise<GetFileResponse[]> => {
  const currentUser = useCloudStore.getState().user;
  if (!currentUser) {
    return [];
  }
  return await apiInstance.get(`users/${currentUser.uid}/files`).json<GetFileResponse[]>();
};

export const getFile = async (filename: string): Promise<{data: CsvData, results: Result[]}> => {
  const currentUser = useCloudStore.getState().user;
  if (!currentUser) {
    throw new Error("Not logged in");
  }
  const resultsResponse = await apiInstance.get(`users/${currentUser.uid}/files/${filename}`).json<GetFileResponse>();
  const fileRef = ref(getStorage(), `users/${currentUser.uid}/${filename}`);
  const fileBlob = await getBlob(fileRef);
  const fileText = await fileBlob.text();
  const data = csvToArray(fileText);
  return { data, results: resultsResponse.data.results };
};

export const deleteFile = async (filename: string) => {
  const currentUser = useCloudStore.getState().user;
  if (!currentUser) {
    throw new Error("Not logged in");
  }
  await apiInstance.delete(`users/${currentUser.uid}/files/${filename}`);
};
