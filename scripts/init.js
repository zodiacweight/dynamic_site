// 
const globals = {
        languages: {
            english: 'English',
            portuguese: 'Portugues',
            russian: 'Русский'
        }
    },
    minWordLength = 1,
    // buttons (classes, ids)
    btnApplySelector = 'btn-apply',
    btnAttachSelector = 'btn-attach',
    btnCancelSelector = 'btn-cancel',
    btnEditSelector = 'btn-edit',
    btnRemoveSelector = 'btn-remove',
    btnSaveSelector = 'btn-save',
    btnSaveXtraSelector = 'btn-save-xtra',
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