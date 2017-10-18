
const languages = {
        "португальский": "portuguese",
        "английский": "english"
    },
    getData = initData(), // return function 
    trans = $("#translation")[0];
// store data in local dictionary
getData();
function  getTargetLanguage(){
    return $("#chooseLanguage input:checked").val();
}