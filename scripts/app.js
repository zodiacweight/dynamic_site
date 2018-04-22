/** */
function addNewSentenceInput() {
    outputGroupped('addNewSentenceInput', arguments);
    const $lastInput = ()=>$(_inputAttachTranslatedSelector).last();
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
    const $inputAttach = _$newWordInput()
      , word = $inputAttach.val();
    let mess = checkWordLengthTooShort(word);
    if (mess) {
        console.warn(mess);
        markInputTooShortLength($inputAttach);
        console.groupEnd();
        return false;
    }
    console.log('new word=>', word);
    const dictionary = dataStore.get();
    dictionary[word] = {};
    $(_inputAttachTranslatedSelector).each((index,element)=>{
        dictionary[word][element.value] = [];
    }
    );
    storeDictionary(dictionary);
    makeWordsList(getNewWordValue());
    console.groupEnd();
}
/**
 * Add a new word and load pop-up window to add a sentence
 * after clicking the button Add + Sentence (#btn-attach-sentence)
 */
function addNewWordAndSentence(event) {
    outputGroupped('addNewWordAndSentence', arguments);
    if (!_$newWordInput().val()) {
        return false;
    }
    const $lastTranslatedInput = $(_inputAttachTranslatedSelector).last();
    // if there is not value for a translated word, mark the input
    if (!$lastTranslatedInput.val()) {
        $lastTranslatedInput.addClass(_wordRedClass);
        setTimeout(()=>{
            $lastTranslatedInput.removeClass(_wordRedClass);
        }
        , 3000);
        return false;
    }
    storeSentences.dispatch({
        type: 'add'
    });
    editTranslatedSentence(event);
    console.groupEnd();
}
/**
 * 
 * @param {Object} event 
 */
function addNewWordTranslated(event) {
    outputGroupped('addNewWordTranslated', arguments);
    putNativeWordIntoPopUp(event.target);
    //console.log('event=>',event);
    showPopUp(true);
    console.groupEnd();
}
/**
 * Make initial languages choice
 */
function checkInitLangs(event) {
    outputGroupped('checkInitLangs', arguments);
    // all selects
    const currentSel = event.target
      , $langSelects = $(_langSelectsSelector);
    let type, action;
    //
    $langSelects.eq(0).val() == $langSelects.eq(1).val() ? (type = 'cancel',
    action = 'add') : (type = 'submit',
    action = 'remove');
    //
    $langSelects[`${action}Class`]('border-red-outline');
    storeSelects.dispatch({
        type: type
    });
    console.groupEnd();
}
/**
 * // check string length and keep a minimal one
 * @param {Object} event 
 */
function checkInputText(event) {
    outputGroupped('checkInputText', arguments, 'violet');
    const cellToEdit = event.target
      , targetHTML = cellToEdit.innerText
      , storedWordText = $(cellToEdit).data(_originWordStr)
      , len = cellToEdit.innerHTML.length
      , minLen = _minWordLength + 1
      , [$cellToEdit,,$parent] = indexEditorBtn(cellToEdit);
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
 * Check if the word presents in dictionary already
 * @param {Object} event 
 */
function checkNewTranslatedWordCoincidence(event) {
    outputGroupped('checkNewTranslatedWordCoincidence', arguments);
    let $targetCell = $(event.target)
        , takenWord = findInDictionary($targetCell.val(), _popUp.$nativeWord.text())
        , $btnSaveSentence = $(`#${_btnSaveSentenceSelector}`)
        , dsbl = 'disabled'
        , ttl = 'title';
    if (takenWord) {
        $targetCell.addClass(_repeatedClass).attr(ttl, _wordIsTaken);
        $btnSaveSentence.attr(dsbl, dsbl);
    } else {
        $targetCell.removeClass(_repeatedClass).removeAttr(ttl);
        $btnSaveSentence.removeAttr(dsbl);
    }
    console.groupEnd();
}
/**
 * Edit a sentence which is attached to the translated word
 * @param {Object} event dblClick
 */
function editTranslatedSentence(event) {
    outputGroupped('editTranslatedSentence', arguments);
    _translation.editSentence = true;
    const $element = $(event.target);
    if ($element.hasClass(_btnAddSentenceSelector) || $element.hasClass(_btnEditSentenceSelector)) {
        storeSentences.dispatch({
            type: 'edit'
        });
    }
    // 
    const state = storeSentences.getState();
    let nClass;
    // state 'edit' is set in editTranslatedWord
    if (state == 'edit') {
        const [,btnParentIndex] = indexEditorBtn($element)
          , $parentNativeWordContainer = getParentActive($element)
          , index = $parentNativeWordContainer.index();
        // store index of sentence
        _translation.translatedWordSentenceIndex = btnParentIndex;
        _translation.$translatedWordSentenceContainer = getSentence(index, btnParentIndex);
        putNativeWordIntoPopUp($element, $parentNativeWordContainer);
        //_popUp.$nativeWord.text($parentNativeWordContainer.find(`.${_nativeWordClass}`).text());
        _popUp.$translatedWord.text($element.prev(`.${_translatedWordClass}`).text());
        _popUp.$textarea.val((()=>_translation.$translatedWordSentenceContainer.text())().trim());
    } else if (state == 'add') {
        _translation.$translatedWordSentenceContainer = $(`#${_newWordBlockId}`).find(_inputAttachTranslatedSelector);
        _popUp.$nativeWord.text($(`#${_inputAttachId}`).val());
        _popUp.$translatedWordNew.val($(_inputAttachTranslatedSelector).last().val());
        nClass = true;
    } else {
        console.warn('Unknown state for the translated sentence...');
    }
    //
    showPopUp(nClass);
    _translation.editSentence = false;
    console.groupEnd();
}
/**
 * Store edited word, transorm span to the editable area
 * @param {Object} event 
 */
function editTranslatedWord(event) {
    outputGroupped('editTranslatedWord', arguments, 'darkr');
    const $container = getParentActive(event.target);
    //_translation.$nativeWord = $container.find(`.${_nativeWordClass}`).text();
    _popUp.$nativeWord.text($container.find(`.${_nativeWordClass}`).text());
    storeSentences.dispatch({
        type: 'edit'
    });
    // fixme: get rid of this! Remove setTimeout
    //setTimeout(()=>{ outputGroupped('editTranslatedWord', arguments, 'darkr');
        if (!_translation.editSentence) {
            //
            const [,,$parent] = indexEditorBtn(event.target);
            //
            handleTranslateWord(event.target, true);
            $parent.find(`.${_btnRemoveSelector}`).hide();
        }
        console.groupEnd();
    //} , 200);
}
/**
 * Get edited word back, transorm the editable area into span
 * @param {Object} event 
 */
function editTranslatedWordCancel(event) {
    outputGroupped('editTranslatedWordCancel', arguments);
    const [,,$parent] = indexEditorBtn(event.target);
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
    outputGroupped('handleTranslatedWordInput', arguments);
    const attrDisabled = 'disabled';
    checkWordLengthTooShort(event.target.value) 
        ? $btn.attr(attrDisabled, attrDisabled).removeClass(_activeClass) 
        : $btn.removeAttr(attrDisabled).addClass(_activeClass);
    console.groupEnd();
}
/** */
function hidePopUp() {
    output('hidePopUp', arguments);
    _translation.cancel();
    storeSentences.dispatch({
        type: false
    });
    _popUp.clear();
}
/**
 * 
 * @param {Object} event 
 */
function hideBtnSentenceAction(event) {
    output('showBtnSentenceAction', arguments);
    $(event.target).removeClass('visible');
}
/**
 * Prevents the value of the new word input to be shorter than the 
 * word in the search string
 * @param {Object} event 
 */
function keepNewWordInputSynchronized(event) {
    outputGroupped('keepNewWordInputSynchronized', arguments);
    const wordValue = $(`#${_wordId}`).val()
      , $targetCell = $(event.target)
      , targetCellVal = event.target.value;
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
    const $element = $(event.currentTarget)
      , eventType = event.type
      , $sentenceTranslatedBlock = _$sentencesTranslated();
    // if container with translated word
    if ($element.hasClass(_wrapperClass)) {
        const indexWord = getParentActive($element, _activeClass).index()
          , indexSentence = $element.index()
          , $sentence = getSentence(indexWord, indexSentence, $sentenceTranslatedBlock);
        //
        if (eventType == 'mouseenter') {
            $sentenceTranslatedBlock.removeClass(_initialClass).find(`.${_sentencesClass}`).hide();
            $sentenceTranslatedBlock.find(`.${_sentencesClass}`).eq(indexWord).show();
            $sentence.fadeIn(200);
        } else {
            $sentence.hide();
            $sentenceTranslatedBlock.addClass(_initialClass);
            if (getParentActive($element, _activeClass).length) {
                console.groupEnd();
                return;
            }
        }
    } else {
        // if container with native word
        // eventTarget: div.wrapper, eventCurrentTarget: div.word.active
        const $wrappers = $element.find(`section > .${_wrapperClass}`)
          , $singleSentence = $wrappers.length === 1 ? getSentence($element.index(), $wrappers.index(), $sentenceTranslatedBlock) : false;
        if (eventType == 'mouseenter') {
            if (!$element.hasClass(_activeClass)) {
                $element.addClass(_activeClass);
            }
            if ($singleSentence) {
                $singleSentence.fadeIn(200);
                $sentenceTranslatedBlock.removeClass(_initialClass);
            }
        } else {
            if ($view.find(`.${_wordClass}`).length > 1) {
                $element.removeClass(_activeClass);
            }
            if ($singleSentence) {
                $singleSentence.hide();
                $sentenceTranslatedBlock.addClass(_initialClass);
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
    const $wordInput = $(event.target)
      , targetWordValue = $wordInput.val();
    //
    if (targetWordValue.length > _minWordLength) {
        const list = createWordsList(targetWordValue);
        if (list) {
            removeForm();
            makeWordsList(targetWordValue);
        } else {
            clearList();
            addForm(true);
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
    if ($(_inputAttachTranslatedSelector).length === 1)
        $btn.remove();
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
    const btn = event.target
      , [,,$parent] = indexEditorBtn(btn)
      , dictionary = dataStore.get()
      , nativeWord = getParentActive(btn).find(`.${_nativeWordClass}`).text()
      , wordData = dictionary[nativeWord];
    // remove word
    if ($parent.hasClass(_wrapperClass)) {
        const wordToDelete = $(btn).prev().text();
        if (Array.isArray(wordData)) {
            const wordsArray = wordData[0];
            delete wordsArray.splice[wordsArray.indexOf(wordToDelete),
            1];
        } else {
            delete wordData[wordToDelete];
        }
    } else {
        delete dictionary[nativeWord];
    }
    //    
    console.log(dictionary);
    storeDictionary(dictionary);
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
 * @param {Object} event 
 */
function showBtnSentenceAction(event) {
    output('showBtnSentenceAction', arguments);
    const [$target,parentIndex,$parent] = indexEditorBtn(event.target);
    if ($target.hasClass(_translatedWordClass)) {
        if ($parent.find(`.${_btnAddSentenceSelector}`).length || $parent.find(`.${_btnEditSentenceSelector}`).length) {
            return;
        }
        let sentence;
        const dictionary = dataStore.get()
          , word = getParentActive($target).find(`.${_nativeWordClass}`).text()
          , btnClassNameAction = (()=>{
            const wordContent = dictionary[word];
            sentence = Array.isArray(wordContent) ? wordContent[1][parentIndex] : wordContent[Object.keys(wordContent)[parentIndex]].length;
            return sentence ? 'edit' : 'add';
        }
        )();
        const btn = setButton(`${btnClassNameAction}-sentence`)
          , $btn = $(btn);
        $target.after($btn);
    } else {
        $target.addClass('visible');
    }
}
/** 
 * Store edited sentence
*/
function storeSentence(event) {
    outputGroupped('storeSentence', arguments);
    const dictionary = dataStore.get()
      , state = storeSentences.getState();
    if (state == 'edit') {
        const text = $(event.target).parent(`.${_contentClass}`).find('textarea').val()// prefferable to be an Object, but may be presented as an Array (a remnant of the previous approach)
          //, wordData = dictionary[_translation.$nativeWord]
          , wordData = dictionary[_popUp.$nativeWord.text()]
          , tIndex = _translation.translatedWordSentenceIndex || 0
          , editedSentence = _popUp.$textarea.val();
        // rewrite the sentence
        Array.isArray(wordData) ? wordData[1][tIndex] = editedSentence : wordData[Object.keys(wordData)[tIndex]][0] = editedSentence
        _translation.$translatedWordSentenceContainer.text(editedSentence);
    } else if (state == 'add') {
        const word = _popUp.$nativeWord.text();
        dictionary[word] = {};
        _translation.$translatedWordSentenceContainer.each((index,input)=>{
            dictionary[word][input.value] = [];
            if (index === _translation.$translatedWordSentenceContainer.length - 1) {
                dictionary[word][input.value].push(_popUp.$textarea.val());
            }
        }
        );
    } else {
        console.warn('No state for storeSentence...');
    }
    storeDictionary(dictionary);
    //
    _translation.cancel();
    storeSentences.dispatch({
        type: false
    });
    //
    hidePopUp();
    makeWordsList(getNewWordValue(_inputAttachId));
    $(`#${_wordId}`).trigger('input');
    console.groupEnd();
}
/**
 * 
 * @param {*} element 
 */
function storeWord() {
    outputGroupped('storeWord', arguments, 'darkred');
    const nativeWord = getNewWordValue()
      , translatedValue = $(`#${_newWordId}`).val()
      , $textAreas = $(`#${_newWordSentencesId} textarea`)
      , dictionary = getLangWords();

    if (!translatedValue) {
        console.error('Have no any translated word...');
        console.groupEnd();
        return false;
    }
    // set array element, index 0
    // then we get thing like this:
    dictionary[nativeWord] = [[translatedValue]];
    dictionary[nativeWord].push([]);
    let sentences;
    // here we need to detect what to add into word array 
    // as translated sentence -- a string, if there
    // is only a single textarea resides or an array
    // if there is more than one.
    if ($textAreas.length > 1) {
        sentences = [];
        $textAreas.each(function() {
            sentences.push(this.value);
        });
    } else {
        sentences = $textAreas.eq(0).val();
    }
    // push the second element into array
    dictionary[nativeWord][1].push(sentences);
    console.groupEnd();
}
/**
 * 
 * @param {Object} event -- button being clicked 
 */
function storeWordEdited(event) {
    outputGroupped('storeWordEdited', arguments, 'darkred');
    const btn = event.target
      , $wordSpan = $(btn).prev()
      , dictionary = getDictionary()
      , [$btn,,$parent] = indexEditorBtn(btn)
      , initialWord = $wordSpan.data(_originWordStr)
      , editedWord = $wordSpan.text();
    //
    if ($parent.hasClass(_wrapperClass)) {
        const $nativeWord = getParentActive(btn).find(`.${_nativeWordClass}`)
          , parentWord = $nativeWord.data(_originWordStr) || $nativeWord.text()
          , // fixme: unify type (array | object)
        wordContents = dictionary[parentWord]
          , storedWordData = $wordSpan.data(_originWordStr);
        console.log('words=>', {
            editedWord: editedWord,
            parentWord: parentWord
        });
        //
        if (Array.isArray(wordContents)) {
            wordContents[0].some((wordToChange,index)=>{
                if (wordToChange === storedWordData) {
                    wordContents[0][index] = editedWord;
                    return true;
                }
                return false;
            }
            );
        } else if (toString.call(wordContents) === "[object Object]") {
            Object.keys(wordContents).some((wordToChange,index)=>{
                if (wordToChange === storedWordData) {
                    wordContents[editedWord] = wordContents[wordToChange];
                    delete wordContents[wordToChange];
                    return true;
                }
                return false;
            }
            );
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
