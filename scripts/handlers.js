// git -c http.sslVerify=false push origin master
$(function () {
    /** 
     * Creates words list and add / remove form
    */
    $(`#${wordId}`).on('input keyup', e => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        var content, targetWordValue = e.target.value;
        if (targetWordValue.length > 2) {

            const list = createWordsList(targetWordValue);
            // console.log('list=>',{list:list, length:targetWordValue.length, targetWordValue:targetWordValue});
            // remove or add form depending wheter does it added already or not
            window[list ? 'removeForm' : 'addForm']();
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
    $chooseLanguage.on("click", `#${addWordStr}`, () => {
        $chooseLanguage.after(createForm());
    });
    // store the word
    $forms.on("click", `#${btnSaveSelector}`, function () {
        storeWord(this)
    });
});