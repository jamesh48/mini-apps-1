module.exports.generateCSVReport = (json) => {
  console.log('csv report generating');
  var lineOne = Object.keys(json).join(', ');
  var resultStr = helperFunction(json, '').slice(0, -1);
  let result = `${lineOne} \n ${resultStr}`;
  return result;
}

var helperFunction = (json, resultStr) => {
  for (let key in json) {
    if (key !== 'children') {
      resultStr += json[key] +',';
    } else {
      if (json[key].length > 0) {
        json[key].forEach(person => {
          resultStr = helperFunction(person, resultStr += '\n');
        })
      }
      return resultStr;
    }
  }
}