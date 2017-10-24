// git -c http.sslVerify=false push origin master
$(function(){
    const addWordStr = "addWord",
        addWordId = `#${addWordStr}`,
        addWordFormStr = "addWordForm",
        $chooseLanguage = $("#chooseLanguage"),
        activeClass = 'active';
    /** 
     * Проверяет символы в текстовом поле и, когда нужно, вызывает функцию createList
    */
    let removeButtonAndForm;
    $("#word").on('input keyup', (e) => { // calling on jQuery object
        //
        if (!removeButtonAndForm) {
            removeButtonAndForm = () => {
                console.log('Remove button');
                $(addWordId).remove();
                $(`#${addWordFormStr}`).remove();
            }
        }
        //console.log("input: ", e.target.value);
        if (e.target.value.length > 2) {
            const words = createList(e.target.value); // console.log('words=>', words);
            // if the button doesn't exist, add id
            console.log("$(addWordId): ", $(addWordId));
            if(!$(addWordId).length){ // без lenght - объект, с length - 0.
                if (!$(viewSelector).html()){
                    //
                    $chooseLanguage.append(`<input type='button' id='${addWordStr}' value='добавить слово'>`);
                }
            } else {
                // check if we have the words which the substring conforms of
                Object.keys(words).forEach((word) => {
                    if (word.indexOf(e.target.value)!==-1){
                        // if we have a word with such a substring then remove the button
                        removeButtonAndForm();
                    }
                });
            }
        } else {
            if($(addWordId)){
                removeButtonAndForm();
            }   //console.log("else");
            clearList(); 
        }
    });
    const wordSelector = '> .word';
    $(viewSelector).on('mouseenter mouseleave', wordSelector, event => {
        if (event.type === 'mouseenter') {
            // console.log('active=>', $(`.${activeClass}`));
            $(`.${activeClass}`).removeClass(activeClass);
            $(event.target).addClass(activeClass);
        } else if ($(viewSelector).find(wordSelector).length > 1){
            $(event.target).removeClass(activeClass);
        }
    });
    $chooseLanguage.on("click", addWordId, () => {
        console.log("click");
        $chooseLanguage.after(`<form id='${addWordFormStr}'>
        ${addFields()}
            <input type="button" value="добавить ячейку" id="${addWordStr}">
            <input type='button' value='сохранить' id='save'>
        </form>`);
    });
    
    $("#save").on("click", (e) => {
        $(`#${addWordFormStr} div`).each(function(){
            var word = $(this).find("input"),
            sentence = $(this).find("textarea");
            word=word[0].value;
            sentence = sentence[0].value;
            //console.log('word: ', word, "sentence: ", sentence);
            var checkedLanguage = getTargetLanguage();
            console.log(checkedLanguage);
           // localStorage.setItem(word, sentence);
        });
    });
    
    
});