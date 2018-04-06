// 
const _globals = {
    languages: {
        english: 'English',
        portuguese: 'Portugues',
        russian: 'Русский'
    }
},
    _translation = {
        $nativeWord: false, // jQuery object
        $translatedWordSentenceContainer: false, // jQuery object
        // translatedWord: false, // string, for new sentence case only
        translatedWordSentenceIndex: false, // number
        editSentence: false
        // , cancel() see bellow, added through Object.defineProperty
    },
    _minWordLength = 1,
    // buttons (classes, ids)
    _btnAdd = 'btn-add',
    _btnAddTranslatedSelector = 'btn-add-translated',
    _btnApplySelector = 'btn-apply',
    _btnAttachSelector = 'btn-attach',
    _btnAttachSentenceSelector = 'btn-attach-sentence',
    _btnCancelSelector = 'btn-cancel',
    _btnEditSelector = 'btn-edit',
    _btnRemoveSelector = 'btn-remove',
    _btnRemoveTranslatedSelector = 'btn-remove-translated',
    _btnSaveSelector = 'btn-save',
    _btnSaveSentenceSelector = 'btn-save-sentence',
    _btnSaveXtraSelector = 'btn-save-xtra',
    _btnWarningSelector = 'btn-warning',
    // ids
    _addWordId = "addWord",
    _addWordFormId = "addWordForm",
    _cmdSettingsLangId = 'command-settings-langs',
    _newWordBlockId = 'new-word-block',
    _inputAttachId = 'input-attach',
    _hdrLanguageId = 'header-language',
    _wordId = 'word',
    _newWordId = 'new-word',
    _newWordSentencesId = 'new-word-sentences',
    _sectionChooseLangId = 'section-choose-language',
    _sectionTranslatedId = 'sentences-translated',
    _translatedWordPopUp = 'translated-word-pop-up',
    // end ids
    // classes
    _activeClass = 'active',
    _blockAddWordTranslatedClass = 'block-add-word-translated',
    _contentClass = 'content',
    _editableClass = 'editable',
    _initialClass = 'initial',
    _inputAttachClass = 'input-attach',
    _nativeWordClass = 'nativeWord',
    _newClass = 'new',
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
    // static elements
    $mainSection = $('#main'),
    $popUp = $('#pop-up'),
    $sentenceTextArea = $popUp.find(`.${_contentClass} textarea`),
    // get container for dynamic contente
    $view = $('#view'),
    // dynamic elements
    //
    _$newWordInput = () => $(`#${_inputAttachId}`),
    _$sentencesTranslated = () => $(`#${_sectionTranslatedId}`),
    // form
    _$chooseLanguageForm = () => $("#chooseLanguage");

// add method to clear values
Object.defineProperty(_translation, 'cancel', {
    value: () => {
        Object.keys(_translation).forEach(prop => {
            _translation[prop] = false;
        })
    }
});