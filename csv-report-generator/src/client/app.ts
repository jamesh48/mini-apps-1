var addEventListeners = () => {
  $("form").on("submit", function (event) {
    event.preventDefault();

    const stringifiedHTML = document.getElementsByTagName("form")[0].outerHTML;
    var userInput = (document.getElementById("csvTextArea") as HTMLTextAreaElement).value;

    var passedInData = { csvTextArea: "", originalForm: "" };
    passedInData.csvTextArea = userInput;
    passedInData.originalForm = stringifiedHTML;
    var dataToSubmit = JSON.stringify(passedInData);

    $.ajax({
      type: "POST",
      data: dataToSubmit,
      url: "http://127.0.0.1:4000",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: (data) => {
        var theBody = document.getElementsByTagName("body")[0] as HTMLBodyElement;
        if (theBody && theBody.onload) {
          theBody.outerHTML = data;
          theBody.onload(new Event("click"));
        }
        // console.log(data);
      },
      error: (_error: any) => {
        console.log("error");
      }
    });
  });

  $("a").on("click", (event) => {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:4000/downloadFile/",
      success: (data) => {
        // https://www.aspsnippets.com/Articles/Download-File-as-BLOB-using-AJAX-and-jQuery.aspx
        var blob = new Blob([data], { type: "application/octetstream" });
        // @ts-ignore
        var isIE = false || !!document.documentMode;
        if (isIE) {
          // @ts-ignore
          window.navigator.msSaveBlob(blob, "text.txt");
        } else {
          var url = window.URL || window.webkitURL;
          const link = url.createObjectURL(blob);
          var a = $("<a/>");
          a.attr("download", "text.txt");
          a.attr("href", link);
          $("body").append(a);
          a[0].click();
          // @ts-ignore
          $("body").remove(a);
        }
      }
    });
  });

  const inputElement = document.getElementById("input");
  inputElement?.addEventListener("change", handleFiles, false);

  function handleFiles() {
    var fr = new FileReader();
    fr.onload = function () {
      // @ts-ignore
      (document.getElementById("csvTextArea") as HTMLTextAreaElement).value = fr.result;
      $("#submit-form").trigger("submit");
    };

    // @ts-ignore
    fr.readAsText(this.files[0]);
  }
};
