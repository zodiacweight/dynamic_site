// git -c http.sslVerify=false push origin master
$(function(){
    const addWordStr = "addWord",
        addWordId = `#${addWordStr}`,
        addWordFormStr = "addWordForm",
        $chooseLanguage = $("#chooseLanguage"),
        activeClass = 'active',
        $forms = $("#forms"),
        $view = $("#view");
    let dict = getData();
    $("#word").on('input keyup', e => { 
    const dictionary = dict || getData(dictionary => {
            return dictionary;
        }); // параметры - ?
        if(!dictionary){
            console.warn("dictionary is not gotten.");
        }
        var language = getTargetLanguage();
        console.log("dictionary: ", dictionary);
        if (e.target.value.length > 2) {
            var substring = e.target.value,
            list = makeWordsList(dictionary, substring);
            if(list!==undefined){
                $view.html(list);
            }
            else {
                $view.html("<input type='button' id='${addWordStr}' value='добавить слово'>");
            }
        }
    });
    /*let removeButtonAndForm;
    $("#word").on('input keyup', e => { // calling on jQuery object
        //
        if (!removeButtonAndForm) {
            removeButtonAndForm = () => {
                // console.log('Remove button');
                $(addWordId).remove();
                $(`#${addWordFormStr}`).remove();
            }
        }
        //console.log("input: ", e.target.value);
        var content;
        if (e.target.value.length > 2) {
            makeWordsList(dictionary, substring, currentWord)  
              var list = "";
            Object.keys(words).forEach((word) => {
                if (word.indexOf(e.target.value)!==-1){
                    list+="<div>"+word+"</div>";
                    // if we have a word with such a substring then remove the button
                    //removeButtonAndForm();
                }
            })
            if(list!==""){
                content='<div class="word active">'+
                            '<input id="edit" type="button" value="🖉">'+    
                            '<span id="russianWord">облако</span>'+
                            '<section>'+
                                '<div class="wrapper">'+
                                    '<div id="translatedWord">'+
                                        list+
                                    '</div>'+
                                '</div>'+
                            '</section>'+
                        '</div>';
            } 
            const words = createList(e.target.value); // console.log('words=>', words);
            // if the button doesn't exist, add id
            console.log("слово появилось");
            if(!$(addWordId).length){ // без lenght - объект, с length - 0.
                if (!$view.html()){
                    if($("#deleteWord").length){
                        console.log("Попали.");
                        $("#deleteWord").remove();
                    }
                    $chooseLanguage.append(`<input type='button' id='${addWordStr}' value='добавить слово'>`);
                }

                if(!($("#deleteWord")).length){
                    $chooseLanguage.append('<input type="button" id="deleteWord" value="удалить слово">');
                }
                //console.log("in this place");
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
    // show/hide words/sentences
    $view.on('mouseenter mouseleave', '> .word, .wrapper >span', function(event) {
        if (this.tagName.toLowerCase() == 'span'){
            const indexWord = $(this).parents('.active').eq(0).index(),
                indexSentence = $(this).parent('.wrapper').index(),
                $sentence = $sentencesTranslated
                    .find('.sentences')
                    .eq(indexWord)
                    .find('.wrapper').eq(indexSentence);
            event.type == 'mouseenter' ? 
                $sentence.fadeIn(200)
                : $sentence.hide();
            // manage pseudoelement :before
            $sentencesTranslated.toggleClass('initial');
        } else {
            $(this).toggleClass(activeClass);
        }
    });
    
    $chooseLanguage.on("click", addWordId, () => {
        $chooseLanguage.after(`<form id='${addWordFormStr}'>
        ${addFields()}
            <input type="button" value="добавить ячейку" id="${addWordStr}">
            <input type='button' value='сохранить' id='save'>
        </form>`);
    });
    
    $forms.on("click", "#save", (e) => {
        var russianWord = $("#word")[0].value;
        console.log("russianWord: ", russianWord);
        $(`#${addWordFormStr} div`).each(function(){
            //console.log("in the cycle");
            var word = $(this).find("input"),
            sentence = $(this).find("textarea");
            word=word[0].value;
            sentence = sentence[0].value;
            var added = {translatedWord: word, sentence: sentence };
            //console.log('word: ', word, "sentence: ", sentence);
            added = JSON.stringify(added);
            localStorage.setItem(russianWord, added);
            console.log("localStorage[russianWord]: ", localStorage.getItem(russianWord));
            var checkedLanguage = getTargetLanguage();
           

        });
    });
    $view.on("click", "#edit", () => {
        var russianWordSpan = $("#russianWord"), translatedWordSpan = $("#translatedWord"),
        russianWord = $("#russianWord").text(), translatedWord = $("#translatedWord").text(),
        sentence = $("#sentence").text();
        russianWordSpan.contentEditable=true;
        translatedWordSpan.contentEditable=true;
        $chooseLanguage.after(`<form id='${addWordFormStr}'>
        ${addFields()}
            <input type='button' value='сохранить' id='save'>
        </form>`);
    }); */
});
 
