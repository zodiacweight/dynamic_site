/** 
 * After a first call this function turnes into the dataStore object having get/set
 * Get json file, store as dictionary, get Lang
 * @callback -- function to run inside after getting json
*/
function initData() {
    outputGroupped('initData', arguments);
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
    console.groupEnd();
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
    if ($(`#${_addWordFormId}`).length) return;
    //
    $chooseLanguageForm.after(`<form id="${_addWordFormId}">
    ${createFields()}
        ${setButton('save')}
        ${setButton('save-xtra')}
    </form>`);
}
/**
 * 
 * @param {jQuery Object}  $targetCell -- input field
 * @param {String} targetCellVal -- input field text
 */
function checkNewWordCoincidence($targetCell, targetCellVal) {
    outputGroupped('addNewWordAndSentence', arguments);
    let $bntAttach = $(`#${_btnAttachSelector}`),
        disabled = 'disabled';
    if (findInDictionary(targetCellVal)) {
        $targetCell.addClass(_repeatedClass).attr('title', _wordIsTaken);
        $bntAttach.attr(disabled, disabled);
    } else {
        $targetCell.removeClass(_repeatedClass).removeAttr('title');
        $bntAttach.removeAttr(disabled);
    }
    console.groupEnd();
}
/**
 * @param {String} word
 */
function checkWordLengthTooShort(word, min=_minWordLength + 1){
    output('checkWordLengthTooShort', arguments);
    return min >= word.length ? 'Too short word' : false;
}
// 
function clearList() {
    output('clearList', arguments, "darkkhaki");
    $view.html("");
    $sentencesTranslated().html("");
}
/**
 * Check entry in dictionary
 * @param {String} entry
 */
function findInDictionary(entry) {
    outputGroupped('findInDictionary', arguments);
    console.groupEnd();
    return Object.keys(dataStore.get()).some(word => word === entry);
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
    return $(element).next();
}
/**
 * 
 * @param {HTMLElement} btn 
 * @param {*} add 
 */
function handleTranslateWord(btn, add) {
    output('handleTranslateWord', arguments);
    const $wordToEditSpan = getNativeWord(btn);
    let classAction = 'remove',
        btnEditClassAction = 'add',
        editableState = false;
    if (add) {
        btnEditClassAction = 'remove';
        classAction = 'add';
        editableState = true;
        $wordToEditSpan
            .data(_originWordStr, $wordToEditSpan.text())
            .after(setButton('apply'));
    } else {
        $wordToEditSpan
            .text($wordToEditSpan.data(_originWordStr))
            .next(`.${_btnApplySelector}`).remove()
            .removeData();
    }
    // span containig the native word
    $wordToEditSpan
        // make the span editable
        .attr('contentEditable', editableState)
        // assign 'editable' class to the parent block
        .parent()[`${classAction}Class`](_editableClass);
    //
    $(btn)[`${btnEditClassAction}Class`](_btnEditSelector)[`${classAction}Class`](_btnCancelSelector);
    return $wordToEditSpan;
}
/**
 * return jQuery object, index
 * @param {HTMLElement} btn 
 */
function indexEditorBtn(targetElement) {
    output('indexEditorBtn', arguments);
    const $target = $(targetElement),
        $parent = $target.parent(),
        targetIndex = $parent.index();
    return [$target, targetIndex, $parent];
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
 * 
 * @param {String} substring 
 */
function makeWordsList(substring) {
    output('makeWordsList => CREATES words list', arguments, 'violet');
    const words = getLangWords();
    // 
    if (!words) {
        console.warn('No words', {
            '_globals.languages': _globals.languages
        });
        return false;
    }
    const [list, sentences, wordsLen] = createNewWordList(words, substring);
    //
    list ? insertWordsList(list, sentences) : clearList();
    // 
    if (wordsLen === 1) {
        $view.find(`>.${_wordClass}`).trigger('mouseenter'); //console.log('mouseenter');
    }
    return words;
}
/**
 * mark input field as having too short length
 * @param {jQuery object} $inputAttach
 */
function markInputTooShortLength($inputAttach){
    $inputAttach.addClass(_wordRedClass).attr('title',_wordIsTooShort);
}
/**
 * unmark input field as having too short length
 * @param {jQuery object} $inputAttach
 */
function markInputTooShortLengthCancel($inputAttach){
    $inputAttach.removeClass(_wordRedClass).removeAttr('title');
}
/**
 * 
 * @param {Object} ob 
 */
function notEvnt(ob) {
    output('notEvnt', arguments, "goldenrod");
    return !(ob.originalEvent && ob.originalEvent instanceof Event);
}
// removing entire form contents
function removeForm() {
    output('removeForm', arguments, "goldenrod");
    const $form = $(`#${_addWordFormId}`);
    if ($form.length) $form.remove();
}
/**
 * 
 */
function setLangsInfo(langs) {
    outputGroupped('setLangsInfo', arguments, 'green');
    //
    if (!langs || !notEvnt(langs)) {
        langs = getLang();
    }
    const $langsBlock = $(`#${_hdrLanguageId}`);
    $(Object.keys(langs)).each((index, element) => {
        $langsBlock.find(`span[data-lang="${element}"]`).text(langs[element]);
    });
    console.groupEnd();
}
/**
 * Set an initial lang choice
 */
function setLangInit() {
    output('setLangInit', arguments);
    const $sectLang = $(`#${_sectionChooseLangId}`),
        $chooseLangHeader = $sectLang.find('h4'),
        activeLangs = getLang(true);
    let selId;
    // 
    $(Object.keys(_globals.languages)).each((index, lang) => {
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