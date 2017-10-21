function addFields(){
    return "<div><input type=\"text\" placeholder=\"translation for word\"><textarea placeholder=\"sentence for word\"></textarea></div>";
}

$("body").html("<form id='addWordForm'>"
                    +addFields()+
                    "<input type=\"button\" value=\"добавить ячейку\" id=\"addWord\">"+
                    "<input type='button' value='сохранить' id='save'>"+
                "</form>");

$("#addWord").on("click", (e) => {
    var addHTML=addFields();
    $("#addWordForm").append(addFields);
});

$("#save").on("click", (e) => {
    $("#addWordForm div").each(function(){
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

