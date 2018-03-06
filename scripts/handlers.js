// git -c http.sslVerify=false push origin master
$(function () {
    let wordStore;
    // show/hide words/sentences
    $popUp.on('click', `.${_btnCancelSelector}`, hidePopUp);

    $view // click on the button to edit translated word
        .on('mouseenter mouseleave',
            `> .${_wordClass}, .wrapper`, manageSentence)
        .on("click",
            `.${_btnEditSelector}`, editTranslatedWord)
        .on('click',
            `.${_wordClass} .${_btnCancelSelector}`, editTranslatedWordCancel)
        .on('click',
            `.${_btnRemoveSelector}`, removeWord)
        .on('click',
            `.${_btnAddTranslatedSelector}`, addNewSentenceInput)
        .on('click',
            `.${_btnRemoveTranslatedSelector}`, removeNewSentenceInput)
        .on('click',
            `.${_btnApplySelector}`, storeWordEdited)
        .on('click',
            `.${_btnAttachSelector}`, addNewWord)
        .on('click',
            `.${_btnAttachSentenceSelector}`, addNewWordAndSentence)
        .on('keypress input blur',
            `#${_inputAttachId}`, keepNewWordInputSynchronized)
        .on('keypress input blur',
            `.${_inputAttachClass}.${_translatedClass}`, handleTranslatedWordInput)
        .on('keypress input',
            `.${_editableClass} .${_nativeWordClass}`, checkInputText);
    // click on #addWord
    // note: not in use, but is going to be...
    $chooseLanguageForm.on("click", `#${_addWordId}`, () => {
        $chooseLanguageForm.after(createForm());
    });
    // changing select option
    /* $chooseLanguageSelect.on('change', () => {
        showInput();
        storeLanguagesSet();
    }); */
    // store the word
    $forms.on("click", `#${_btnSaveSelector}`, storeWord);
    // changing the language in the initial lists (native/foregn)
    $mainSection
        .on('change', 
            _langSelectsSelector, checkInitLangs)  // store languages in localStorage
        .on('click', 
            `#${_btnSaveSelector}`, setLanguages)
        .on('click', 
            `#${_cmdSettingsLangId}`, setInitView) // in view
        // Creates words list and add / remove form
        .on('input keyup', 
            `#${_wordId}`, manageWordsList); // input#word
});