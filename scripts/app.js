
const getData = initData(), // return function 
    trans = $("#translation")[0];
// store data in local dictionary
getData();

function output(fnc, args, color){
    color? console.groupCollapsed('%c'+fnc, 'color:'+color) : console.groupCollapsed(fnc);
    console.trace();
    console.log(args);
    console.groupEnd();
}