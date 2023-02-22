export function csvToArray(data, delimiter = ",") {
     
 
  const titles = data.slice(0, data
    .indexOf("\n")).split(delimiter);
     
  const titleValues = data.slice(data
    .indexOf("\n") + 1).split("\n");
     
  const ansArray = titleValues.map(function (v) {
     
    const values = v.split(delimiter);
    const storeKeyValue = titles.reduce(
      function (obj, title, index) {
        obj[title] = values[index];
        return obj;
      }, {});
     
    return storeKeyValue;
  });
     
  return ansArray;
}