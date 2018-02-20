/**
 * Set view -- Main or Settings
 * @param {Object | Boolean} dictionary 
 * @param {String} langs 
 */
function setInitView(langs){
    output('setInitView', arguments, 'blue');
    //
    const notEvent = notEvent(langs),
        tmpl = (langs && notEvent)
        ? 'main'
        : 'settings';
    // get template
    $.get(`tmpl/${tmpl}.html`).done(contents => {
        $mainSection.html(contents);
        if (langs && notEvent) {
            // create lang list
            setLangsInfo(langs);
        } else {
            $view.html('');
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