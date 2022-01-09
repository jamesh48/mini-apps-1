type FamilyMember = {
  firstName: string;
  lastName: string;
  county: string;
  city: string;
  role: string;
  sales: number;
  children: FamilyMember[];
};

module.exports.generateCSVReport = (json: FamilyMember) => {
  console.log("csv report generating");
  var lineOne = Object.keys(json).slice(0, -1).join(", ");
  var resultStr = helperFunction(json, "")?.slice(0, -1);
  let result = `${lineOne} \n ${resultStr}`;
  return result;
};

// @ts-ignore (not all code paths return value)
const helperFunction = (json: FamilyMember, resultStr: string | undefined) => {
  for (let key in json) {
    if (key !== "children") {
      // @ts-ignore
      resultStr += json[key] + ",";
    } else {
      if (json[key].length > 0) {
        json[key].forEach((person) => {
          if (resultStr) {
            resultStr = resultStr.slice(0, -1);
            resultStr = helperFunction(person, (resultStr += "\n"));
          }
        });
      }
      return resultStr;
    }
  }
};
