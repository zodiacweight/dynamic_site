/**
 * 
 * @param {*} lang 
 * @param {*} callback 
 */
function loadDictionary(lang, callbacks) {
    output('loadDictionary', arguments, 'rgb(215, 215, 0)');
    const path = getDictPath(lang.native),
        url = `${_globals.serverAddress}db/${path}/${lang.foreign}.json`;
    // if not, get it from remote DB
    $.get(url).done(dictionary => {
        console.log('got dictionary=>', dictionary);
        dataStore.set(storeDictionary(dictionary));
        if (callbacks) {
            if(!Array.isArray(callbacks)){
                callbacks();
            } else {
                callbacks.forEach(callback =>{
                    callback();
                });
            }
        }
    })
        .fail((xhr, textStatus) => console.error(`Cannot get ${url}, check if you run server on the appropriate port!`, {xhr:xhr, textStatus:textStatus}));
}
/**
 * 
 */
function getDictionary() {
    output('getDictionary', arguments, 'rgb(235, 235, 0)');
    const dictionary = localStorage.getItem('dictionary');
    return dictionary? JSON.parse(dictionary) : false;
}
/**
 * Get languages
 */
function getLangDb() {
    output('getLangDb', arguments, 'rgb(235, 235, 0)');
    let langs = localStorage.getItem('langs');
    if (!langs) {
        const glangs = _globals.languages;
        langs = {native:glangs.russian, foreign:glangs.english};
        storeLanguagesLocal(langs);
    } else {
        langs = JSON.parse(langs);
    }
    return langs; 
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
    storeLanguagesLocal(langs);
    return langs;
}
/**
 * 
 * @param {Array} langs 
 */
function storeLanguagesLocal(langs){
    output('storeLanguagesLocal', arguments);
    localStorage.setItem('langs', JSON.stringify(langs));
}