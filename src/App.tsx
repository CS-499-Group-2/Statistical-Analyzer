/**
@project	Statistical-Analyzer
@author		Henry Schulz
@class		CS 499-01
@teacher	Adam Colwell
@term			Spring 2023
@date			02/17/2023
@purpose	.
*/

/**
Description.
@author									Henry Schulz
@param variable					Description of parameter.
@return									Description of what is returned.
@precondition						Description of the program's requirements.
@postcondition					Description of what must be true after a successful run.
@exception errorMessage	Description what can cause an error.
@see										What the user sees in the screen.
*/

import { useState } from "react";
import "./App.css";
import React from "react";
import { NavBar } from "./components/nav-bar/nav-bar";

const data = null;

/**
This function calculates the mean of the given data and returns the answer as a 
string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcMean(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the median of the given data and returns the answer as 
a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcMedian(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the mode of the given data and returns the answer as a 
string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcMode(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the standard deviation of the given data and returns 
the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcStanDevi(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the variance of the given data and returns the answer 
as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcVariance(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the coefficient of variance of the given data and 
returns the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcCoeffVaria(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the percentiles of the given data and returns the 
answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcPercentile(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the probability distribution of the given data and 
returns the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcProbDist(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the binomial distribution of the given data and 
returns the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcBinDist(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the least square line of the given data and returns 
the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcLeastSqu(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the chi square of the given data and returns the 
answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcChiSqu(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the correlation coefficient of the given data and 
returns the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcCorreCoef(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the sign test of the given data and returns the answer 
as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcSign(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the rank sum test of the given data and returns the 
answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcRankSum(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This function calculates the spearman rank correlation coefficient  of the 
given data and returns the answer as a string.
@author									Henry Schulz
@param data							Data to be analyzed.
@return									A string of the number that was calculated.
@precondition						data has the correct size and number of items.
*/
function calcSpearCorre(data) {
  let i: number;

  i = 0;
  if (data) {
    i = 1;
  }
  ++i;

  return i.toString();
}

/**
This list saves each operation name, if it was selected, and its function. The 
list is used to check what operations must be done and what functions to call.
Based on https://beta.reactjs.org/learn
@author									Henry Schulz
*/
const operations = [
  {name: "Mean", on: true, function: calcMean},
  {name: "Median", on: false, function: calcMedian},
  {name: "Mode", on: false, function: calcMode},
  {name: "Standard deviation", on: false, function: calcStanDevi},
  {name: "Variance", on: false, function: calcVariance},
  {name: "Coefficient of variance", on: true, function: calcCoeffVaria},
  {name: "Percentiles", on: false, function: calcPercentile},
  {name: "Probability distribution", on: false, function: calcProbDist},
  {name: "Binomial distribution", on: false, function: calcBinDist},
  {name: "Least square line", on: true, function: calcLeastSqu},
  {name: "Chi square", on: false, function: calcChiSqu},
  {name: "Correlation coefficient", on: false, function: calcCorreCoef},
  {name: "Sign test", on: true, function: calcSign},
  {name: "Rank sum test", on: false, function: calcRankSum},
  {name: "Spearman rank correlation coefficient", on: true, function: calcSpearCorre},
];

/**
This function checks each operation that has to be made, and calls their 
respective functions to save their result on a string.
Based on https://codesource.io/how-to-use-foreach-loop-in-react/
@author									Henry Schulz
@param data							Data to be analyzed.
@return									Text of each operation made and its result.
@precondition						data has the correct size and number of items.
*/
function buttonCalculateAll(data) {
  let calculated: string;
  calculated = "";

  operations.forEach((entry) => {
    if (entry.on == true) {
      calculated = calculated + entry.name + ": " + entry.function(data) + "\n";
    }
  });

  return calculated;
}

function App() {
  /* Used for the results text box */
  const [textBox, setTextBox] = useState("Initial text");
  
  /**
  This function erases the previous text in the text box, and adds new content.
  Based on https://beta.reactjs.org/reference/react-dom/components/textarea#controlling-a-text-area-with-a-state-variable
  @author									Henry Schulz
  @param words						string of new text to be added.
  @precondition						setTextBox exists.
  @postcondition					Text box has been changed.
  @see										Text box has been changed.
  */
  function setText(words: string) {
    setTextBox(words);
  }

  /**
  This function appends new text to the text box.
  Based on https://beta.reactjs.org/reference/react-dom/components/textarea#controlling-a-text-area-with-a-state-variable
  @author									Henry Schulz
  @param words						string of new text to be added.
  @precondition						setTextBox and textBox exists.
  @postcondition					Text box has been changed.
  @see										Text box has new lines added at the end.
  */
  function appendText(words: string) {
    setTextBox(textBox + " " + words);
  }

  return (
    <div className="App">
      <NavBar />
      
      <div className="card">
        <button onClick = {
          () => setText(buttonCalculateAll(data))
        }> Calculate </button>

        <textarea
          readOnly={true}
          value = {textBox}
          onChange = {e => setTextBox(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
