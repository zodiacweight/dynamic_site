/**
 * 
 * @param {String} lang 
 */
function getDictionary(lang){
    return localStorage.getItem(`dict_${lang}`);
}
/**
 * 
 */
function getLang() {
    output('getLang', arguments);
    return localStorage.getItem('lang')
}
/**
 * 
 * @param {*} dict -- data
 * @param {*} lang -- language
 */
function storeDictionary(dict, lang){
    localStorage.setItem(`dict_${lang}`, dict);
}
/**
 * store chosen language in DB
 */
function storeLanguageChoice() {
    output('storeLanguageChoice', arguments);
    const ln = 'lang', lang = $chooseLanguageSelect.val();
    lang ? localStorage.setItem(ln, lang) : localStorage.removeItem(ln);
}
/**
 * 
 * @param {*} element 
 */
function storeWord() {
    output('storeWord', arguments);
    const nativeWord = $(`#${wordId}`).val(),
        translatedValue = $(`#${newWordId}`).val(),
        $textAreas = $(`#${newWordSentencesId} textarea`);

    const dict = getLangWords();

    if (!translatedValue) {
        console.error('Have no any translated word...');
        return false;
    }
    // set array element, index 0
    // then we get thing like this:
    // 
    dict[nativeWord] = [[translatedValue]];
    dict[nativeWord].push([]);
    let sentences;
    // here we need to detect what to add into word array 
    // as translated sentence -- a string, if there
    // is only a single textarea resides or an array
    // if there is more than one.
    if ($textAreas.length>1){
        sentences = [];
        $textAreas.each(function(){
            sentences.push(this.value);
        });
    } else {
        sentences = $textAreas.eq(0).val();
    }
    // push the second element into array
    dict[nativeWord][1].push(sentences);
    console.log('Check result=>', {
        nativeWord:nativeWord,
        'dict[nativeWord]':dict[nativeWord],
        sentences:sentences,
        dict:dict
    });
    //const added = JSON.stringify({ word: wordValue, sentence: sentenceValue });
    //localStorage.setItem(nativeWord, added);
    //console.log("localStorage[nativeWord]: ", localStorage.getItem(nativeWord));
    // const checkedLanguage = getTargetLanguage();
    /**
     * 1. Сначала объект получает все данные из json-файла;
       2. Из этого объекта данные передаются в localStorage;
       3. При клике по кнопке "сохранить":
       3.1 Изменения в объекте;
       3.2 Синхронизация объекта с localStorage - те же изменения;
       3.3 Синхронизация объекта с json-данными.
     */
}