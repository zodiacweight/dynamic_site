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
    let list = "",
        sentences = "",
        wordsLen = 0;
    Object.keys(words).forEach((word) => { // console.log('check it=>', {word:word, wordData: words[word], words:words, substring:substring});
        if (word.indexOf(substring) !== -1) {
            list += `
            <div class='word'>
                ${setButton("add")}
                <span class="nativeWord">${word}</span>
                <section>`;
            ++wordsLen;
            sentences += `
                <div class="sentences">`;
            //console.log('word set=>', words[word]);
            words[word][0].forEach((translatedWord, index) => {
               // console.log("words[wprd]: ", words[word]);
                const sentence = words[word][1][index] || '&nbsp;';
                sentences += `
                    <div class='wrapper' class="sentence">${sentence}</div>`;
                list += `
                    <div class='wrapper'>
                        <span class="translatedWord">${translatedWord}</span>
                    </div>`;
            });
            list += `
                </section>
            </div>`;
            sentences += `
                </div>`;
        }
    });
    if (list) {
        $view.html(list);
        $sentencesTranslated.html(sentences);
        //$view.append("<input type='button' id='btn-edit' value = 'редактировать'>");
    } else {
        clearList();
    }
    // 
    if (wordsLen===1){
        $view.find('>.word').trigger('mouseenter');
        //console.log('mouseenter');
    }
    return words;
}

function clearList(){ console.log('clearList')
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
//
function  getTargetLanguage(){
    return $("#chooseLanguage input:checked").val();
}
//
function createFields(){
    return `<div>
    <input type="text" placeholder="translation for the word">
        <textarea placeholder="sentence for the word"></textarea>
</div>`;
}
//
function createForm(){
    return `<form id='${addWordFormStr}'>
    ${createFields()}
        <input type="button" value="добавить ячейку" id="${addWordStr}">
        ${setButton('save')}
        <input type="button" value="Отменить" id="btn-cancel">
    </form>`;
}
// attaches form if didn't do before
function addForm(){
    //
    if ($(`#${addWordFormStr}`).length) return;
    //
    $chooseLanguage.after(`<form id="${addWordFormStr}">
    ${createFields()}
        ${setButton('save')}
    </form>`);
}
// removing entire form contents
function removeForm() {
    const $form = $(`#${addWordFormStr}`);
    if ($form.length) $form.remove();
}
//
function setButton(btn_type){
    switch (btn_type) {
        case 'add':
            return `<input class="btn-add" type="button" value="+">`;
            break;
        case 'edit':
            return `<input class='btn-edit' type='button' value='🖉'>`;
            break;
        case 'save':
            return `<input type="button" value="Сохранить" id="${btnSaveId}">`;
            break;
    }
}