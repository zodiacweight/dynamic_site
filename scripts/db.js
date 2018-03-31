/**
 * 
 * @param {*} lang 
 * @param {*} callback 
 */
function loadDictionary(lang, callback) {
    output('loadDictionary', arguments, 'rgb(215, 215, 0)');
    // if not, get it from remote DB
    $.get(`db/${lang.native}/${lang.foreign}.json`).done(dictionary => {
        console.log('got dictionary=>', dictionary);
        dataStore.set(storeDictionary(dictionary));
        if (callback) {
            callback();
        }
    })
        .fail(() => console.warn(`Cannot get file from db/${lang.native}/${lang.foreign}.json`));
}
/**
 * 
 */
function getDictionary() {
    output('getDictionary', arguments, 'rgb(235, 235, 0)');
    return JSON.parse(localStorage.getItem('dictionary'));
}
/**
 * 
 */
function getLangDb() {
    output('getLang', arguments, 'rgb(235, 235, 0)');
    return JSON.parse(localStorage.getItem('langs'));
}
/**
 * Stores dictionary in localStorage and synchronizes it with script
 * @param {*} dict -- data
 */
function storeDictionary(dict) {
    output('storeDictionary', arguments, 'rgb(235, 235, 0)');
    localStorage.setItem('dictionary', JSON.stringify(dict));
    dataStore.set(dict);
    return dict;
}
/**
 * store chosen languages set in DB
 */
function storeLanguagesSet() {
    output('storeLanguagesSet', arguments, 'lime');
    const lngsType = ['native', 'foreign'],
        langs = {};
    // go through all (2) selects
    $(_langSelectsSelector).each((index, select) => {
        langs[lngsType[index]] = $(select).val();
    });
    console.log('set langs', langs);
    localStorage.setItem('langs', JSON.stringify(langs));
    return langs;
}