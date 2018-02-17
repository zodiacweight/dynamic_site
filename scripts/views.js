/**
 * Set view -- Main or Settings
 * @param {Object | Boolean} dictionary 
 * @param {String} langs 
 */
function setInitView(langs){
    output('setInitView', arguments, 'blue');
    //
    const tmpl = (langs)
        ? 'main'
        : 'settings';
    // get template
    $.get(`tmpl/${tmpl}.html`).done(contents => {
        $mainSection.html(contents);
        if (langs) {
            // create lang list
            setLangsInfo(langs);
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