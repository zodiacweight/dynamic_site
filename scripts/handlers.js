// git -c http.sslVerify=false push origin master
$(function () {
    let wordStore;
    // show/hide words/sentences
    $popUp.on('click', `.${btnCancelSelector}`, hidePopUp);
    
    $view // click on the button to edit translated word
        .on('mouseenter mouseleave',
            `> .${wordClass}, .wrapper >span`, manageSentence)
        .on("click",
            `.${btnEditSelector}`, editTranslatedWord)
        .on('click',
            `.${wordClass} .${btnCancelSelector}`, editTranslatedWordCancel)
        .on('click',
            `.${btnRemoveSelector}`, removeWord)
        .on('click',
            `.${btnApplySelector}`, storeWordEdited)
        .on('click',
            `.${btnAttachSelector}`, addNewWord)
        .on('click',
            `.${btnAttachSentenceSelector}`, addNewWordAndSentence)
        .on('keypress input blur',
            `#${inputAttachId}`, keepNewWordInputSynchronized)
        .on('keypress input',
            `.${nativeWordClass}.${editableClass}`, checkInputText);
    // click on #addWord
    // note: not in use, but is going to be...
    $chooseLanguageForm.on("click", `#${addWordId}`, () => {
        $chooseLanguageForm.after(createForm());
    });
    // changing select option
    /* $chooseLanguageSelect.on('change', () => {
        showInput();
        storeLanguagesSet();
    }); */
    // store the word
    $forms.on("click", `#${btnSaveSelector}`, storeWord);
    // changing the language in the initial lists (native/foregn)
    $mainSection
        .on('change', langSelects, checkInitLangs)  // store languages in localStorage
        .on('click', `#${btnSaveSelector}`, setLanguages)
        .on('click', `#${cmdSettingsLangId}`, setInitView) // in view
        // Creates words list and add / remove form
        .on('input keyup', `#${wordId}`, manageWordsList) // input#word
});