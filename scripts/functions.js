/** 
 * After a first call this function turnes into the getData function
 * Get json file, store as dictionary, get Lang
 * @callback -- function to run inside after getting json
*/
function initData() { // becomes getData after first calling
    output('initData', arguments);
    // get lang
    const langs = getLang();
    // var to store dictionary
    let dictionary;
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
        }
    }
}
// attaches form if didn't do before
function addForm() {
    output('addForm', arguments);
    //
    if ($(`#${addWordFormStr}`).length) return;
    //
    $chooseLanguageForm.after(`<form id="${addWordFormStr}">
    ${createFields()}
        ${setButton('save')}
        ${setButton('save-xtra')}
    </form>`);
}
/**
 * Get the part of dictionary containing words of selected language
 */
function getLangWords() {
    return getData(dict => dict[getTargetLanguage()]);
}
/**  Вставляет список слов в html.
 * параметры: 
 * словарь (из json-данных);
 * подстрока в текстовом поле; 
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function makeWordsList(dictionary, substring) {
    output('makeWordsList', arguments, 'violet');
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
// 
function clearList() {
    output('clearList', arguments, "darkkhaki");
    $view.html("");
    $sentencesTranslated.html("");
}
// get chosen language string
/* function getTargetLanguage() {
    output('getTargetLanguage', arguments);
    return $chooseLanguageSelect.val() || console.warn('No selected value', {
        $chooseLanguageSelect: $chooseLanguageSelect,
        select: $chooseLanguageSelect.find("option:selected"),
        value: $chooseLanguageSelect.find("option:selected").val()
    });
} */
/**
 * hide the word initial input as language hadn't chosen.
 * @param {*}  
 */
/* function hideInput($wordInput) {
    output('hideInput', arguments);
    $wordInput
        .attr('disabled', 'disabled')
        .hide(1000, () => {
            $noticeChooseLanguage.fadeIn();
            return false;
        });
} */
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
 * show the word initial input if was hidden before as language hadn't chosen.
 */
/* function showInput() {
    output('showInput', arguments);
    const $wordInput = $(`#${wordId}`),
        disabled = 'disabled';
    if (!$wordInput.attr(disabled)) {
        return;
    }
    $noticeChooseLanguage.fadeOut(() => {
        $wordInput.removeAttr(disabled)
            .show(1000);
    });
} */
/**
 * 
 * @param {*} element 
 */
function getNativeWord(element) {
    output('getNativeWord', arguments);
    return $(element).parent().find(".nativeWord");
}
/**
 * 
 * @param {*} element 
 * @param {*} add 
 */
function handleTranslateWord(element, add) {
    output('handleTranslateWord', arguments);
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
    $(element)[`${btnEditClassAction}Class`](btnEditSelector)[`${classAction}Class`](btnCancelSelector);
}
//
function editTranslatedWord(element) {
    output('editTranslatedWord', arguments);
    handleTranslateWord(element, true);
}
//
function editTranslatedWordCancel(element) {
    output('editTranslatedWordCancel', arguments);
    handleTranslateWord(element);
}
//
function manageSentence(element, eventType) {
    output('manageSentence', arguments);
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
    output('removeForm', arguments, "goldenrod");
    const $form = $(`#${addWordFormStr}`);
    if ($form.length) $form.remove();
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
/**
 * Make initial languages choice
 */
function checkInitLangs(currentSel) {
    // all selects
    const $langSelects = $(langSelects);
    //
    $langSelects.eq(0).val() == $langSelects.eq(1).val()
        ? (type = 'cancel', action = 'add')
        : (type = 'submit', action = 'remove');
    //
    $langSelects[`${action}Class`]('border-red-outline');
    storeSelects.dispatch({ type: type });
}
/**
 * 
 */
function setLangsInfo(langs) {
    output('setLangsInfo', arguments, 'green');
    if (!langs) {
        langs = getLang();
    }
    const $langsBlock = $(`#${hdrLanguage}`);
    $(Object.keys(langs)).each((index, element) => {
        console.log({
            data: index + ':' + element,
            selector: $langsBlock.find(`span[data-lang="${element}"]`),
            text: langs[element]
        });
        $langsBlock.find(`span[data-lang="${element}"]`).text(langs[element]);
    });
}