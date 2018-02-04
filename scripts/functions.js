/** 
 * After a first call this function turnes into the getData function
 * Get json file, store as dictionary, get Lang
 * @callback -- function to run inside after getting json
*/
function initData() { // becomes getData after first calling
    output('initData', arguments);
    const lang = getLang();
    //
    if (lang !== null) {
        // that's it, Dude: https://stackoverflow.com/questions/13343566/set-select-option-selected-by-value
        $chooseLanguageSelect.val(lang);
    }
    
    const path = "jsons/dictionary.json";
    var dictionary;
    // после первого вызова: getData
    return (callback, ...params) => {
        output('getData', arguments, 'orange');
        if (!callback) {
            $.get(path).done(json => {
                dictionary = json;
                console.log('%cI\'v got a dictionary =>', 'background-color: lightskyblue', dictionary);
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
/**  Вставляет список слов в html.
 * параметры: 
 * словарь (из json-данных);
 * подстрока в текстовом поле; 
 * переменная, означающая выбранный язык.
 * Ничего не возвращает.
*/
function makeWordsList(dictionary, substring) {
    output('makeWordsList', arguments);
    const words = (() => {
        return getData((dict) => {
            return dict[getTargetLanguage()];
        });
    })();
    // 
    if (!words) {
        console.warn('No words', {
            languages: languages,
            targetLang: getTargetLanguage(),
            dict: languages[getTargetLanguage()]
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
    output('clearList', arguments);
    $view.html("");
    $sentencesTranslated.html("");
}
// get chosen language string
function getTargetLanguage() {
    output('getTargetLanguage', arguments);
    return $chooseLanguageSelect.val() || console.warn('No selected value', {
        $chooseLanguageSelect: $chooseLanguageSelect,
        select: $chooseLanguageSelect.find("option:selected"),
        value: $chooseLanguageSelect.find("option:selected").val()
    });
}
/**
 * hide the word initial input as language hadn't chosen.
 * @param {*}  
 */
function hideInput($wordInput) {
    output('hideInput', arguments);
    $wordInput
        .attr('disabled', 'disabled')
        .hide(1000, () => {
            $noticeChooseLanguage.fadeIn();
            return false;
        });
}
/**
 * show the word initial input if was hidden before as language hadn't chosen.
 */
function showInput() {
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
    </form>`);
}
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
    output('removeForm', arguments);
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