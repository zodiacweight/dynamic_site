// git -c http.sslVerify=false push origin master
$(function () {
    let wordStore;
    // show/hide words/sentences
    $popUp.on('click', `.${_btnCancelSelector}`, hidePopUp);

    $view
        .on('mouseenter mouseleave', // 
            `> .${_wordClass}, .${_wrapperClass}`, manageSentence)
        .on("click", // *pen* icon, to edit a translated word
            `.${_btnEditSelector}`, editTranslatedWord)
        .on("dblclick", // *pen* icon, to edit a translated sentence
            `.${_btnEditSelector}`, editTranslatedSentence)
        .on('click', // *cancel* icon which previous one is turned into
            `.${_wordClass} .${_btnCancelSelector}`, editTranslatedWordCancel)
        .on('click',
            `.${_btnRemoveSelector}`, removeWord)
        .on('click',
            `.${_btnAddTranslatedSelector}`, addNewSentenceInput)
        .on('click',
            `.${_btnRemoveTranslatedSelector}`, removeNewSentenceInput)
        .on('click', // *save* edited word icon
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