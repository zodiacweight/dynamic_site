function getLang() {
    output('getLang', arguments);
    return localStorage.getItem('lang')
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
        translatedValue = $(`#${newWordId}`).val();

    const dict = getLangWords();

    if (!translatedValue) {
        console.error('Have no any translated word...');
        return false;
    }

    dict[translatedValue] = [];

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