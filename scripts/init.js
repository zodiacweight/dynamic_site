// 
const languages = {
    "португальский": "portuguese",
    "английский": "english"
},
    btnSaveId = 'btn-save',
    btnAttachId = 'btn-attach',
    inputAttachId = 'input-attach',
    addWordStr = "addWord",
    addWordId = `#${addWordStr}`,
    addWordFormStr = "addWordForm",
    activeClass = 'active',
    $forms = $("#forms"),
    // get container for dynamic contente
    $view = $('#view'),
    // get container for translated content
    $sentencesTranslated = $('#sentences-translated'),
    // 
    $chooseLanguage = $("#chooseLanguage");