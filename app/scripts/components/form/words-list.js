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