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