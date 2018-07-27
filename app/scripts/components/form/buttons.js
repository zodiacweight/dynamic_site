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