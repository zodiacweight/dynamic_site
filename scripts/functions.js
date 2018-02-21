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
        editor = {},
        wordEdited;
    // get dictionary from localStorage
    if (langs) {
        // if for some reason we have languages, but haven't dictionary
        // (it is possible if we have deleted it explicitly and got main view here)
        // then load it
        if (!(dictionary = getDictionary())) {
            loadDictionary(langs);
        }
    }
    // no stored dictionary
    // if not langs, show settings, otherwise -- main view
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
            },
            words: {
                get() {
                    return wordEdited;
                },
                set(word) {
                    wordEdited = word;
                }
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
// 
function clearList() {
    output('clearList', arguments, "darkkhaki");
    $view.html("");
    $sentencesTranslated().html("");
}
/**
 * Assign or remove mark of coninsiding value
 * @param {Object} cellToEdit event.target
 */
function setRepeatedMarkClass(cellToEdit){
    output('setRepeatedMarkClass', arguments);
    const repeated = [];
    let action;
    $(`span.${nativeWordClass}`).each(function () {
        if (cellToEdit !== this) {
            if (this.innerText === cellToEdit.innerHTML) {
                action = 'addClass';
                repeated.push(this);
            } else {
                action = 'removeClass';
            }
            $(this).parent(`.${wordClass}`)[action](repeatedClass);
        }
    });
    return repeated;
}
/**
 * set or remove mark about the same word on the cellToEdit.[parent.word]
 * @param {HTMLELement} cellToEdit 
 * @param {Array} repeated 
 */
function setRepeatedMarkClassEventParent(cellToEdit, repeated){
    output('setRepeatedMarkClassEventParent', arguments);
    $(cellToEdit).parent(`.${wordClass}`)[
        ( repeated.length && // 1
          ( repeated.length > 1 || 
            repeated[0] != cellToEdit
          )
        )
        ? 'addClass'
        : 'removeClass'
    ](repeatedClass);
}
/**
 * 
 * @param {*} toArray 
 */
function getLang(toArray) {
    output('getLang', arguments);
    const langs = getLangDb();
    if (langs && toArray && !toArray.bubbles) {
        const langKeys = Object.keys(langs);
        return (langKeys.length)
            ? langKeys.map(function (k) {
                return langs[k];
            }) : null;
    } else {
        return langs;
    }
}
/**
 * Get the part of dictionary containing words of selected language
 */
function getLangWords() {
    output('getLangWords', arguments);
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
 * Inserts list into #view
 * @param {String} list 
 */
function insertWordsList(list, sentences) {
    output('insertWordsList', arguments);
    $view.html(list);
    $sentencesTranslated().html(sentences);
    $view.append(setAttachedWord());
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
 * @param {Object} ob 
 */
function notEvnt(ob){
    output('notEvnt', arguments, "goldenrod");
    return ! (ob.originalEvent && ob.originalEvent instanceof Event);
}
// removing entire form contents
function removeForm() {
    output('removeForm', arguments, "goldenrod");
    const $form = $(`#${addWordFormId}`);
    if ($form.length) $form.remove();
}
/**
 * 
 */
function setLangsInfo(langs) {
    output('setLangsInfo', arguments, 'green');
    //
    if (!langs || !notEvnt(langs)) {
        langs = getLang(); console.log('get langs =>', langs);
    }
    const $langsBlock = $(`#${hdrLanguageId}`);
    $(Object.keys(langs)).each((index, element) => {
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