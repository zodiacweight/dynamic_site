function addFields(){
    return "<div><input type=\"text\" placeholder=\"translation for word\"><textarea placeholder=\"sentence for word\"></textarea></div>";
}

$("#addWord").on("click", (e) => {
    var addHTML=addFields();
    $("#addWordForm").append(addHTML);
});