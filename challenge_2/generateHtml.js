const generateCSVReport = require('./generateCSVReport').generateCSVReport;
const fs = require('fs');

module.exports.generateHTML = (req, callback) => {
  console.log(`generateHTML`);
  // console.log('here ' + JSON.parse(req.body));
  try {
    JSON.parse(req.body.csvTextArea);
  } catch (e) {
    var errorMessage = `Error: Input is not an object or is otherwise unparseable: `
    //Handles if the entry is not parseable;
    var responseHTML = `<div id=layout>`
    responseHTML += req.body['originalForm'];
    responseHTML += `<body id='body' onload=
     "
     addEventListeners();
     var csvTextArea = document.getElementById('csvTextArea');
     csvTextArea.style.backgroundColor = 'red';
     csvTextArea.style.textAlign = 'center';
    //  $('#csvTextArea').html(${`'<p></p>'`});
     csvTextArea.value = '${errorMessage}${e}';

     setTimeout(() => {
       csvTextArea.style = 'initial';
       csvTextArea.value = '';
     }, 3000)
     ">`
    responseHTML += `
      </div>
    <span>
      <a href=''>Download Latest CSV Report</a>
    </span>
  </body>`
    return responseHTML;
  }

  var json = JSON.parse(req.body.csvTextArea);

  var responseHTML = `<body id=body onload=
  "
  addEventListeners();
  var csvTextArea = document.getElementById('csvTextArea');

  document.querySelectorAll('.entry').forEach((entry) => {
    entry.style.backgroundColor = 'lightgreen';
    entry.style.color = 'green';
  });
  csvTextArea.style.textAlign = 'center';
  csvTextArea.innerHTML = 'submitted';

  setTimeout(() => {
    document.querySelectorAll('.entry').forEach((entry) => {
      entry.style = 'intial';
    });
    csvTextArea.style = 'initial';
    csvTextArea.innerHTML = '';
  }, 2500)
  ">`
  responseHTML += `<div id=layout>
                    <div id=json-report>`
  var stringifiedJSON = generateCSVReport(json);
  if (callback) {
    fs.writeFile('text.txt', stringifiedJSON, function (err) {
      if (err) {
        callback(err)
      }
      callback(null, 'passed')
    })
  }

  responseHTML += stringifiedJSON.split('\n').map((entry, index) => {
    entry = entry.split(',').map((item, titleIndex) => {
      return index === 0 ? `<h4>${item}</h4>` : `<p class=item-entries>${item}</p>`;
    }).join('');
    return index === 0 ? `<div class='title-entry'> ${entry}</div>` : `<div class='entry'>${entry}</div>`;
  }).join('');
  responseHTML += `</div>`
  responseHTML += req.body['originalForm'];
  responseHTML +=
    `</div>
    <span>
    <a href=''>Download Latest CSV Report</a>
    </span>
  </body>`
  return responseHTML;
}