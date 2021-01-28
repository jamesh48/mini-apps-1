var stringifyHTML = () => {
 let stringifiedHTML = document.getElementsByTagName('html')[0].innerHTML;
// var stringifiedHTML = document.getElementById('submit-form').innerHTML;
 document.getElementById('hiddenHTML').innerHTML = stringifiedHTML;
}
// module.exports = stringifyHTML;
// export default stringifyHTML;
