$("#view").on("mouseenter", ">div", (event)=>{
    var word = event.target.innerText; 
    getData(showTranslation, word, checked);
    /*console.log("dictionary == undefined is ", dictionary === undefined);*/
});

