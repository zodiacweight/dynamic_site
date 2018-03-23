// 
const _globals = {
        languages: {
            english: 'English',
            portuguese: 'Portugues',
            russian: 'Русский'
        }
    },
    _minWordLength = 1,
    // buttons (classes, ids)
    _btnAddTranslatedSelector = 'btn-add-translated',
    _btnApplySelector = 'btn-apply',
    _btnAttachSelector = 'btn-attach',
    _btnAttachSentenceSelector = 'btn-attach-sentence',
    _btnCancelSelector = 'btn-cancel',
    _btnEditSelector = 'btn-edit',
    _btnRemoveSelector = 'btn-remove',
    _btnRemoveTranslatedSelector = 'btn-remove-translated',
    _btnSaveSelector = 'btn-save',
    _btnSaveXtraSelector = 'btn-save-xtra',
    _btnWarningSelector = 'btn-warning',
    // ids
    _addWordId = "addWord",
    _addWordFormId = "addWordForm",
    _cmdSettingsLangId = 'command-settings-langs',
    _inputAttachId = 'input-attach',
    _hdrLanguageId = 'header-language',
    _wordId = 'word',
    _newWordId = 'new-word',
    _newWordSentencesId = 'new-word-sentences',
    _sectionChooseLangId = 'section-choose-language',
    _sectionTranslatedId = 'sentences-translated',
    // end ids
    // classes
    _activeClass = 'active',
    _contentClass = 'content',
    _editableClass = 'editable',
    _initialClass = 'initial',
    _inputAttachClass = 'input-attach',
    _nativeWordClass = 'nativeWord',
    _repeatedClass = 'repeated',
    _sentencesClass = 'sentences',
    _translatedClass = 'translated',
    _translatedWordClass = 'translatedWord',
    _visibleClass = 'visible',
    _wordClass = 'word',
    _wordRedClass = 'word-red',
    _wrapperClass = 'wrapper',
    // end classes
    // selectors
    _langSelectsSelector = `#${_sectionChooseLangId} select`,
    _inputAttachTranslatedSelector = `.${_inputAttachClass}.${_translatedClass}`,    
    //    
    // end selectors
    // strings
    _originWordStr = 'original-word',
    _wordIsTaken = 'The word is taken already',
    _wordIsTooShort = 'The word is too short',
    // end strings
    // elements
    $forms = $("#forms"),
    // section above view
    $mainSection = $('#main'),
    $popUp = $('#pop-up'),
    $sentenceTextArea = $popUp.find(`.${_contentClass} textarea`),
    // get container for dynamic contente
    $view = $('#view'),
    // get container for translated content
    $sentencesTranslated = () => $(`#${_sectionTranslatedId}`),
    // form
    $chooseLanguageForm = $("#chooseLanguage");