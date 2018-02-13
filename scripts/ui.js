// *Only returns HTML*
/**
 * 
 */
function createFields() {
    output('createFields', arguments);
    return `<section>
    <input type="text" id="${newWordId}" placeholder="translation for the word">
    <div id="new-word-sentences">
        <textarea placeholder="sentence for the word"></textarea>
        <button class="add-textarea">+</button>
    </div>
</section>`;
}
/**
 * 
 */
function createForm() {
    output('createForm', arguments);
    return `<form id='${addWordFormStr}'>
    ${createFields()}
        <input type="button" value="добавить ячейку" id="${addWordStr}">
        ${setButton('save')}
        <input type="button" value="Отменить" id="btn-cancel">
    </form>`;
}
/**
 * Creates words' list
 * @param {Object} words 
 * @param {String} substring 
 */
function createNewWordList(words, substring) {
    output('createNewWordList', arguments, "rgb(0,100,255)");
    let list = "",
        sentences = "",
        wordsLen = 0;
    //
    Object.keys(words).forEach(word => { // console.log('check it=>', {word:word, wordData: words[word], words:words, substring:substring});
        if (word.indexOf(substring) !== -1) {
            list += `
            <div class='word'>
                ${setButton("edit")}
                <span class="nativeWord">${word}</span>
                <section>`;
            ++wordsLen;
            sentences += `
                <div class="sentences">`;
            //console.log('word set=>', words[word]);
            words[word][0].forEach((translatedWord, index) => {
                // console.log("words[wprd]: ", words[word]);
                const sentence = words[word][1][index] || '&nbsp;';
                sentences += `
                    <div class='wrapper' class="sentence">${sentence}</div>`;
                list += `
                    <div class='wrapper'>
                        <span class="translatedWord">${translatedWord}</span>
                    </div>`;
            });
            list += `
                </section>
            </div>`;
            sentences += `
                </div>`;
        }
    });
    return [list, sentences, wordsLen];
}
/**
 * 
 * @param {String} id 
 */
function makeSelect(id) {
    return `<select id="${id}">
    <option value="">-choose-</option>
</select>`;
}
/**
 * Create options for languages listing
 */
function makeLangSelectOptions() {
    var langList = '';
    Object.keys(globals.languages).forEach(lang => {
        langList += `<option value="${lang}">${globals.languages[lang]}</option>`;
    });
    return langList;
}
/**
 * Creates list containing translated words
 * @param {*} targetWordValue 
 */
function createWordsList(targetWordValue) {
    output('createWordsList', arguments, 'blue');
    let list = "";
    // dataStore.get returns words list
    Object.keys(dataStore.get(targetWordValue)).forEach(word => {
        if (word.indexOf(targetWordValue) !== -1) {
            list += `<div>${word}</div>`;
        }
    }); console.log('list=>', list);
    return list;
}
/**
 * 
 */
function setAttachedWord() {
    output('setAttachedWord', arguments);
    return `<input type="text" value="${$(`#${wordId}`).val()}" class="${inputAttachSelector}" id="${inputAttachSelector}">
${setButton('attach')}`;
}
/**
 * 
 * @param {*} btn_type 
 */
function setButton(btn_type) {
    output('setButton', arguments, 'green');
    switch (btn_type) {
        case 'add':
            return `<input class="btn-add" type="button">`;
            break;
        case 'edit':
            return `<button class='${btnEditSelector}' type="button">&nbsp;</button>`;
            break;
        case 'save':
            return `<input type="button" value="Save" id="${btnSaveSelector}">`;
            break;
        case 'save-xtra':
            return `<input type="button" value="Save & Add" id="${btnSaveXtraSelector}">`;
            break;
        case 'attach':
            return `<button id="" class="${btnAttachSelector}" type="button">Добавить</button>`;
            break;
    }
}
