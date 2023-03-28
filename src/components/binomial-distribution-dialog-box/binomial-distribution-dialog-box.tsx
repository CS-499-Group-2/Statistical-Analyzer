import React from "react";
import { Dialog } from "@mui/material";
import {DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import {height} from "@mui/system";


export interface BinomialDistributionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (results: number[]) => void;
}



export const BinomialDistributionDialogBox = (props: BinomialDistributionProps) => {
 

  const handleSubmit = () => {
    // Calculate the binomial distribution

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
          <input type="number" />
        </div>
        <div>
          <label>Probability of Success</label>
          <input type="number" />
        </div>
      </DialogContent>

      <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
      </DialogActions>
    </Dialog>
  );
};
    

