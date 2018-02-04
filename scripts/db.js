function getLang(){
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
function storeWord(element) {
    output('storeWord', arguments);
    const nativeWord = $(`#${wordId}`)[0].value;
    //console.log("nativeWord: ", nativeWord);
    $(`#${addWordFormStr} div`).each(function () {
        //console.log("in the cycle");
        var $word,
            wordValue,
            $sentence;

        if ($word = $(element).find("input[type='text']")) {
            wordValue = $word.val();
        }
        if ($sentence = $(element).find("textarea")) {
            sentenceValue = $sentence.val();
        }

        const added = JSON.stringify({ translatedWord: word, sentence: sentence });
        localStorage.setItem(nativeWord, added);
        console.log("localStorage[nativeWord]: ", localStorage.getItem(nativeWord));
        const checkedLanguage = getTargetLanguage();
        /**
         * 1. Сначала объект получает все данные из json-файла;
           2. Из этого объекта данные передаются в localStorage;
           3. При клике по кнопке "сохранить":
           3.1 Изменения в объекте;
           3.2 Синхронизация объекта с localStorage - те же изменения;
           3.3 Синхронизация объекта с json-данными.
         */
    });
}