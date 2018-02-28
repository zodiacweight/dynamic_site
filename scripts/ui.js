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
    return `<form id='${addWordFormId}'>
    ${createFields()}
        <input type="button" value="добавить ячейку" id="${addWordId}">
        ${setButton('save')}
        <input type="button" value="Отменить" id="btn-cancel">
    </form>`;
}
/**
 * 
 * @param {*} translatedWord 
 * @param {*} sentences 
 * @param {*} listHTML 
 * @param {*} sent 
 */
function setSentence(translatedWord, sentences, listHTML, sent) {
    output('setSentence', arguments, "rgb(200,100,255)");
    if (!sent) {
        sent = '&nbsp;';
    } else if (Array.isArray(sent)) {
        sent = sent.join('\n');
    }
    sentences += `
        <div class='wrapper' class="sentence">${sent}</div>`;
    listHTML += `
        <div class='wrapper'>
            <span class="translatedWord">${translatedWord}</span>
        </div>`;
    return [sentences, listHTML];
}
/**
 * Creates words' list
 * @param {Object} words 
 * @param {String} substring 
 */
function createNewWordList(words, substring) {
    output('createNewWordList', arguments, "rgb(0,100,255)");
    let listHTML = "",
        sentences = "",
        wordsLen = 0;
    //
    Object.keys(words).forEach(word => {
        // console.log('check it=>', {word:word, wordData: words[word], words:words, substring:substring});
        if (word.indexOf(substring) !== -1) {
            listHTML += `
            <div class='word'>
                ${setButton("edit")}
                <span class="${nativeWordClass}">${word}</span>
                ${setButton("remove")}
                <section>`;
            ++wordsLen;
            sentences += `
                <div class="sentences">`;
            //
            if (Array.isArray(words[word])) {
                words[word][0].forEach((translatedWord, index) => {
                    [sentences, listHTML] = setSentence(translatedWord, sentences, listHTML, words[word][1][index]);
                });
            } else if (toString.call(words[word]) === '[object Object]') {
                Object.keys(words[word]).forEach(translatedWord => {
                    [sentences, listHTML] = setSentence(translatedWord, sentences, listHTML, // ["A rat is a gnawz. - Крыса грызун.", "Следующее предложение"]
                        words[word][translatedWord]);
                });
            } else {
                console.warn('words[word] is not either Array nor Object...');
            }
            listHTML += `
                </section>
            </div>`;
            sentences += `
                </div>`;
        }
    }
    );
    return [listHTML, sentences, wordsLen];
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
    }
    );
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
    }
    ); // console.log('list=>', list);
    return list;
}
/**
 * 
 */
function setAttachedWord() {
    output('setAttachedWord', arguments);
    return `
<input type="text" value="${$(`#${wordId}`).val()}" class="${inputAttachClass}" id="${inputAttachId}">
<input placeholder="Input a translated word here" type="text" class="${inputAttachClass} translated">
${setButton('add-translated')}
    ${setButton('attach')}
    ${setButton('sentence')}
    `;
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
        case 'add-translated':
            return `<button class="btn-add-translated" type="button"></button>`;
            break;
        case 'apply':
            return `<button class='${btnApplySelector}' type="button">✔</button>`;
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
            return `<button id="${btnAttachSelector}" class="${btnAttachSelector}" type="button">Add</button>`;
            break;
        case 'sentence':
            return `<button id="${btnAttachSentenceSelector}" class="${btnAttachSentenceSelector}" type="button">Add + sentence</button>`;
            break;
        case 'remove':
            return `<button class='${btnRemoveSelector}' type="button">&nbsp;</button>`;
            break;
        case 'warning':
            return `<button class='${btnWarning}' type="button" title="${wordIsTaken}">&nbsp;</button>`;
            break;
    }
}
