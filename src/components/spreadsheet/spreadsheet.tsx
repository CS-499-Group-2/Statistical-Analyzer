import { useState } from "react";
import * as React from "react";
import Handsontable from "handsontable";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
registerAllModules();
export const Spreadsheet = () => {
  

  return (
    
    <div>
      <HotTable
        data={[
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""]
        ]}
        rowHeaders={true}
        colHeaders={true}
        contextMenu={["row_above", "row_below", "remove_row" , "col_left", "col_right", "remove_col"]}
        height="auto"
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      />
    </div>);
};