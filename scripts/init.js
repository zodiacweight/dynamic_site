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
    btnAttachSentenceSelector = 'btn-attach-sentence',
    btnCancelSelector = 'btn-cancel',
    btnEditSelector = 'btn-edit',
    btnRemoveSelector = 'btn-remove',
    btnSaveSelector = 'btn-save',
    btnSaveXtraSelector = 'btn-save-xtra',
    btnWarning = 'btn-warning',
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
    repeatedClass = 'repeated',
    visibleClass = 'visible',
    wordClass = 'word',
    wordRedClass = 'word-red',
    // end classes
    // selectors
    langSelects = `#${sectionChooseLangId} select`,
    // end selectors
    // strings
    wordIsTaken = 'The word is taken already',
    wordIsTooShort = 'The word is too short',
    // end strings
    // elements
    $forms = $("#forms"),
    // section above view
    $mainSection = $('#main'),
    $popUp = $('#pop-up'),
    // get container for dynamic contente
    $view = $('#view'),
    // get container for translated content
    $sentencesTranslated = () => $('#sentences-translated'),
    // form
    $chooseLanguageForm = $("#chooseLanguage");