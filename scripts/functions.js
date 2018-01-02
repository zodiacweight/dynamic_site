// 
const $view = $('#view'),
    $sentencesTranslated = $('#sentences-translated');
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
    let result = "",
        wordsLen = 0;
    Object.keys(words).forEach((word) => { // console.log('check it=>', {word:word, wordData: words[word], words:words, substring:substring});
        if (word.indexOf(substring) !== -1) {
            result += `
            <div class='word'>
                <input id='edit' type='button' value='🖉'> 
                <input id='delete' type='button' value='del'>   
                <span id='russianWord'>${word}</span>
                <span id='translatedWord'>${words[word][0]}</span>
                <section>`;
            ++wordsLen;
            result += `
                <div class="sentences">`;
            //console.log('word set=>', words[word]);
            words[word][0].forEach((translatedWord, index) => {
                console.log("words[word][0][index]: ", words[word][0][index]);
                const sentence = words[word][1][index] || '&nbsp;';
                //console.log("sentence: ", sentence);
                console.log("translatedWord: ", translatedWord);
                result += `
                    <div class='wrapper' id='sentence'>${sentence}</div>
                    <div id='saveChanges'></div>`;
            });
            result += `
                    </section>
                </div>
            </div>`;
        }
        
    });
    if (result) {
        console.log("result");
        return result;
    }
    /*if (list) {
        $view.html(list);
        $sentencesTranslated.html(sentences);
        //$view.append("<input type='button' id='edit' value = 'редактировать'>");
    } else {
        clearList();
    }
    // 
    if (wordsLen===1){
        $view.find('>.word').trigger('mouseenter');
        //console.log('mouseenter');
    }
    return words; */
}

function clearList(){
    $view.html("");
    $sentencesTranslated.html("");
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

function addFields(){
    return "<div><input type=\"text\" placeholder=\"translation for word\"><textarea placeholder=\"sentence for word\"></textarea></div>";
}