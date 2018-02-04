// 
const languages = {
    "португальский": "portuguese",
    "английский": "english"
},
    btnApplySelector = 'btn-apply',
    btnCancelSelector = 'btn-cancel',
    btnEditSelector = 'btn-edit',
    btnSaveSelector = 'btn-save',
    btnAttachSelector = 'btn-attach',
    inputAttachSelector = 'input-attach',
    addWordId = 'addWordStr',
    wordId = 'word',
    
    addWordStr = "addWord",
    addWordFormStr = "addWordForm",
    activeClass = 'active',
    $forms = $("#forms"),
    // get container for dynamic contente
    $view = $('#view'),
    // get container for translated content
    $sentencesTranslated = $('#sentences-translated'),
    // form
    $chooseLanguageForm = $("#chooseLanguage"),
    // select containing languages
    $chooseLanguageSelect = $chooseLanguageForm.find('select');