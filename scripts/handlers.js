// git -c http.sslVerify=false push origin master
$(function(){
    /** 
     * Проверяет символы в текстовом поле и, когда нужно, вызывает функцию createList
    */
    $("#word").on('input keyup', e => { // calling on jQuery object
        //console.log("input: ", e.target.value);
        var content, targetWordValue = e.target.value;
        if (targetWordValue.length > 2) {
            const words = createList(targetWordValue); // console.log('words=>', words);
            var list = "";
            Object.keys(words).forEach(word => {
                if (word.indexOf(targetWordValue)!==-1){
                    list+=`<div>${word}</div>`;
                    // if we have a word with such a substring then remove the button
                    //removeForm();
                }
            }); 
            console.log('list=>',{list:list, length:targetWordValue.length, targetWordValue:targetWordValue});
            /* if(list!==""){
                content='<div class="word active">'+
                            '<input class="btn-edit" type="button">'+    
                            '<span>🖉</span><span id="nativeWord">облако</span>'+
                            '<section>'+
                                '<div class="wrapper">'+
                                    '<div id="translatedWord">'+
                                        list+
                                    '</div>'+
                                '</div>'+
                            '</section>'+
                        '</div>';
            } */
            // if the word is new and there are 3 letters in the field
            if (!list){
                addForm();
            }

            // if the button doesn't exist, add id
            // createList(targetWordValue)
            /* if(!$(addWordId).length){ // без lenght - объект, с length - 0.
                if (!$view.html()){
                    if($("#deleteWord").length){
                        $("#deleteWord").remove();
                    }

                }

                //if(!($("#deleteWord")).length){
                    //$chooseLanguage.append('<input type="button" id="deleteWord" value="удалить слово">');
                //}
                //console.log("in this place");
            } */ /* else {
                // check if we have the words which the substring conforms of
                Object.keys(words).forEach((word) => {
                    if (word.indexOf(targetWordValue)!==-1){
                        // if we have a word with such a substring then remove the button
                        removeForm();
                    }
                });
            } */
        } else {
            // it checks inside if the button exitss
            removeForm();
            // 
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
            if (event.type == 'mouseenter'){
                if (!$(this).hasClass(activeClass)) {
                    $(this).addClass(activeClass);
                }
            } else {
                if ($view.find('.word').length > 1) {
                    $(this).removeClass(activeClass);
                }      
            }
        }
    });
    // click on #addWord
    $chooseLanguage.on("click", addWordId, () => {
        $chooseLanguage.after(createForm());
    });
    
    $forms.on("click", `${btnSaveId}`, (e) => {
        var nativeWord = $("#word")[0].value;
        //console.log("nativeWord: ", nativeWord);
        $(`#${addWordFormStr} div`).each(function(){
            //console.log("in the cycle");
            var word = $(this).find("input"),
            sentence = $(this).find("textarea");
            word=word[0].value;
            sentence = sentence[0].value;
            var added = {translatedWord: word, sentence: sentence };
            //console.log('word: ', word, "sentence: ", sentence);
            added = JSON.stringify(added);
            localStorage.setItem(nativeWord, added);
            console.log("localStorage[nativeWord]: ", localStorage.getItem(nativeWord));
            var checkedLanguage = getTargetLanguage();
           /**
            * 1. Сначала объект получает все данные из json-файла;
              2. Из этого объекта данные передаются в localStorage;
              3. При клике по кнопке "сохранить":
              3.1 Изменения в объекте;
              3.2 Синхронизация объекта с localStorage - те же изменения;
              3.3 Синхронизация объекта с json-данными.
            */
        });
    });
    // click on the button to edit translated word
    $view.on("click", ".btn-edit", function() {
        var $nativeWordSpan = $(this).parent().find(".nativeWord"), 
            translatedWordsSpan = $(".translatedWord"),
            nativeWord = $nativeWordSpan.text();
            //translatedWord = $(".translatedWord").text(),
            //sentence = $(".sentence").text();
        //
        $nativeWordSpan.contentEditable=true;
        translatedWordsSpan.contentEditable=true;
        addForm();
/*         $chooseLanguage.after(`<form id="${addWordFormStr}">
        ${createFields()}
            ${setButton('save')}
        </form>`); */
    });
});

/**
 * Changes may happen. Перемены могут случаться.
 * 
 */