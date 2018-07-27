/**
 * 
 * @param {String} input 
 */
function setInput(input) {
    output('setInput', arguments);
    switch (input) {
        case 'translated':
            return `<input placeholder="Input a translated word here" type="text" class="${_inputAttachClass} translated">`;
        default:
            return '';
    }
}