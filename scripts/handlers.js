// git -c http.sslVerify=false push origin master
$(function () {
    /** 
     * Creates words list and add / remove form
    */
    $(`#${wordId}`).on('input keyup', e => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        var $wordInput = $(e.target),

            targetWordValue = $wordInput.val(),
            disabled = 'disabled';
        if ($wordInput.attr('disabled')) {
            return;
        }

        /* if (!$chooseLanguageSelect.val()) {
            hideInput($wordInput);
            return;
        } */

        if (targetWordValue.length > 2) {

            const list = createWordsList(targetWordValue);
            // console.log('list=>',{list:list, length:targetWordValue.length, targetWordValue:targetWordValue});
            /* if(list!==""){
                content='<div class="word active">'+
                            '<input class="btn-edit" type="button">'+    
                            '<span>🖉</span><span id="nativeWord">облако</span>'+
                            '<section>'+
                                '<div class="wrapper">'+
                                    '<div id="translatedWord">'+
                                        list+
                                    '</div>'+
                                '</div>'+
                            '</section>'+
                        '</div>';
            } */
            // if the word is new and there are 3 letters in the field

            // remove or add form depending wheter does it added already or not
            window[list ? 'removeForm' : 'addForm']();

            // if the button doesn't exist, add id
            // createList(targetWordValue)
            /* if(!$(addWordId).length){ // без lenght - объект, с length - 0.
                if (!$view.html()){
                    if($("#deleteWord").length){
                        $("#deleteWord").remove();
                    }

                }

                //if(!($("#deleteWord")).length){
                    //$chooseLanguageForm.append('<input type="button" id="deleteWord" value="удалить слово">');
                //}
                //console.log("in this place");
            } */ /* else {
                // check if we have the words which the substring conforms of
                Object.keys(words).forEach((word) => {
                    if (word.indexOf(targetWordValue)!==-1){
                        // if we have a word with such a substring then remove the button
                        removeForm();
                    }
                });
            } */
        } else {
            // it checks inside if the button exitss
            removeForm();
            // 
            clearList();
        }
    });
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
            
            if (storeSelects.getState()=='canceled'){
                alert('You have chosen the same language');
                return false;
            } else {
                storeLanguagesSet();
                setMainView();
            }
        })
        .on('click', `#${cmdSettingsLang}`, () => {
            setInitView(false);
        });
});