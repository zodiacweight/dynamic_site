// 
const globals = {
        languages: {
            english: 'English',
            portuguese: 'Portugues',
            russian: 'Русский'
        }
    },
    // buttons (classes, ids)
    btnApplySelector = 'btn-apply',
    btnCancelSelector = 'btn-cancel',
    btnEditSelector = 'btn-edit',
    btnSaveSelector = 'btn-save',
    btnSaveXtraSelector = 'btn-save-xtra',
    btnAttachSelector = 'btn-attach',
    // ids
    addWordId = "addWord",
    addWordFormId = "addWordForm",
    cmdSettingsLangId = 'command-settings-langs',
    inputAttachId = 'input-attach',
    hdrLanguageId = 'header-language',
    wordId = 'word',
    newWordId = 'new-word',
    newWordSentencesId = 'new-word-sentences',
    sectionChooseLangId = 'section-choose-language',
    // end ids
    // classes
    activeClass = 'active',
    editableClass = 'editable',
    inputAttachClass = 'input-attach',
    nativeWordClass = 'nativeWord',
    wordClass = 'word',
    // end classes
    // selectors
    langSelects = `#${sectionChooseLangId} select`,
    // end selectors
    // elements
    $forms = $("#forms"),
    // section above view
    $mainSection = $('#main'),
    // get container for dynamic contente
    $view = $('#view'),
    // get container for translated content
    $sentencesTranslated = () => $('#sentences-translated'),
    // form
    $chooseLanguageForm = $("#chooseLanguage");