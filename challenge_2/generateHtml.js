const generateCSVReport = require('./generateCSVReport').generateCSVReport;

const cool = require('./generateCSVReport').success;

module.exports.generateHTML = (req) => {
  console.log(`generateHTML`);

  try {
    JSON.parse(req.body['csv-text-area']);
  } catch(e) {
    // console.log('error-> ' + req.body['original-form']);
     var responseHTML = `<link rel="stylesheet" type="text/css" href="css/styles.css"/>`;
     responseHTML += `<body>`
     responseHTML += `<div id=layout>`
     responseHTML += req.body['original-form'];
     responseHTML += `<body onload=
     "
     var csvTextArea = document.getElementById('csv-text-area');
     csvTextArea.style.backgroundColor = 'red';
     csvTextArea.style.textAlign = 'center';
     csvTextArea.innerHTML = 'error: ${e}' ;

     setTimeout(() => {
       csvTextArea.style = 'initial';
       csvTextArea.innerHTML = '';
     }, 2500)
     ">`
     responseHTML += `</body>`
     return responseHTML;
  }


  var json = JSON.parse(req.body['csv-text-area']);
  var responseHTML = `<link rel="stylesheet" type="text/css" href="css/styles.css" />`
  responseHTML += `<body id=layout onload=
  "
  var csvTextArea = document.getElementById('csv-text-area');

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
  }, 1000)
  ">`
  responseHTML += `<div id=layout>`
  responseHTML += `<div id=json-report>`
    responseHTML += generateCSVReport(json).split('\n').map((entry, index) => {
      entry = entry.split(',').map((item, titleIndex) => {
        return index === 0 ? `<h4>${item}</h4>` : `<p class=item-entries>${item}</p>`;
      }).join('');
      return index === 0 ? `<div class='title-entry'>${entry}</div>` : `<div class='entry'>${entry}</div>`;
    }).join('');
  responseHTML += `</div>`
  responseHTML += req.body['original-form'];
  responseHTML += `</div> </body>`
  return responseHTML;
}