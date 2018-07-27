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