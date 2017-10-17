
const languages = {
        "португальский": "portuguese",
        "английский": "english"
    },
    getData = initData(), // return function 
    checked = $("#chooseLanguage input:checked").val(),
    trans = $("#translation")[0];
// store data in local dictionary
getData();