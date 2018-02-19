/** 
 * After a first call this function turnes into the dataStore object having get/set
 * Get json file, store as dictionary, get Lang
 * @callback -- function to run inside after getting json
*/
function initData() {
    output('initData', arguments);
    // get lang
    const langs = getLang();
    // var to store dictionary
    let dictionary,
        editor = {};
    // get dictionary from localStorage
    if (langs) {
        dictionary = getDictionary();
    }
    // no stored dictionary
    // show settings
    setInitView(langs);
    // dataStore object
    return {
        get() {
            output('dataStore.get', arguments, 'orange');
            if (!dictionary) {
                console.warn('Have no dictionary yet');
                return false;
            }
            return dictionary;
        },
        set(dict) {
            output('dataStore.set', arguments, 'goldenrod');
            dictionary = dict;
        },
        editor: {
            get(index) {
                return (index >= 0)
                    ? editor[index]
                    : editor;
            },
            set(index, value) {
                editor[index] = value;
            },
            remove(index) {
                delete editor[index];
            }
        }
    }
}
// attaches form if didn't do before
function addForm() {
    output('addForm', arguments);
    //
    if ($(`#${addWordFormId}`).length) return;
    //
    $chooseLanguageForm.after(`<form id="${addWordFormId}">
    ${createFields()}
        ${setButton('save')}
        ${setButton('save-xtra')}
    </form>`);
}
/**
 * Make initial languages choice
 */
function checkInitLangs(currentSel) {
    // all selects
    const $langSelects = $(langSelects);
    let type, action;
    //
    $langSelects.eq(0).val() == $langSelects.eq(1).val()
        ? (type = 'cancel', action = 'add')
        : (type = 'submit', action = 'remove');
    //
    $langSelects[`${action}Class`]('border-red-outline');
    storeSelects.dispatch({ type: type });
}
// 
function clearList() {
    output('clearList', arguments, "darkkhaki");
    $view.html("");
    $sentencesTranslated().html("");
}
/**
 * Get the part of dictionary containing words of selected language
 */
function getLangWords() {
    return dataStore.get(/* dict => dict[getTargetLanguage()] */);
}
/**
 * 
 * @param {*} element 
 */
function getNativeWord(element) {
    output('getNativeWord', arguments);
    return $(element).parent().find(`.${nativeWordClass}`);
}
/**
 * 
 * @param {HTMLElement} btn 
 * @param {*} add 
 */
function handleTranslateWord(btn, add) {
    output('handleTranslateWord', arguments);
    const $nativeWordSpan = getNativeWord(btn);
    let classAction = 'remove',
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
    $(btn)[`${btnEditClassAction}Class`](btnEditSelector)[`${classAction}Class`](btnCancelSelector);
    return $nativeWordSpan;
}
/**
 * return jQuery object, index
 * @param {HTMLElement} btn 
 */
function indexEditorBtn(btn) {
    output('indexEditorBtn', arguments);
    const $btn = $(btn),
        $parent = $btn.parent(`.${wordClass}`),
        btnIndex = $parent.index();
    return [$btn, btnIndex, $parent];
}
/**
 * Store edited word, transorm span to the editable area
 * @param {HTMLElement} btnEdit 
 */
function editTranslatedWord(btnEdit) {
    output('editTranslatedWord', arguments);
    // storeWordEdit.dispatch({ type: 'edit' }); // default
    //const $btnEdit = $(btnEdit), btnIndex = $btnEdit.parent('.word').index();
    const [$btnEdit, btnIndex, $parent] = indexEditorBtn(btnEdit);
    dataStore.editor.set(btnIndex, $btnEdit.next().text());
    console.log('get state=>', { $btnEdit:$btnEdit, btnIndex:btnIndex, editorStored: dataStore.editor.get() });
    handleTranslateWord(btnEdit, true);
    $parent.find(`.${btnRemoveSelector}`).hide();
}
/**
 * Get edited word back, transorm the editable area into span
 * @param {HTMLElement} btnCancel 
 */
function editTranslatedWordCancel(btnCancel) {
    output('editTranslatedWordCancel', arguments);
    const [$btnCancel, btnIndex, $parent] = indexEditorBtn(btnCancel),
        storedValue = dataStore.editor.get(btnIndex);
    //
    handleTranslateWord(btnCancel).text(storedValue);
    dataStore.editor.remove(btnIndex);
    $parent.find(`.${btnRemoveSelector}`).show();
    // console.log('storedValue, editor =>', {$btnCancel:$btnCancel, btnIndex:btnIndex, storedValue:storedValue, editor:dataStore.editor.get()});
}
/**
 * Inserts list into #view
 * @param {String} list 
 */
function insertWordsList(list, sentences) {
    output('insertWordsList', arguments);
    $view.html(list);
    $sentencesTranslated().html(sentences);
    $view.append(setAttachedWord());
}
/**
 * Prevents the value of the new word input to be shorter than the 
 * word in the search string
 * @param {Object} event 
 */
function keepNewWordInputSynchronized(event) {
    output('keepNewWordInputSynchronized', arguments);
    const wordValue = $(`#${wordId}`).val();
    // console.log(event.target, event.target.value, event.target.value.length);
    if (event.target.value.length < wordValue.length) {
        event.target.value = wordValue;
        return event.target;
    }
}
/**  Вставляет список слов в html.
 * параметры: 
 * словарь (из json-данных);
 * подстрока в текстовом поле; 
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function makeWordsList(substring) {
    output('makeWordsList => CREATES words list', arguments, 'violet');
    const words = getLangWords();
    // 
    if (!words) {
        console.warn('No words', {
            'globals.languages': globals.languages
        });
        return false;
    }
    const [list, sentences, wordsLen] = createNewWordList(words, substring);
    //
    list ? insertWordsList(list, sentences) : clearList();
    // 
    if (wordsLen === 1) {
        $view.find(`>.${wordClass}`).trigger('mouseenter'); //console.log('mouseenter');
    }
    return words;
}
/**
 * 
 * @param {*} element .word || .wrapper >span'
 * @param {*} eventType 
 */
function manageSentence(element, eventType) {
    output('manageSentence', arguments);
    if (element.tagName.toLowerCase() == 'span') {
        const indexWord = $(element).parents('.active').eq(0).index(),
            indexSentence = $(element).parent('.wrapper').index(),
            $sentence = $sentencesTranslated()
                .find('.sentences')
                .eq(indexWord)
                .find('.wrapper').eq(indexSentence);
        eventType == 'mouseenter' ?
            $sentence.fadeIn(200)
            : $sentence.hide();
        // manage pseudoelement :before
        $sentencesTranslated().toggleClass('initial');
    } else {
        if (eventType == 'mouseenter') {
            if (!$(element).hasClass(activeClass)) {
                $(element).addClass(activeClass);
            }
        } else {
            if ($view.find(`.${wordClass}`).length > 1) {
                $(element).removeClass(activeClass);
            }
        }
    }
}
// removing entire form contents
function removeForm() {
    output('removeForm', arguments, "goldenrod");
    const $form = $(`#${addWordFormId}`);
    if ($form.length) $form.remove();
}
/**
 * Remove the word from dictionary, call to store
 * @param {HTMLElement} btn 
 */
function removeWord(btn){
    output('removeWord', arguments, 'red');
    const [, , $parent] = indexEditorBtn(btn),
        dict = dataStore.get();
    //
    delete dict[$parent.find(`.${nativeWordClass}`).text()];
    console.log(dict);
    storeDictionary(dict);
    // remove word container (hide in order not to touch editor object)
    $parent.hide();
}
/**
 * 
 */
function setLangsInfo(langs) {
    output('setLangsInfo', arguments, 'green');
    if (!langs) {
        langs = getLang();
    }
    const $langsBlock = $(`#${hdrLanguageId}`);
    $(Object.keys(langs)).each((index, element) => {
        /*console.log({
            data: index + ':' + element,
            selector: $langsBlock.find(`span[data-lang="${element}"]`),
            text: langs[element]
        });*/
        $langsBlock.find(`span[data-lang="${element}"]`).text(langs[element]);
    });
}
/**
 * Set an initial lang choice
 */
function setLangInit() {
    output('setLangInit', arguments);
    const $sectLang = $(`#${sectionChooseLangId}`),
        $chooseLangHeader = $sectLang.find('h4'),
        activeLangs = getLang(true);
    let selId;
    // 
    $(Object.keys(globals.languages)).each((index, lang) => {
        selId = `lang-${lang}`;
        // append select
        $chooseLangHeader.eq(index).append(makeSelect(selId));
        const $selBlock = $(`#${selId}`);
        $selBlock.append(makeLangSelectOptions())
        // select option
        if (activeLangs && activeLangs[index]) {
            $selBlock.val(activeLangs[index]);
        }
    });
    $sectLang.append(setButton('save'));
}
/**
 * 
 * @param {HTMLElement} btn -- button being clicked 
 */
function storeWordEdited(btn) {
    output('storeWordEdited', arguments, 'darkred');
    const wordEdited = $(btn).prev().text(),
        dictionary = getDictionary(),
        [$btn, btnIndex, $parent] = indexEditorBtn(btn),
        initialWord = dataStore.editor.get(btnIndex),
        editedWord = getNativeWord(btn).text();
    //console.log(initialWord+'=>'+editedWord,{dictionaryWord:dictionary[initialWord], dictionary:dictionary});
    dictionary[editedWord] = Object.assign(dictionary[initialWord]);
    delete dictionary[initialWord];
    dataStore.editor.remove(btnIndex);
    //console.log('%cSync with DB!', 'background: orange', {dictionary:dictionary, editor:dataStore.editor.get()});
    storeDictionary(dictionary);
    // drop editable view
    $parent.find(`.${btnCancelSelector}`).trigger('click');
}