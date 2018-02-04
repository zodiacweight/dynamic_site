// *Only returns HTML*
/**
 * 
 */
function createFields() {
    console.trace('createFields', arguments);
    return `<div>
    <input type="text" placeholder="translation for the word">
        <textarea placeholder="sentence for the word"></textarea>
</div>`;
}
/**
 * 
 */
function createForm() {
    console.trace('createForm', arguments);
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
    console.trace('createNewWordList', arguments);
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
 * Creates list containing translated words
 * @param {*} targetWordValue 
 */
function createWordsList(targetWordValue) {
    console.trace('createWordsList', arguments);
    let list = "";
    // getData returns words list
    Object.keys(getData(makeWordsList, targetWordValue)).forEach(word => {
        if (word.indexOf(targetWordValue) !== -1) {
            list += `<div>${word}</div>`;
        }
    });
    return list;
}
/**
 * 
 */
function setAttachedWord() {
    console.trace('setAttachedWord', arguments);
    return `<input type="text" value="${$(`#${wordId}`).val()}" class="${inputAttachSelector}" id="${inputAttachSelector}">
${setButton('attach')}`;
}
/**
 * 
 * @param {*} btn_type 
 */
function setButton(btn_type) {
    console.trace('setButton', arguments);
    switch (btn_type) {
        case 'add':
            return `<input class="btn-add" type="button">`;
            break;
        case 'edit':
            return `<button class='${btnEditSelector}' type="button">&nbsp;</button>`;
            break;
        case 'save':
            return `<input type="button" value="Сохранить" id="${btnSaveSelector}">`;
            break;
        case 'attach':
            return `<button id="" class="${btnAttachSelector}" type="button">Добавить</button>`;
            break;
    }
}
