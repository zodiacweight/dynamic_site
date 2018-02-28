/**
 * Add a new word to the dictionary
 * @param {Object} event 
 */
function addNewWord() {
    outputGroupped('addNewWord', arguments);
    const $inputAttach = $(`#${inputAttachId}`),
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
    // dictionary[word];
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
    $popUp.addClass(visibleClass);
    console.groupEnd();
}
/**
 * Make initial languages choice
 */
function checkInitLangs(event) {
    outputGroupped('checkInitLangs', arguments);
    // all selects
    const currentSel = event.target,
        $langSelects = $(langSelects);
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
        targetHTML = cellToEdit.innerHTML,
        len = cellToEdit.innerHTML.length,
        minLen = minWordLength + 1,
        [$cellToEdit, cellIndex, $parent] = indexEditorBtn(cellToEdit);
    //
    if (findInDictionary(targetHTML, cellIndex)) {
        $parent.addClass(repeatedClass);
        $cellToEdit.after(setButton('warning'));
        $(`.${btnApplySelector}`).hide();
    } else {
        $parent.removeClass(repeatedClass).find(`.${btnWarning}`).remove();
        $(`.${btnApplySelector}`).show();
    }
    // check if the input is not shorter than minimal length
    if (len === minLen) {
        // store minimal word in order to keep it in cell
        dataStore.editor.words.set(targetHTML);
        console.groupEnd();
        return 1;
    } else if (len < minLen) {
        alert('Too short: ' + len);
        // restore minimal word
        targetHTML = dataStore.editor.words.get();
        console.groupEnd();
        return false;
    }
    console.groupEnd();
    return true;
}
/**
 * Store edited word, transorm span to the editable area
 * @param {Object} event 
 */
function editTranslatedWord(event) {
    outputGroupped('editTranslatedWord', arguments, 'darkr');
    // storeWordEdit.dispatch({ type: 'edit' }); // default
    //const $btnEdit = $(btnEdit), btnIndex = $btnEdit.parent('.word').index();
    const btnEdit = event.target,
        [$btnEdit, btnIndex, $parent] = indexEditorBtn(btnEdit);
    dataStore.editor.set(btnIndex, $btnEdit.next().text());
    // console.log('get state=>', { $btnEdit: $btnEdit, btnIndex: btnIndex, editorStored: dataStore.editor.get() });
    handleTranslateWord(btnEdit, true);
    $parent.find(`.${btnRemoveSelector}`).hide();
    console.groupEnd();
}
/**
 * Get edited word back, transorm the editable area into span
 * @param {Object} event 
 */
function editTranslatedWordCancel(event) {
    outputGroupped('editTranslatedWordCancel', arguments);
    const btnCancel = event.target,
        [$btnCancel, btnIndex, $parent] = indexEditorBtn(btnCancel),
        storedValue = dataStore.editor.get(btnIndex);
    //
    handleTranslateWord(btnCancel).text(storedValue);
    dataStore.editor.remove(btnIndex);
    $parent.find(`.${btnRemoveSelector}`).show();
    console.groupEnd();
}
/** */
function hidePopUp() {
    $popUp.removeClass(visibleClass);
}
/**
 * Prevents the value of the new word input to be shorter than the 
 * word in the search string
 * @param {Object} event 
 */
function keepNewWordInputSynchronized(event) {
    outputGroupped('keepNewWordInputSynchronized', arguments);
    const wordValue = $(`#${wordId}`).val(),
        $targetCell = $(event.target),
        targetCellVal = event.target.value;
    // console.log(event.target, event.target.value, event.target.value.length);
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
    } else { // eventTarget: div.wrapper, eventCurrentTarget: div.word.active
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
    if (targetWordValue.length > minWordLength) {
        const list = createWordsList(targetWordValue);
        if (list) {
            makeWordsList(targetWordValue);
            removeForm();
        } else {
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
    delete dict[$parent.find(`.${nativeWordClass}`).text()];
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
    const nativeWord = $(`#${wordId}`).val(),
        translatedValue = $(`#${newWordId}`).val(),
        $textAreas = $(`#${newWordSentencesId} textarea`),
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
        wordEdited = $(btn).prev().text(),
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