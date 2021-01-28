var addEventListeners = () => {
  submitForm = document.getElementById('submit-form');
  submitForm.action ='http://localhost:3000';
  submitForm.method = 'POST';
  submitForm.addEventListener('submit', function(event) {
    // event.preventDefault();
    handleSubmit();
  });
}

var handleSubmit = () => {

}