// git -c http.sslVerify=false push origin master
$(function(){
    const addWordStr = "addWord",
        addWordBtnId = `#${addWordStr}`;
    /** 
     * Проверяет символы в текстовом поле и, когда нужно, вызывает функцию createList
    */
    $("#word").on('input keyup', (e) => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        if (e.target.value.length > 2) {
            const words = createList(e.target.value); // console.log('words=>', words);
            // if the button doesn't exist, add id
            if(!$(addWordBtnId).length){
                if (!$(viewSelector).html()){
                    $("#chooseLanguage").append(`<input type='button' id='${addWordStr}' value='добавить слово'>`);
                }
            } else {
                // check if we have the words which the substring conforms of
                Object.keys(words).forEach((word) => {
                    if (word.indexOf(e.target.value)!==-1){
                        // if we have a word with such a substring then remove the button
                        $(addWordBtnId).remove();
                    }
                });
            }
        } else {
            if($(addWordBtnId)){
                $(addWordBtnId).remove();
            }   //console.log("else");
            clearList(); 
        }
    });

    $(viewSelector).on('mouseenter mouseleave', '> .word', event => {
        $(event.target).toggleClass('active');
    });
    
    $(viewSelector).on('mouseenter mouseleave', '.word > section, .word > .wrapper > .sentence', event => {
        $(event.target).toggleClass('active');
    });
});