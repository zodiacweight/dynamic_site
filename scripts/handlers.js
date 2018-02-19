// git -c http.sslVerify=false push origin master
$(function () {
    // show/hide words/sentences
    $view.on('mouseenter mouseleave', `> .${wordClass}, .wrapper >span`, function (event) {
        manageSentence(this, event.type);
    }) // click on the button to edit translated word
        .on("click", `.${btnEditSelector}`, function () {
            editTranslatedWord(this);
        })
        .on('click', `.${btnCancelSelector}`, function () {
            editTranslatedWordCancel(this);
        })
        .on('click', `.${btnRemoveSelector}`, function () {
            if (confirm('Are you sure?')) {
                removeWord(this);
            }
        })
        // $view 
        .on('keypress input blur', `#${inputAttachId}`, keepNewWordInputSynchronized)
        .on('click', `.${btnApplySelector}`, function(){
            storeWordEdited(this);
        });
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
                // load it anyway, as we click the button explicitly
                loadDictionary(storeLanguagesSet(), setMainView);
            }
        })
        .on('click', `#${cmdSettingsLangId}`, () => {
            setInitView(false);
        })
        // Creates words list and add / remove form
       .on('input keyup', `#${wordId}`, // input#word
            event => { // calling on jQuery object
           //console.log("input: ", event.target.value);
           const $wordInput = $(event.target),
               targetWordValue = $wordInput.val(),
               disabled = 'disabled';
           
           if ($wordInput.attr('disabled')) {
               return;
           }
           //
           if (targetWordValue.length > 2) {
               const list = createWordsList(targetWordValue);
               if (list) {
                    makeWordsList(targetWordValue);
                    removeForm();
               } else {
                   addForm();
               }
               // remove or add form depending wheter does it added already or not
               // window[list ? 'removeForm' : 'addForm']();
           } else {
               // it checks inside if the button exitss
               removeForm();
               // 
               clearList();
           }
       });
});