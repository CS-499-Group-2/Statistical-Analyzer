import React from "react";
import { Dialog } from "@mui/material";
import {DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import {height} from "@mui/system";
import { calculateBinomialDistribution } from "../../stats/calculations";
import { useState } from "react";
import  Modal from "react-bootstrap/Modal";



export interface BinomialDistributionProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (results: number[]) => void;
}



export const BinomialDistributionDialogBox = (props: BinomialDistributionProps) => {
  const [trials, setTrials] = useState(0);
  const [probability, setProbability] = useState(0);


  const handleTrialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrials(Number(event.target.value));
  };

  const handleProbabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProbability(Number(event.target.value));
  };

  const handleSubmit = () => {
    console.log(trials, probability);
    const results = calculateBinomialDistribution(trials, probability);
    console.log(results);

    props.onSubmit([ ]);
  };
  
  const handleClose = () => {
    props.onClose();
  };
 
  return (
    <Modal show={props.open} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Binomial Distribution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="trials">Trials</label>
          <input type = "number" className="form-control" id="trials" onChange={handleTrialsChange} />
        </div>
        <div className="form-group">
          <label htmlFor="probability">Probability</label>
          <input type = "number" className="form-control" id="probability" onChange={handleProbabilityChange} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </Modal.Footer>

    </Modal>
  );
};
    

