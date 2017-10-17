intro();

/** 
 * Get json file
 * @callback -- function to run inside after getting json
*/
function initData() { // becomes getData after first calling
    const path = "jsons/dictionary.json";
    var dictionary;
    // после первого вызова: getData
    return (callback, ...params) => {
        if (!callback) {
            $.get(path).done(json => {
                dictionary = json;
                console.log('I\'v got a dictionary =>', dictionary);
            })
                .fail(() => console.warn(`Cannot get file from ${path}`));
        } else {
            if (dictionary) { 
                callback(dictionary, ...params);
            } else {
                console.warn('Has NO dictionary');
                $.get(path).done(json => {
                    dictionary = json;
                    callback(dictionary, ...params);
                })
                    .fail(() => console.warn(`Cannot get file from ${path}`));
            }
        }
    }
}



/** 
 * Проверяет символы в текстовом поле и, когда нужно, вызывает функцию createList
 * ничего не возвращает
 * 
*/
function intro() {
    // jQuery object
    // $("#word")[0]; // HTML element!
    var list = ""; const $input = $("#word");
    $input.on('input keyup', (e) => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        if (e.target.value.length > 2) {
            createList(e.target.value, checked);
        } else {
            clearList();
        }
    });
}

/** Создает список слов, содержащих указанную подстроку и вставляет его в html.
 * параметры: 
 * словарь (из json-данных);
 * подстрока в текстовом поле; 
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function makeWordsList(dictionary, substring, checked, currentWord) {
    //console.trace('makeWordsList', {substring: substring, checked: checked, langChecked: languages[checked]});
    const words = dictionary[ // json
        languages[checked] // portuguese | english
    ];
    let list = ""; // console.log('Keys=>', Object.keys(words));
    Object.keys(words).forEach((word) => { // console.log('check it=>', {word:word, wordData: words[word], words:words, substring:substring});
        if (word.indexOf(substring) !== -1) {
            list += `<div class='word'>`+word+`</div>`;
            /* const currentWord = word; words[word][0][0]; // console.log('Add word: ', {currentWord:currentWord});
            if (currentWord) {
                list += `<div class='word'>${currentWord}</div>`;
            } else {
                console.warn('Word is empty...');
            } */
        }
    }); 
    if (list) {
        $("#view").html(list);
    } else {
        clearList();
    }
}

function clearList(){
    $("#view").html('');
}

/** Вызывает функцию getData и передает ей подстроку и переменную, означающую выбранный язык.
 * Параметры: 
 * подстрока в текстовом поле;
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function createList(substring, checked, currentWord) {
    //console.log('createList', { substring: substring, checked: checked });
    getData(makeWordsList, substring, checked, currentWord);
}

/** Выводит список слов-переводов для конкретного слова.
 * Параметры: словарь из json-данных; 
 * массив русских слов, содержащийся в разделе словаря, соответствующего выбранному языку.
 */
function showTranslation(dictionary, word, checked) {
    var words = Object.keys(dictionary[languages[checked]][word][0]);
    console.log("trans: ", trans);
    for(var i=0, j=words.lenght; i<j; i++){
       // trans.innerHTML+= "<div>"+word[i]+"</div>";
       $("#translation").append(trans);
        
    } 
    
}


/** Когда в строке 3 или больше букв:
 * 1. Пробег по словам по выбранному языку, поиск этого сочетания в каждом слове;
 * 2. В массив собрать все подходящие слова;
 * 3. сделать меню с этими словами;
 * 4. сделать так, чтобы при наведении мыши на слово появлялся список с предложениями
 * с этим словом.
*/
function lastState() {

}