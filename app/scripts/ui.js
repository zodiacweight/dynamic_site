// *Only returns HTML*
/**
 * 
 */
function createFields() {
    output('createFields', arguments);
    return `<section>
    <input type="text" id="${_newWordId}" placeholder="translation for the word">
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
    return `<form id='${_addWordFormId}'>
    ${createFields()}
        <input type="button" value="добавить ячейку" id="${_addWordId}">
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
        <div class='${_wrapperClass}' class="sentence">${sent}</div>`;
    listHTML += `
        <div class='${_wrapperClass}'>
            ${setButton("edit")}
            <span class="${_translatedWordClass}">${translatedWord}</span>
            ${setButton("remove")}
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
    Object.keys(words).sort().forEach(word => {
        //
        if (word.indexOf(substring) !== -1) {
            listHTML += `
            <div class='word'>
                ${setButton("edit")}
                <span class="${_nativeWordClass}">${word}</span>
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
                    <div class="${_blockAddWordTranslatedClass}">
                        <button class="${_btnAdd}">Add word</button>
                    </div>`;
            listHTML += `
                </section>
            </div>`;
            sentences += `
                </div>`;
        }
    });
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
    Object.keys(_globals.languages).forEach(lang => {
        langList += `<option value="${lang}">${_globals.languages[lang]}</option>`;
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
    });
    return list;
}
/**
 * 
 */
function getNewWordFormContents() {
    output('setAttachedWord', arguments);
    return `
<div id="${_newWordBlockId}">
    <input type="text" value="${$(`#${_wordId}`).val()}" class="${_inputAttachClass}" id="${_inputAttachId}">
    ${setInput('translated')}
    <!--${setButton('add-translated')}-->
    ${setButton('attach')}
    ${setButton('sentence')}
</div>`;
}
/**
 * 
 * @param {*} btn_type 
 */
function setButton(btn_type) {
    output('setButton', arguments, 'green');
    switch (btn_type) {
        case 'add':
            return `<input type="button" class="${_btnAdd}">`;
            break;
        case 'add-sentence':
            return `<button class="${_btnAddSentenceSelector}">Add sentence</button>`;
            break;
        case 'add-translated':
            return `<button type="button" class="${_btnAddTranslatedSelector}" disabled="disabled"></button>`;
            break;
        case 'apply':
            return `<button type="button" class="${_btnApplySelector}">✔</button>`;
            break;
        case 'edit':
            return `<button type="button" class="${_btnEditSelector}">&nbsp;</button>`;
            break;
        case 'save':
            return `<input type="button" value="Save" id="${_btnSaveSelector}">`;
            break;
        case 'save-xtra':
            return `<input type="button" value="Save & Add" id="${_btnSaveXtraSelector}">`;
            break;
        case 'attach':
            return `<button type="button" id="${_btnAttachSelector}" class="${_btnAttachSelector}">Add</button>`;
            break;
        case 'sentence':
            return `<button type="button" id="${_btnAttachSentenceSelector}" class="${_btnAttachSentenceSelector}">Add sentence</button>`;
            break;
        case 'edit-sentence':
            return `<button class="${_btnEditSentenceSelector}">Edit sentence</button>`;
            break;
        case 'remove':
            return `<button type="button" class="${_btnRemoveSelector}">&nbsp;</button>`;
            break;
        case 'remove-translated':
            return `<button type="button" class="btn-remove-translated"></button>`;
            break;
        case 'warning':
            return `<button type="button" class="${_btnWarningSelector}" title="${_wordIsTaken}">&nbsp;</button>`;
            break;
    }
}
/**
 * 
 * @param {String} input 
 */
function setInput(input) {
    output('setInput', arguments);
    switch (input) {
        case 'translated':
            return `<input placeholder="Input a translated word here" type="text" class="${_inputAttachClass} translated">`;
            break;
        default:
            return '';
            break;
    }
}
