import "./App.css";
import React, { useEffect, useMemo } from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Spreadsheet } from "./components/spreadsheet/spreadsheet";
import { Column, Operation, Result } from "./stats/operation";
import { CsvData } from "./file-handling/import";
import { ResultExporter } from "./components/result-exporter/result-exporter";
import { exportData } from "./file-handling/data-export";
import {
  Percentile,
  ProbabilityDistribution,
  LeastSquareLine,
  ChiSquare,
  Mean,
  Median,
  Mode,
  BinomialDistribution,
  StandardDeviation
} from "./stats";
import InputModal, { InputModalRef } from "./components/input-modal/input-modal";
import { GraphDisplay } from "./components/graph-display/graph-display";
import useCloudStore from "./stores/cloud-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { autoSave, deleteFile, getFile, saveToStorage } from "./file-handling/cloud";
import { FileList } from "./components/file-list/file-list";

/** List of all available operations */
const operations: Operation<unknown>[] = [
  Percentile,
  Mean,
  Median,
  Mode,
  BinomialDistribution,
  StandardDeviation,
  ProbabilityDistribution,
  LeastSquareLine,
  ChiSquare
];

function App() {
  // This is the source of truth for the data. We will try to pass this to all of the operations that need it.
  const [data, setData] = React.useState<CsvData>({data: [[10, 15], [1, 2], [5, 10]], headers: ["Column 1", "Column 2"]});
  const [selectedCells, setSelectedCells] = React.useState<Column[]>([]);
  const modalRef = React.useRef<InputModalRef>(null);
  const [results, setResults] = React.useState<Result[]>([]);
  const activeFile = useCloudStore(state => state.activeFile);
  const setActiveFile = useCloudStore(state => state.setActiveFile);
  const queryClient = useQueryClient();
  const { mutate: mutateActiveFile, isError, isLoading } = useMutation({
    mutationFn: () => autoSave(data, results),
  });
  const { mutate: deleteUserFile } = useMutation({
    mutationFn: (filename: string) => deleteFile(filename),
    onSettled: () => queryClient.invalidateQueries({
      queryKey: ["files"]
    }),
    onSuccess: (data, filename) => {
      if (activeFile === filename) {
        setActiveFile(undefined);
      }
      setFilesModalOpen(false);
    },
    onError: (error, filename) => {
      console.error(error);
      alert("Failed to delete file " + filename);
    }
  });
  const [filesModalOpen, setFilesModalOpen] = React.useState(false);

  // Autosave whenever the data or results change
  useEffect(() => {
    mutateActiveFile();
  }, [data, results]);

  /**
   * This function will return the current state of what the save button should display.
   */
  const figureOutSaveState = () => {
    if (!activeFile) {
      return undefined;
    }
    if (isLoading) {
      return "saving";
    }
    if (isError) {
      return "error";
    }
    return "saved";
  };

  /** This is a function that will return a list of all available operations that are valid for the selected cells
   * We use useMemo here to make sure that this function is only called when the selected cells change.
   * Remember that otherwise this function would be called every time the component renders, which would be very inefficient.
   */
  const availableOperations = useMemo(() => {
    return operations.filter(operation => operation.isValid(selectedCells));
  }, [selectedCells]);

  /**
   * Adds an operation to the list of selected operations
   * @param operation The operation to add to the list of selected operations
   */
  const onOperationSelected = (operation: Operation<Record<string, number>>) => {
    modalRef.current.open(operation, (values) => handleOperationComplete(operation.onSelected(selectedCells, data, values)));
  };

  const handleOperationComplete = (results: Result[]) => {
    setResults((previousResults) => [...previousResults, ...results]);
  };

  /**
   * Called whenever a cell in the spreadsheet changes. When this happens, we need to update the data in our state, since it doesn't automatically update.
   * @param row The row of the cell that changed
   * @param column The column of the cell that changed
   * @param value The new value of the cell
   */
  const onCellChange = (row: number, column: number, value: number) => {
    setData(previousData => {
      const newData = {...previousData}; // We need to clone the data, because we can't mutate the state directly
      if (newData.data[row] === undefined) { // If row doesn't exist, create a new row
        newData.data[row] = [];
      }
      newData.data[row][column] = value; // Update the value
      console.log("New data: ", newData);
      return newData;
    });
  };

  /**
   * Updates the header for the specified column
   * @param column The column of the header that changed
   * @param value The new value of the header
   */
  const onHeaderChange = (column: number, value: string) => {
    setData(previousData => {
      const newData = {...previousData}; // We need to clone the data, because we can't mutate the state directly
      newData.headers[column] = value; // Update the value
      console.log("New data: ", newData);
      return newData;
    });
  };

  const onFileOpen = (data: CsvData) => {
    setData(data);
  };

  const onCloudFileOpen = (filename: string) => {
    getFile(filename).then((data) => {
      setData(data.data);
      setResults(data.results);
      setActiveFile(filename);
    }).catch((e) => {
      console.error(e);
      alert("Failed to load file from cloud");
    }).finally(() => {
      setFilesModalOpen(false);
    });
  };

  const onCloudFileDelete = (filename: string) => {
    deleteUserFile(filename);
  };

  return (
    <div className="App">
      <NavBar
        availableOperations={availableOperations}
        onOperationSelected={onOperationSelected}
        onExport={() => exportData(data)}
        onFileImport={onFileOpen}
        onCloudExport={() => saveToStorage(data, results).catch((e) => {
          console.error(e);
          alert("Failed to save to cloud");
        })}
        savingState={figureOutSaveState()}
        onFilesModalOpen={() => setFilesModalOpen(true)}
      />
      <Spreadsheet
        data={data}
        onCellChange={onCellChange}
        onHeaderChange={onHeaderChange}
        onCellsSelected={setSelectedCells}
      />
      <div className = "popup" id = "popup">
        <ResultExporter
          results={results}
          onDelete={(idx) => setResults(results.filter(n => n !== results[idx]))}
        />
      </div>
      <GraphDisplay selectedGraphs={results.flatMap(result => result.graphs)} />
      <InputModal ref={modalRef} />
      <FileList
        open={filesModalOpen}
        onClose={() => setFilesModalOpen(false)}
        onSelected={onCloudFileOpen}
        onDeleted={onCloudFileDelete} />
    </div>
  );
}

export default App;
