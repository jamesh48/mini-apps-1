var stringifyHTML = () => {
 let stringifiedHTML = document.getElementsByTagName('html')[0].innerHTML;
 document.getElementById('test').innerHTML = stringifiedHTML;
}
// module.exports = stringifyHTML;
// export default stringifyHTML;
