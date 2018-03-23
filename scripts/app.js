/** */
function addNewSentenceInput() {
    outputGroupped('addNewSentenceInput', arguments);
    const $lastInput = () => $(_inputAttachTranslatedSelector).last();
    $lastInput().after(setInput('translated'));
    if ($(_inputAttachTranslatedSelector).length === 2) {
        $lastInput().after(setButton('remove-translated'));
    }
    console.groupEnd();
}
/**
 * Add a new word to the dictionary
 * @param {Object} event 
 */
function addNewWord() {
    outputGroupped('addNewWord', arguments);
    const $inputAttach = $(`#${_inputAttachId}`),
        word = $inputAttach.val();
    let mess = checkWordLengthTooShort(word);
    if (mess) {
        console.warn(mess);
        markInputTooShortLength($inputAttach);
        console.groupEnd();
        return false;
    }
    console.log('new word=>', word);
    const dictionary = dataStore.get();
    console.groupEnd();
}
/**
 * Add a new word and load pop-up window to add a sentence
 */
function addNewWordAndSentence() {
    outputGroupped('addNewWordAndSentence', arguments);
    if (!addNewWord()) {
        return false;
    };
    $popUp.addClass(_visibleClass);
    console.groupEnd();
}
/**
 * Make initial languages choice
 */
function checkInitLangs(event) {
    outputGroupped('checkInitLangs', arguments);
    // all selects
    const currentSel = event.target,
        $langSelects = $(_langSelectsSelector);
    let type, action;
    //
    $langSelects.eq(0).val() == $langSelects.eq(1).val()
        ? (type = 'cancel', action = 'add')
        : (type = 'submit', action = 'remove');
    //
    $langSelects[`${action}Class`]('border-red-outline');
    storeSelects.dispatch({ type: type });
    console.groupEnd();
}
/**
 * // check string length and keep a minimal one
 * @param {Object} event 
 */
function checkInputText(event) {
    outputGroupped('checkInputText', arguments, 'violet');
    const cellToEdit = event.target,
        targetHTML = cellToEdit.innerText,
        storedWordText = $(cellToEdit).data(_originWordStr),
        len = cellToEdit.innerHTML.length,
        minLen = _minWordLength + 1,
        [$cellToEdit, cellIndex, $parent] = indexEditorBtn(cellToEdit);
    // check if the dictionary contains that word already
    if (targetHTML === storedWordText) {
        $parent.removeClass(_repeatedClass).find(`.${_btnWarningSelector}`).remove();
        $(`.${_btnApplySelector}`).show();
    } else if (findInDictionary(targetHTML, storedWordText)) {
        $parent.addClass(_repeatedClass);
        $cellToEdit.after(setButton('warning'));
        $(`.${_btnApplySelector}`).hide();
    }
    // check if the input is not shorter than minimal length
    if (len === minLen) {
        // store minimal word in order to keep it in cell
        console.groupEnd();
        return 1;
    } else if (len < minLen) {
        alert('Too short: ' + len);
        // restore minimal word
        console.groupEnd();
        return false;
    }
    console.groupEnd();
    return true;
}
/**
 * Edit a sentence which is attached to the translated word
 * @param {Object} event 
 */
function editTranslatedSentence(event) {
    outputGroupped('editTranslatedSentence', arguments);
    $(btnEditTranslatedWord).data('sentence-editing', true);
    var t2 = setTimeout(() => {    
            $(btnEditTranslatedWord).removeData('sentence-editing');
        }, 300);
    console.groupEnd();
}
var btnEditTranslatedWord;
/**
 * Store edited word, transorm span to the editable area
 * @param {Object} event 
 */
function editTranslatedWord(event) {
    btnEditTranslatedWord = event.target;
    setTimeout(() => {
        outputGroupped('editTranslatedWord', arguments, 'darkr');
        if (!$(btnEditTranslatedWord).data('sentence-editing')) {
            //
            const [, , $parent] = indexEditorBtn(event.target);
            //
            handleTranslateWord(event.target, true);
            $parent.find(`.${_btnRemoveSelector}`).hide();
        } 
        console.groupEnd();
    }, 200);
}
/**
 * Get edited word back, transorm the editable area into span
 * @param {Object} event 
 */
function editTranslatedWordCancel(event) {
    outputGroupped('editTranslatedWordCancel', arguments);
    const [, , $parent] = indexEditorBtn(event.target);
    //
    handleTranslateWord(event.target);
    //
    $parent.find(`.${_btnRemoveSelector}`).show();
    console.groupEnd();
}
/**
 * 
 * @param {Object} event 
 */
function handleTranslatedWordInput(event) {
    const $btn = $(event.target).next(`.${_btnAddTranslatedSelector}`),
        attrDisabled = 'disabled';
    checkWordLengthTooShort(event.target.value)
        ? $btn.attr(attrDisabled, attrDisabled).removeClass(_activeClass)
        : $btn.removeAttr(attrDisabled).addClass(_activeClass);
}
/** */
function hidePopUp() {
    $popUp.removeClass(_visibleClass);
}
/**
 * Prevents the value of the new word input to be shorter than the 
 * word in the search string
 * @param {Object} event 
 */
function keepNewWordInputSynchronized(event) {
    outputGroupped('keepNewWordInputSynchronized', arguments);
    const wordValue = $(`#${_wordId}`).val(),
        $targetCell = $(event.target),
        targetCellVal = event.target.value;
    //
    if (targetCellVal.length < wordValue.length) {
        $targetCell.val(wordValue);
        console.groupEnd();
        return;
    } else {
        // remove mark that word is too short
        markInputTooShortLengthCancel($targetCell);
        //
        checkNewWordCoincidence($targetCell, targetCellVal);
    }
    console.groupEnd();
}
/**
 * @param {Object} event .word || .wrapper >span'
 */
function manageSentence(event) {
    outputGroupped('manageSentence', arguments, 'blue');
    // target or currentTarget matter on mouseleave
    const element = event.currentTarget,
        eventType = event.type;
    //
    if (element.className == _wrapperClass) {
        const indexWord = $(element).parents('.active').eq(0).index(),
            indexSentence = $(element).parent(`.${_wrapperClass}`).index(),
            $sentenceTranslatedBlock = $sentencesTranslated(),
            $sentence = $sentenceTranslatedBlock
                .find('.sentences')
                .eq(indexWord)
                .find(`.${_wrapperClass}`).eq(indexSentence);
        if (eventType == 'mouseenter') {
            $sentence.fadeIn(200);
            $sentenceTranslatedBlock.removeClass(_initialClass);
        } else {
            $sentence.hide();
            $sentenceTranslatedBlock.addClass(_initialClass);
        }
    } else { // eventTarget: div.wrapper, eventCurrentTarget: div.word.active
        if (eventType == 'mouseenter') {
            if (!$(element).hasClass(_activeClass)) {
                $(element).addClass(_activeClass);
            }
        } else {
            if ($view.find(`.${_wordClass}`).length > 1) {
                $(element).removeClass(_activeClass);
            }
        }
    }
    console.groupEnd();
}
/**
 * 
 * @param {Object} event 
 */
function manageWordsList(event) {
    outputGroupped('manageWordsList', arguments, 'orangered');
    const $wordInput = $(event.target),
        targetWordValue = $wordInput.val();
    //
    if (targetWordValue.length > _minWordLength) {
        const list = createWordsList(targetWordValue);
        if (list) {
            makeWordsList(targetWordValue);
            removeForm();
        } else {
            clearList();
            addForm();
        }
        // remove or add form depending wheter does it added already or not
    } else {
        // it checks inside if the button exitss
        removeForm();
        // 
        clearList();
    }
    console.groupEnd();
}
/**
 * Remove input and button
 * @param {Object} event 
 */
function removeNewSentenceInput(event) {
    output('removeNewSentenceInput', arguments);
    const $btn = $(event.target);
    $btn.prev(_inputAttachTranslatedSelector).remove();
    if ($(_inputAttachTranslatedSelector).length === 1) $btn.remove();
}
/**
 * Remove the word from dictionary, call to store
 * @param {Object} event 
 */
function removeWord(event) {
    outputGroupped('removeWord', arguments, 'red');
    if (!confirm('Are you sure?')) {
        console.groupEnd();
        return;
    }
    const btn = event.target,
        [, , $parent] = indexEditorBtn(btn),
        dict = dataStore.get();
    //
    delete dict[$parent.find(`.${_nativeWordClass}`).text()];
    console.log(dict);
    storeDictionary(dict);
    // remove word container (hide in order not to touch editor object)
    $parent.hide();
    console.groupEnd();
}
/** 
 * 
*/
function setLanguages() {
    outputGroupped('setLanguages', arguments);
    //
    if (storeSelects.getState() == 'canceled') {
        alert('You have chosen the same language');
        console.groupEnd();
        return false;
    } else {
        // load it anyway, as we click the button explicitly
        loadDictionary(storeLanguagesSet(), setMainView);
    }
    console.groupEnd();
}
/**
 * 
 * @param {*} element 
 */
function storeWord() {
    outputGroupped('storeWord', arguments, 'darkred');
    const nativeWord = $(`#${_wordId}`).val(),
        translatedValue = $(`#${_newWordId}`).val(),
        $textAreas = $(`#${_newWordSentencesId} textarea`),
        dict = getLangWords();

    if (!translatedValue) {
        console.error('Have no any translated word...');
        console.groupEnd();
        return false;
    }
    // set array element, index 0
    // then we get thing like this:
    dict[nativeWord] = [[translatedValue]];
    dict[nativeWord].push([]);
    let sentences;
    // here we need to detect what to add into word array 
    // as translated sentence -- a string, if there
    // is only a single textarea resides or an array
    // if there is more than one.
    if ($textAreas.length > 1) {
        sentences = [];
        $textAreas.each(function () {
            sentences.push(this.value);
        });
    } else {
        sentences = $textAreas.eq(0).val();
    }
    // push the second element into array
    dict[nativeWord][1].push(sentences);
    console.groupEnd();
}
/**
 * 
 * @param {Object} event -- button being clicked 
 */
function storeWordEdited(event) {
    outputGroupped('storeWordEdited', arguments, 'darkred');
    const btn = event.target,
        $wordSpan = $(btn).prev(),
        dictionary = getDictionary(),
        [$btn, btnIndex, $parent] = indexEditorBtn(btn),
        initialWord = $wordSpan.data(_originWordStr),
        editedWord = $wordSpan.text();
    //
    if ($parent.hasClass(_wrapperClass)) {
        const $nativeWord = $parent.parents(`.${_wordClass}`).eq(0).find(`.${_nativeWordClass}`),
            parentWord = $nativeWord.data(_originWordStr) || $nativeWord.text(),
            // fixme: unify type (array | object)
            wordContents = dictionary[parentWord],
            storedWordData = $wordSpan.data(_originWordStr);
        console.log('words=>', { editedWord: editedWord, parentWord: parentWord });
        //
        if (Array.isArray(wordContents)) {
            wordContents[0].some((wordToChange, index) => {
                if (wordToChange === storedWordData) {
                    wordContents[0][index] = editedWord;
                    return true;
                }
                return false;
            });
        } else if (toString.call(wordContents) === "[object Object]") {
            Object.keys(wordContents).some((wordToChange, index) => {
                if (wordToChange === storedWordData) {
                    wordContents[editedWord] = wordContents[wordToChange];
                    delete wordContents[wordToChange];
                    return true;
                }
                return false;
            });
        } else {
            console.warn('wordContents is not an Object =>', toString.call(wordContents));
        }
    } else {
        dictionary[editedWord] = Object.assign(dictionary[initialWord]);
        delete dictionary[initialWord];
    }
    storeDictionary(dictionary);
    $wordSpan.text(editedWord).removeData();
    // drop editable view
    $parent.find(`.${_btnCancelSelector}`).trigger('click');
    console.groupEnd();
}

// ===============
function output(fnc, args, color) {
    if (fnc) {
        color ? console.groupCollapsed(`%c${fnc}`, `color:${color}`) : console.groupCollapsed(fnc);
    } else {
        console.groupCollapsed(`%c^Container`, 'padding: 1px 2px; background-color:#ddd; font-weight: normal; border:solid 1px #666;');
    }
    console.trace();
    console.log(args);
    console.groupEnd();
}

function outputGroupped(fnc, args, color) {
    const style = 'padding:1px 2px; border:solid 1px #666;'
    console.groupCollapsed(`%c${fnc}`, color ? `color: ${color}; ${style}` : style);
    output(null, args, color);
}