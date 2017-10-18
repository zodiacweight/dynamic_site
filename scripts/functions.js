// git -c http.sslVerify=false push origin master
$(function(){
    const addWordStr = "addWord",
        addWordBtnId = `#${addWordStr}`;
    /** 
     * Проверяет символы в текстовом поле и, когда нужно, вызывает функцию createList
    */
    $("#word").on('input keyup', (e) => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        if (e.target.value.length > 2) {
            const words = createList(e.target.value); // console.log('words=>', words);
            // if the button doesn't exist, add id
            if(!$(addWordBtnId).length){
                if (!$(viewSelector).html()){
                    $("#chooseLanguage").append(`<input type='button' id='${addWordStr}' value='добавить слово'>`);
                }
            } else {
                // check if we have the words which the substring conforms of
                Object.keys(words).forEach((word) => {
                    if (word.indexOf(e.target.value)!==-1){
                        // if we have a word with such a substring then remove the button
                        $(addWordBtnId).remove();
                    }
                });
            }
        } else {
            if($(addWordBtnId)){
                $(addWordBtnId).remove();
            }   //console.log("else");
            clearList(); 
        }
    });
});

const viewSelector = '#view';
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
                return callback(dictionary, ...params);
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

/** Создает список слов, содержащих указанную подстроку и вставляет его в html.
 * параметры: 
 * словарь (из json-данных);
 * подстрока в текстовом поле; 
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function makeWordsList(dictionary, substring, currentWord) {
    //console.trace('makeWordsList', {substring: substring});
    const words = dictionary[ // json
        languages[getTargetLanguage()] // portuguese | english
    ];
    let list = ""; // console.log('Keys=>', Object.keys(words));
    Object.keys(words).forEach((word) => { // console.log('check it=>', {word:word, wordData: words[word], words:words, substring:substring});
        if (word.indexOf(substring) !== -1) {
            list += `<div class='word'>`+word+`
        <section>`;
            //console.log('word set=>', words[word]);
            words[word][0].forEach((translatedWord, index) => {
                const sentence = words[word][1][index] || '&nbsp;';
                list += `
                <div class='word'>
                    <div class='wrapper'>
                        <span>${translatedWord}</span>
                        <div class="sentence">
                            <div class='wrapper'>${sentence}</div>
                        </div>
                    </div>
                </div>`;
            });
            list += `
        </section>
    </div>`;
        }
    });
    (list) ?
        $(viewSelector).html(list)
        : clearList();
    return words;
}

function clearList(){
    $(viewSelector).html("");
}

/** Вызывает функцию getData и передает ей подстроку и переменную, означающую выбранный язык.
 * Параметры: 
 * подстрока в текстовом поле;
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function createList(substring, currentWord) {
    //console.log('createList', { substring: substring });
    return getData(makeWordsList, substring, currentWord);
}

function  getTargetLanguage(){
    return $("#chooseLanguage input:checked").val();
}