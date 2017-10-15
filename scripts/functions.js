intro();

/** 
 * Get json file
 * @callback -- function to run inside after getting json
*/
function initData() {
    const path = "jsons/dictionary.json";
    var dictionary;
    // после первого вызова:
    return (callback, ...params) => {
        if (!callback) {
            $.get(path).done(json => {
                dictionary = json;
                console.log('I\'v got a dictionary =>', dictionary);
            })
                .fail(() => console.warn(`Cannot get file from ${path}`));
        } else {
            if (dictionary) { console.log('Has dictionary');
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
    var list = "";
    const $input = $("#word");
    $checked = $("#chooseLanguage input:checked").val();
    $input.on('input keyup', (e) => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        var putLetters = e.target.value;
        if (putLetters.length > 2) {
            createList(putLetters, $checked);
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
function makeWordsList(dictionary, substring, checked) {
    console.trace('makeWordsList');
    const words = dictionary[ // json
        languages[checked] // portuguese | english
    ];
    let list = "";
    Object.keys(words).forEach((word) => {
        if (word.indexOf(substring) !== -1) {
            list += "<p class='word'>" + word + "</p>";
        }
    });
    /*for (var i = 0, list = "", j = words.length; i < j; i++) {
        //console.log("words[i]", words[i]); 
        if (words[i].indexOf(substring) !== -1) {
            list += "<p class='word'>" + words[i] + "</p>";
        }
    }*/ console.log("words: ", words, "list: ", list);
    //console.log("Словарь получен");
    $("#view").html(list);
}

/** Вызывает функцию getData и передает ей подстроку и переменную, означающую выбранный язык.
 * Параметры: 
 * подстрока в текстовом поле;
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function createList(substring, checked) {
    console.log('createList', { substring: substring, checked: checked });
    getData(makeWordsList, substring, checked);
}

/** Выводит список слов-переводов для конкретного слова.
 * Параметры: словарь из json-данных; 
 * массив русских слов, содержащийся в разделе словаря, соответствующего выбранному языку.
 */
function showTranslation(dictionary, words) {

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