// 
const _globals = {
    languages: {
        english: 'English',
        portuguese: 'Portugues',
        russian: 'Русский'
    },
    serverAddress: 'http://localhost:8888/'
},
    _translation = {
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
    _btnAddSentenceSelector = 'btn-add-sentence',
    _btnApplySelector = 'btn-apply',
    _btnAttachSelector = 'btn-attach',
    _btnAttachSentenceSelector = 'btn-attach-sentence',
    _btnCancelSelector = 'btn-cancel',
    _btnEditSelector = 'btn-edit',
    _btnEditSentenceSelector = 'btn-edit-sentence',
    _btnRemoveSelector = 'btn-remove',
    _btnRemoveTranslatedSelector = 'btn-remove-translated',
    _btnSaveSelector = 'btn-save',
    _btnSaveSentenceSelector = 'btn-save-sentence',
    _btnSaveXtraSelector = 'btn-save-xtra',
    _btnWarningSelector = 'btn-warning',
    // ids
    _addWordFormId = "addWordForm",
    _addWordId = "addWord",
    _cmdSettingsLangId = 'command-settings-langs',
    /* _inputAttachId = 'input-attach', */
    _nativeWordPopUp = 'native-word-pop-up',
    _newWordBlockId = 'new-word-block',
    _newWordId = 'new-word',
    _hdrLanguageId = 'header-language',
    _newWordSentencesId = 'new-word-sentences',
    _sectionChooseLangId = 'section-choose-language',
    _sectionTranslatedId = 'sentences-translated',
    _translatedWordPopUp = 'translated-word-pop-up',
    _translatedWordNewPopUp = 'translated-word-new-pop-up',
    _wordId = 'word',
    // end ids
    // classes
    _activeClass = 'active',
    _blockAddWordTranslatedClass = 'block-add-word-translated',
    _contentClass = 'content',
    _editableClass = 'editable',
    _initialClass = 'initial',
    //_inputAttachClass = 'input-attach',
    _nativeWordClass = 'nativeWord',
    _newClass = 'new',
    _repeatedClass = 'repeated',
    _sentencesClass = 'sentences',
    _translatedClass = 'translated',
    _translatedWordClass = 'translatedWord',
    _visibleClass = 'visible',
    _views = {
        settings:'app-settings',
        app:'app-main',
    },
    _wordClass = 'word',
    _wordRedClass = 'word-red',
    _wrapperClass = 'wrapper',
    // end classes
    // selectors
    _langSelectsSelector = `#${_sectionChooseLangId} select`,
    //_inputAttachTranslatedSelector = `.${_inputAttachClass}.${_translatedClass}`,
    // 
    // end selectors
    // strings
    _originWordStr = 'original-word',
    _wordIsTaken = 'The word is taken already',
    _wordIsTooShort = 'The word is too short',
    // end strings
    // static elements
    $mainSection = $('#main'),
    _popUp = {},
    $body = $('body'),
    // get container for dynamic contente
    $view = $('#view'),
    // dynamic elements
    //
    //_$newWordInput = () => $(`#${_inputAttachId}`),
    _$sentencesTranslated = () => $(`#${_sectionTranslatedId}`),

    // form
    _$chooseLanguageForm = () => $("#chooseLanguage");

// add method to clear values
Object.defineProperty(_translation, 'cancel', {
    value: () => {
        output('_popUp.cancel');
        Object.keys(_translation).forEach(prop => {
            _translation[prop] = false;
        })
    }
});
// add popUp elements
Object.defineProperties( _popUp, {
    '$el': {
        value: $('#pop-up')
    }
});
// set popUp blocks
Object.defineProperties(_popUp, {
    '$textarea': {
        value: _popUp.$el.find(`.${_contentClass} textarea`),
        enumerable: true
    },
    '$nativeWord': {
        value: _popUp.$el.find(`#${_nativeWordPopUp}`),
        enumerable: true
    },
    '$translatedWord': {
        value: _popUp.$el.find(`#${_translatedWordPopUp}`),
        enumerable: true
    },
    '$translatedWordNew': {
        value: _popUp.$el.find(`#${_translatedWordNewPopUp}`),
        enumerable: true
    }
});
// clear popUp fields
Object.defineProperty(_popUp, 'clear', {
    value: () => {
        output('_popUp.clear');
        _popUp.$nativeWord.text('');
        _popUp.$translatedWord.text('');
        _popUp.$textarea.val('');
        _popUp.$translatedWordNew.val('');
        _popUp.$el.removeClass(`${_visibleClass} ${_newClass}`);
        storeSentences.dispatch({type:false});
    }
});