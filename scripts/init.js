// 
const btnApplySelector = 'btn-apply',
    btnCancelSelector = 'btn-cancel',
    btnEditSelector = 'btn-edit',
    btnSaveSelector = 'btn-save',
    btnSaveXtraSelector = 'btn-save-xtra',
    btnAttachSelector = 'btn-attach',
    inputAttachSelector = 'input-attach',
    addWordId = 'addWordStr',
    wordId = 'word',
    newWordId = 'new-word',
    newWordSentencesId = 'new-word-sentences',
    $noticeChooseLanguage = $('#notice-choose_language'),
    sectionChooseLangId = 'section-choose-language',
    langSelects = `#${sectionChooseLangId} select`,
    languages = {
        english:'English',
        portuguese:'Portugues'
    },
    //
    addWordStr = "addWord",
    addWordFormStr = "addWordForm",
    activeClass = 'active',
    $forms = $("#forms"),
    // section above view
    $mainSection = $('#main'),
    // get container for dynamic contente
    $view = $('#view'),
    // get container for translated content
    $sentencesTranslated = $('#sentences-translated'),
    // form
    $chooseLanguageForm = $("#chooseLanguage"),
    // select containing languages
    $chooseLanguageSelect = $chooseLanguageForm.find('select');