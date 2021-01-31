var addEventListeners = () => {
  $('form').on('submit', function (event) {
    event.preventDefault();

    const stringifiedHTML = document.getElementsByTagName('form')[0].outerHTML;
    var userInput = document.getElementById('csvTextArea').value;

    var passedInData = {};
    passedInData.csvTextArea = userInput;
    passedInData.originalForm = stringifiedHTML;
    passedInData = JSON.stringify(passedInData);

    $.ajax({
      type: 'POST',
      data: passedInData,
      url: 'http://127.0.0.1:4000',
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        theBody = document.getElementById('body');
        theBody.outerHTML = data;
        theBody.onload();
        // console.log(data);
      },
      error: (error) => {
        console.log('error');
      }
    });
  })

  $('a').on('click', (event) => {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:4000/downloadFile/',
      success: ((data) => {
        // https://www.aspsnippets.com/Articles/Download-File-as-BLOB-using-AJAX-and-jQuery.aspx
        var blob = new Blob([data], {type: "application/octetstream"});
        var isIE = false || !!document.documentMode;
        if (isIE) {
          window.navigator.msSaveBlob(blob, 'text.txt');
        } else {
          var url = window.URL || window.webkitURL;
          link = url.createObjectURL(blob);
          var a = $("<a/>");
          a.attr("download", 'text.txt');
          a.attr("href", link);
          $("body").append(a);
          a[0].click();
          $("body").remove(a);
      }
      })
    });
  })

  const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", handleFiles, false);

function handleFiles(e) {
  var fr = new FileReader();
  fr.onload = function () {
    document.getElementById('csvTextArea').value = fr.result;
    $('#submit-form').trigger('submit');
  }

  fr.readAsText(this.files[0]);
}
}

