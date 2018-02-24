/**
 * Add a new word to the dictionary
 * @param {Object} event 
 */
function addNewWord() {
    output('addWord', arguments);
    console.log('new word=>', $(`#${inputAttachId}`).val());
}
/**
 * Make initial languages choice
 */
function checkInitLangs(event) {
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
}
/**
 * // check string length and keep a minimal one
 * @param {Object} event 
 */
function checkInputText(event) {
    output('checkInputText', arguments);
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
    //
    if (len === minLen) {
        // store minimal word in order to keep it in cell
        dataStore.editor.words.set(targetHTML);
        return 1;
    } else if (len < minLen) {
        alert('Too short: ' + len);
        // restore minimal word
        targetHTML = dataStore.editor.words.get();
        return false;
    }    
    return true;
}
/**
 * Store edited word, transorm span to the editable area
 * @param {Object} event 
 */
function editTranslatedWord(event) {
    output('editTranslatedWord', arguments);
    // storeWordEdit.dispatch({ type: 'edit' }); // default
    //const $btnEdit = $(btnEdit), btnIndex = $btnEdit.parent('.word').index();
    const btnEdit = event.target,
        [$btnEdit, btnIndex, $parent] = indexEditorBtn(btnEdit);
    dataStore.editor.set(btnIndex, $btnEdit.next().text());
    // console.log('get state=>', { $btnEdit: $btnEdit, btnIndex: btnIndex, editorStored: dataStore.editor.get() });
    handleTranslateWord(btnEdit, true);
    $parent.find(`.${btnRemoveSelector}`).hide();
}
/**
 * Get edited word back, transorm the editable area into span
 * @param {Object} event 
 */
function editTranslatedWordCancel(event) {
    output('editTranslatedWordCancel', arguments);
    const btnCancel = event.target,
        [$btnCancel, btnIndex, $parent] = indexEditorBtn(btnCancel),
        storedValue = dataStore.editor.get(btnIndex);
    //
    handleTranslateWord(btnCancel).text(storedValue);
    dataStore.editor.remove(btnIndex);
    $parent.find(`.${btnRemoveSelector}`).show();
    // console.log('storedValue, editor =>', {$btnCancel:$btnCancel, btnIndex:btnIndex, storedValue:storedValue, editor:dataStore.editor.get()});
}
/**
 * Prevents the value of the new word input to be shorter than the 
 * word in the search string
 * @param {Object} event 
 */
function keepNewWordInputSynchronized(event) {
    output('keepNewWordInputSynchronized', arguments);
    const wordValue = $(`#${wordId}`).val(),
        $targetCell = $(event.target),
        targetCellVal = $targetCell.val();
    // console.log(event.target, event.target.value, event.target.value.length);
    if (targetCellVal.length < wordValue.length) {
        targetCellVal = wordValue;
        return;
    } else {
        checkNewWordCoincidence($targetCell, targetCellVal);
    }
}
/**
 * @param {Object} event .word || .wrapper >span'
 */
function manageSentence(event) {
    output('manageSentence', arguments);
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
}
/**
 * 
 * @param {Object} event 
 */
function manageWordsList(event) {
    output('manageWordsList', arguments, 'orangered');
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
}
/**
 * Remove the word from dictionary, call to store
 * @param {Object} event 
 */
function removeWord(event) {
    output('removeWord', arguments, 'red');
    if (!confirm('Are you sure?')) {
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
}
/** 
 * 
*/
function setLanguages() {
    //
    if (storeSelects.getState() == 'canceled') {
        alert('You have chosen the same language');
        return false;
    } else {
        // load it anyway, as we click the button explicitly
        loadDictionary(storeLanguagesSet(), setMainView);
    }
}
/**
 * 
 * @param {*} element 
 */
function storeWord() {
    output('storeWord', arguments, 'darkred');
    const nativeWord = $(`#${wordId}`).val(),
        translatedValue = $(`#${newWordId}`).val(),
        $textAreas = $(`#${newWordSentencesId} textarea`);

    const dict = getLangWords();

    if (!translatedValue) {
        console.error('Have no any translated word...');
        return false;
    }
    // set array element, index 0
    // then we get thing like this:
    // 
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
    console.log('Check result=>', {
        nativeWord: nativeWord,
        'dict[nativeWord]': dict[nativeWord],
        sentences: sentences,
        dict: dict
    });
    //const added = JSON.stringify({ word: wordValue, sentence: sentenceValue });
    //localStorage.setItem(nativeWord, added);
    //console.log("localStorage[nativeWord]: ", localStorage.getItem(nativeWord));
    // const checkedLanguage = getTargetLanguage();
    /**
     * 1. Сначала объект получает все данные из json-файла;
       2. Из этого объекта данные передаются в localStorage;
       3. При клике по кнопке "сохранить":
       3.1 Изменения в объекте;
       3.2 Синхронизация объекта с localStorage - те же изменения;
       3.3 Синхронизация объекта с json-данными.
     */
}
/**
 * 
 * @param {Object} event -- button being clicked 
 */
function storeWordEdited(event) {
    output('storeWordEdited', arguments, 'darkred');
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
}

// ===============
function output(fnc, args, color) {
    color ? console.groupCollapsed('%c' + fnc, 'color:' + color) : console.groupCollapsed(fnc);
    console.trace();
    console.log(args);
    console.groupEnd();
}