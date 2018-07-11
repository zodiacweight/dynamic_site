/**
 * Set view -- Main or Settings
 * @param {String} langs 
 */
function setInitView(langs){
    output('setInitView', arguments, 'blue');
    //
    const notEvent = notEvnt(langs),
        tmpl = (langs && notEvent)
        ? 'main'
        : 'settings';
    // get template
    $.get(`tmpl/${tmpl}.html`).done(contents => {
        $mainSection.html(contents);
        
        if (langs && notEvent) {
            switchVies();
            //
            setLangsInfo(langs);
        } else { // if go to the languages settings
            $view.html('');
            switchVies('settings');
            setLangInit();
        }
    })
        .fail(() => console.warn(`Cannot get ${tmpl}.html file`));
}
/**
 * 
 * @param {String} view 
 */
function switchVies(view='app'){
    output('switchVies', arguments);
    $body[0].id=_views[view];
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