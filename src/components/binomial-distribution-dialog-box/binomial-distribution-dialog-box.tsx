import React from "react";
import { Dialog } from "@mui/material";
import {DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import {height} from "@mui/system";
import { calculateBinomialDistribution } from "../../stats/calculations";


export interface BinomialDistributionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (results: number[]) => void;
}



export const BinomialDistributionDialogBox = (props: BinomialDistributionProps) => {
 

  const handleSubmit = () => {
    const trials = Number(document.getElementById("Number of Trials") as HTMLInputElement);
    const successes = Number(document.getElementById("Number of Sucesses") as HTMLInputElement);
    const results = calculateBinomialDistribution(trials, successes);
    console.log(results);

    props.onSubmit([ ]);
  };
  
  const handleClose = () => {
    props.onClose();
  };
 
  return (
    <Dialog open={props.open}>
      <DialogTitle>
            Please enter the number of trials as well as the probability of success for each trial.
      </DialogTitle>

      <DialogContent>
        <div>
          <label>Number of Trials</label>
          <input type="number" id = " Number of Trials" />
        </div>
        <div>
          <label>Probability of Success</label>
          <input type="number" id = "Number of Sucesses" />
        </div>
      </DialogContent>

      <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
      </DialogActions>
    </Dialog>
  );
};
    

