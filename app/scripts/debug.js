
function onSelectValues(state) {
    console.log('onSelectValues', state);
    $('#reducerSelectsValues span:last-child').text(state);
}

function onForm(state) {
    console.log('onForm', state);
    $(`#${_newWordBlockId}`)[ state === 'haveList' ? 'hide' : 'show']();
    $('#reducerForm span:last-child').text(state);
}

function onHandleSentences(state) {
    console.log('onHandleSentences', state);
    $('#reducerHandleSentences span:last-child').text(state);
}