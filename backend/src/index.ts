import { initializeApp } from "firebase-admin/app";
initializeApp({
  storageBucket: "statistical-analyzer-cs499.appspot.com",
  projectId: "statistical-analyzer-cs499",
});
import app from "./app";

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log("SERVER STARTED");
});
