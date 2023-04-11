import { Operation, Result } from "../operation";
import { calculateBinomialDistribution } from "../calculations";


//Defining the inputs
interface Inputs {
    "Number of Trials": number;
    "Probability": number;
}

export const BinomialDistribution: Operation<Inputs> = {
  name: "Binomial Distribution",
  type: "Typed",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => { 
    const numberOfTrials = inputs["Number of Trials"] as number;
    const probability = inputs["Probability"] as number;

    //Validation
    if (numberOfTrials < 0) {
      alert("Please enter a positive number of trials.");
      return [];
    }
    if (probability < 0 || probability > 1) {
      alert("Please enter a probability between 0 and 1.");
      return [];
    }

    //Calculate the binomial distribution
    const binomialDistribution = calculateBinomialDistribution(numberOfTrials, probability);

    //Return the result
    return [{
      name: "Binomial Distribution",
      values: binomialDistribution,
      graphs: [{
        chartType: "Horizontal Bar",
        data: binomialDistribution.map((value) => {
          return {
            value: value,
            label: value.toString(),
          };
        }),
      }],
    }];
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys: {
    "Number of Trials": "Number",
    "Probability": "Number",
        
  }


};