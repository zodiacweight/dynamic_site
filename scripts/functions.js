/** 
 * Get json file
 * @callback -- function to run inside after getting json
*/
function initData() { // becomes getData after first calling
    console.trace('initData', arguments);
    const path = "jsons/dictionary.json";
    var dictionary;
    // после первого вызова: getData
    return (callback, ...params) => {
        console.trace('getData', arguments);
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
    console.trace('makeWordsList', arguments);
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
                ${setButton("edit")}
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
        $view.append(setAttachedWord());
    } else {
        clearList();
    }
    // 
    if (wordsLen === 1) {
        $view.find('>.word').trigger('mouseenter');
        //console.log('mouseenter');
    }
    return words;
}

function clearList() {
    console.trace('clearList', arguments);
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
    console.trace('createList', arguments);
    return getData(makeWordsList, substring, currentWord);
}
/**
 * Creates list containing translated words
 * @param {*} targetWordValue 
 */
function createWordsList(targetWordValue) {
    console.trace('createWordsList', arguments);
    var list = "";
    Object.keys(createList(targetWordValue)).forEach(word => {
        if (word.indexOf(targetWordValue) !== -1) {
            list += `<div>${word}</div>`;
            // if we have a word with such a substring then remove the button
            //removeForm();
        }
    });
    return list;
}
//
function getTargetLanguage() {
    console.trace('getTargetLanguage', arguments);
    return $("#chooseLanguage input:checked").val();
}
//
function createFields() {
    console.trace('createFields', arguments);
    return `<div>
    <input type="text" placeholder="translation for the word">
        <textarea placeholder="sentence for the word"></textarea>
</div>`;
}
//
function createForm() {
    console.trace('createForm', arguments);
    return `<form id='${addWordFormStr}'>
    ${createFields()}
        <input type="button" value="добавить ячейку" id="${addWordStr}">
        ${setButton('save')}
        <input type="button" value="Отменить" id="btn-cancel">
    </form>`;
}
// attaches form if didn't do before
function addForm() {
    console.trace('addForm', arguments);
    //
    if ($(`#${addWordFormStr}`).length) return;
    //
    $chooseLanguage.after(`<form id="${addWordFormStr}">
    ${createFields()}
        ${setButton('save')}
    </form>`);
}
//
function getNativeWord(element) {
    console.trace('getNativeWord', arguments);
    return $(element).parent().find(".nativeWord");
}
//
function handleTranslateWord(element, add) {
    console.trace('handleTranslateWord', arguments);
    var $nativeWordSpan = getNativeWord(element),
        classAction = 'remove',
        btnEditClassAction = 'add', 
        editableState = false;
    if (add) {
        btnEditClassAction = 'remove';
        classAction = 'add';
        editableState = true;
        $nativeWordSpan.after(`<div class="${btnApplySelector}">✔</div>`);
    } else {
        $nativeWordSpan.next(`.${btnApplySelector}`).remove();
    }
    $nativeWordSpan[`${classAction}Class`]('editable')[0].contentEditable = editableState;
    $(element)[`${btnEditClassAction}Class`](btnEditSelector)[`${classAction}Class`](btnCancelSelector);}
//
function editTranslatedWord(element) {
    console.trace('editTranslatedWord', arguments);
    handleTranslateWord(element, true);
}
//
function editTranslatedWordCancel(element) {
    console.trace('editTranslatedWordCancel', arguments);
    handleTranslateWord(element);
}
//
function manageSentence(element, eventType) {
    console.trace('manageSentence', arguments);
    if (element.tagName.toLowerCase() == 'span') {
        const indexWord = $(element).parents('.active').eq(0).index(),
            indexSentence = $(element).parent('.wrapper').index(),
            $sentence = $sentencesTranslated
                .find('.sentences')
                .eq(indexWord)
                .find('.wrapper').eq(indexSentence);
        eventType == 'mouseenter' ?
            $sentence.fadeIn(200)
            : $sentence.hide();
        // manage pseudoelement :before
        $sentencesTranslated.toggleClass('initial');
    } else {
        if (eventType == 'mouseenter') {
            if (!$(element).hasClass(activeClass)) {
                $(element).addClass(activeClass);
            }
        } else {
            if ($view.find('.word').length > 1) {
                $(element).removeClass(activeClass);
            }
        }
    }
}
// removing entire form contents
function removeForm() {
    console.trace('removeForm', arguments);
    const $form = $(`#${addWordFormStr}`);
    if ($form.length) $form.remove();
}
//
function setAttachedWord() {
    console.trace('setAttachedWord', arguments);
    return `<input type="text" value="${$(`#${wordId}`).val()}" class="${inputAttachSelector}" id="${inputAttachSelector}">
${setButton('attach')}`;
}
//
function setButton(btn_type) {
    console.trace('setButton', arguments);
    switch (btn_type) {
        case 'add':
            return `<input class="btn-add" type="button">`;
            break;
        case 'edit':
            return `<button class='${btnEditSelector}' type="button">&nbsp;</button>`;
            break;
        case 'save':
            return `<input type="button" value="Сохранить" id="${btnSaveSelector}">`;
            break;
        case 'attach':
            return `<button class='${btnAttachSelector}' type="button">Добавить</button>`;
            break;
    }
}
//
function storeWord(element) {
    console.trace('storeWord', arguments);
    const nativeWord = $(`#${wordId}`)[0].value;
    //console.log("nativeWord: ", nativeWord);
    $(`#${addWordFormStr} div`).each(function () {
        //console.log("in the cycle");
        var $word,
            wordValue,
            $sentence;

        if ($word = $(element).find("input[type='text']")) {
            wordValue = $word.val();
        }
        if ($sentence = $(element).find("textarea")) {
            sentenceValue = $sentence.val();
        }

        const added = JSON.stringify({ translatedWord: word, sentence: sentence });
        localStorage.setItem(nativeWord, added);
        console.log("localStorage[nativeWord]: ", localStorage.getItem(nativeWord));
        const checkedLanguage = getTargetLanguage();
        /**
         * 1. Сначала объект получает все данные из json-файла;
           2. Из этого объекта данные передаются в localStorage;
           3. При клике по кнопке "сохранить":
           3.1 Изменения в объекте;
           3.2 Синхронизация объекта с localStorage - те же изменения;
           3.3 Синхронизация объекта с json-данными.
         */
    });
}
/**
 * Prevents the value of the new word input to be shorter than the 
 * word in the search string
 * @param {Object} event 
 */
function keepNewWordInputSynchronized(event) {
    console.log('keepNewWordInputSynchronized', arguments);
    const wordValue = $(`#${wordId}`).val();
    // console.log(event.target, event.target.value, event.target.value.length);
    if (event.target.value.length < wordValue.length) {
        event.target.value = wordValue;
        return event.target;
    }
}