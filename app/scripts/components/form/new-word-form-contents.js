/**
 * 
 */
function getNewWordFormContents() {
    output('setAttachedWord', arguments);
    //<input type="text" value="${$(`#${_wordId}`).val()}" class="${_inputAttachClass}" id="${_inputAttachId}">
    return `
<div id="${_newWordBlockId}">
    ${setInput('translated')}
    <!--${setButton('add-translated')}-->
    ${setButton('attach')}
    ${setButton('sentence')}
</div>`;
}