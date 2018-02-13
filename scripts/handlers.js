// git -c http.sslVerify=false push origin master
$(function () {
    // show/hide words/sentences
    $view.on('mouseenter mouseleave', '> .word, .wrapper >span', function (event) {
        manageSentence(this, event.type);
    }) // click on the button to edit translated word
        .on("click", `.${btnEditSelector}`, function () {
            editTranslatedWord(this);
        })
        .on('click', `.${btnCancelSelector}`, function () {
            editTranslatedWordCancel(this);
        })
        // $view 
        .on('keypress input blur', `#${inputAttachSelector}`, keepNewWordInputSynchronized);
    // click on #addWord
    // note: not in use, but is going to be...
    $chooseLanguageForm.on("click", `#${addWordStr}`, () => {
        $chooseLanguageForm.after(createForm());
    });
    // changing select option
    /* $chooseLanguageSelect.on('change', () => {
        showInput();
        storeLanguagesSet();
    }); */
    // store the word
    $forms.on("click", `#${btnSaveSelector}`, function () {
        storeWord();
    });
    // changing the language in the initial lists (native/foregn)
    $mainSection.on('change', langSelects, function () {
        checkInitLangs(this);
    })  // store languages in localStorage
        .on('click', `#${btnSaveSelector}`, () => {
            //
            if (storeSelects.getState()=='canceled'){
                alert('You have chosen the same language');
                return false;
            } else {
                loadDictionary(storeLanguagesSet(), setMainView);
            }
        })
        .on('click', `#${cmdSettingsLang}`, () => {
            setInitView(false);
        })
        // Creates words list and add / remove form
       .on('input keyup', `#${wordId}`, e => { // calling on jQuery object
           //console.log("input: ", e.target.value);
           const $wordInput = $(e.target),
               targetWordValue = $wordInput.val(),
               disabled = 'disabled';
           
           if ($wordInput.attr('disabled')) {
               return;
           }
           //
           if (targetWordValue.length > 2) {
               const list = createWordsList(targetWordValue);
               // remove or add form depending wheter does it added already or not
               window[list ? 'removeForm' : 'addForm']();
           } else {
               // it checks inside if the button exitss
               removeForm();
               // 
               clearList();
           }
       });
});