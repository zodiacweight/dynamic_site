intro();


function getData(){
    $.get("jsons/.json").done(
        (dictionary) => {
           const checked = $("#chooseLanguage input:checked").val(),
                words = Objedictionaryct.keys(dictionary[languages[checked]]);
           createList(words, substring);
           //return words;
        }

    )
    .fail(() => {

    });

}

function defineWords(substring){
    
}

function intro(){
    const input = $("#word"); // jQuery object
    // $("#word")[0]; // HTML element!
    var list ="";
    input.on('input keyup', (e) => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        var putLetters = e.target.value;
        if(putLetters.length>2){
            defineWords(putLetters);       
        }
    });
}

function createList(words, substring){
    var list="";
    console.log("substring: ", substring);
    //console.log("words: ", words);
        for (var i=0, j=words.length; i<j; i++){
            console.log("words[i]", words[i]);
            if(words[i].indexOf(substring)!==-1) {
                list+="<p class='word'>"+words[i]+"</p>";     
            }
        
        /*if(words[key].indexof(substring)!==-1) {
            list.append("<p>"+words[key]+"</p>");
        }*/
        }
        console.log("list: ", list);
        $("#view").html(list);
       
    
}



        
                /** Когда в строке 3 или больше букв:
                 * 1. Пробег по словам по выбранному языку, поиск этого сочетания в каждом слове;
                 * 2. В массив собрать все подходящие слова;
                 * 3. сделать меню с этими словами;
                 * 4. сделать так, чтобы при наведении мыши на слово появлялся список с предложениями
                 * с этим словом.
                */
function lastState(){

}