// 
const
    addWordId = 'addWordStr',
    btnApplySelector = 'btn-apply',
    btnCancelSelector = 'btn-cancel',
    btnEditSelector = 'btn-edit',
    btnSaveSelector = 'btn-save',
    btnSaveXtraSelector = 'btn-save-xtra',
    btnAttachSelector = 'btn-attach',
    cmdSettingsLang = 'command-settings-langs',
    hdrLanguage = 'header-language',
    inputAttachSelector = 'input-attach',
    wordId = 'word',
    newWordId = 'new-word',
    newWordSentencesId = 'new-word-sentences',
    //$noticeChooseLanguage = $('#notice-choose_language'),
    sectionChooseLangId = 'section-choose-language',
    langSelects = `#${sectionChooseLangId} select`,
    languages = {
        english: 'English',
        portuguese: 'Portugues',
        russian: 'Русский'
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
    $chooseLanguageForm = $("#chooseLanguage")
    // select containing languages
    // ,$chooseLanguageSelect = $chooseLanguageForm.find('select')
    ;