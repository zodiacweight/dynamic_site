/**
 * 
 * @param {Object | Event} dictionary 
 * @param {String} langs 
 */
function setInitView(dictionary, langs){
    output('setInitView', arguments, 'blue');
    // fixme: not very reliabe approach to check if the dictionary is Event or data :(
    const tmpl = ( !dictionary || 'type' in dictionary )
        ? 'settings' 
        : 'main';
    console.log('check it=>', {
        dictionary:dictionary,
        typeof: typeof dictionary,
        file: `tmpl/${tmpl}.html`
    });
        // get template
    $.get(`tmpl/${tmpl}.html`).done(contents => {
        $mainSection.html(contents);
        if (langs) {
            // create lang list
            setLangsInfo();
        } else {
            setLangInit();
        }
    })
        .fail(() => console.warn(`Cannot get ${tmpl}.html file`));
}
/**
 * 
 */
function setMainView(){
    output('setMainView', arguments, 'blue');
    $.get(`tmpl/main.html`).done(contents => {
        $mainSection.html(contents);
        setLangsInfo();
    })
        .fail(() => console.warn(`Cannot get mai}.html file`));
}