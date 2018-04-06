// git -c http.sslVerify=false push origin master
$(function () {
    let wordStore;
    // show/hide words/sentences
    $popUp
        .on('click', // *close* icon
            `.${_btnCancelSelector}`, hidePopUp)
        .on('click', // *save* button
            `#${_btnSaveSentenceSelector}`, storeSentence);
    $view // click event
        .on('click',
            `.${_btnAddTranslatedSelector}`, addNewSentenceInput)
        .on('click',
            `.${_blockAddWordTranslatedClass} .${_btnAdd}`, addNewWordTranslated)
        .on('click', // *save* edited word icon
            `.${_btnApplySelector}`, storeWordEdited)
        .on('click',
            `.${_btnAttachSelector}`, addNewWord)
        .on('click',
            `.${_btnAttachSentenceSelector}`, addNewWordAndSentence)
        .on("click", // *pen* icon, to edit a translated word
            `.${_btnEditSelector}`, editTranslatedWord)
        .on('click',
            `.${_btnRemoveSelector}`, removeWord)
        .on('click',
            `.${_btnRemoveTranslatedSelector}`, removeNewSentenceInput)
        .on('click', // *cancel* icon which previous one is turned into
            `.${_wordClass} .${_btnCancelSelector}`, editTranslatedWordCancel)
        // dblclick event
        .on("dblclick", // *pen* icon, to edit a translated sentence
            `.${_btnEditSelector}`, editTranslatedSentence)
        // other mouse events
        .on('mouseenter mouseleave', // 
            `> .${_wordClass}, .${_wrapperClass}`, manageSentence)
        // key events
        .on('keypress input blur',
            `#${_inputAttachId}`, keepNewWordInputSynchronized)
        .on('keypress input blur',
        _inputAttachTranslatedSelector, handleTranslatedWordInput)
        .on('keypress input',
            `.${_editableClass} .${_nativeWordClass}`, checkInputText);
    // click on #addWord
    // note: not in use, but is going to be...
    _$chooseLanguageForm().on("click", `#${_addWordId}`, () => {
        _$chooseLanguageForm().after(createForm());
    });
    // changing the language in the initial lists (native/foregn)
    $mainSection
        .on('change',
            _langSelectsSelector, checkInitLangs)  // store languages in localStorage
        .on('click',
            `#${_btnSaveSelector}`, setLanguages)
        .on('click',
            `#${_cmdSettingsLangId}`, setInitView) // in view
        .on('click', `#forms #${_btnSaveSelector}`, // store the word
            storeWord)
        // Creates words list and add / remove form
        .on('input keyup',
            `#${_wordId}`, manageWordsList); // input#word
});