/**
 * The list of operations that can be performed
 */
export type Operation = typeof operations[number];

// See https://stackoverflow.com/questions/43067354/how-to-iterate-a-string-literal-type-in-typescript for more info on what I've done here
export const operations = ["Mean", "Median", "Mode", "Standard Deviation", "Variance", "Coefficient of Variance", "Percentiles", "Probability Distribution", "Binomial Distribution", "Least Square Line", "Chi Square", "Correlation Coefficient", "Sign Test", "Rank Sum Test"] as const;
