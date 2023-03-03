import { useState } from "react";
import * as React from "react";
import Handsontable from "handsontable";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import "./spreadsheet.css";

registerAllModules();
export const Spreadsheet = () => {
  

  return (
    
    <div className="sheet">
      <HotTable
        data={[
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""]
        ]}
        rowHeaders={true}
        colHeaders={true}
        width="100%"
        height="100%"
        rowHeights={23}
        colWidths={100}
        contextMenu={["row_above", "row_below", "remove_row" , "col_left", "col_right", "remove_col"]}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      />
    </div>);
};