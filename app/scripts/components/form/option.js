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