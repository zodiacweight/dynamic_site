/**
 * Creates words' list
 * @param {Object} words 
 * @param {String} substring 
 */
function createNewWordList(words, substring) {
    output('createNewWordList', arguments, "rgb(0,100,255)");
    let listHTML = "",
        sentences = "",
        wordsLen = 0;
    //
    Object.keys(words).sort().forEach(word => {
        //
        if (word.indexOf(substring) !== -1) {
            listHTML += `
            <div class='word'>
                ${setButton("edit")}
                <span class="${_nativeWordClass}">${word}</span>
                ${setButton("remove")}
                <section>`;
            ++wordsLen;
            sentences += `
                <div class="sentences">`;
            //
            if (Array.isArray(words[word])) {
                words[word][0].forEach((translatedWord, index) => {
                    [sentences, listHTML] = setSentence(translatedWord, sentences, listHTML, words[word][1][index]);
                });
            } else if (toString.call(words[word]) === '[object Object]') {
                Object.keys(words[word]).forEach(translatedWord => {
                    [sentences, listHTML] = setSentence(translatedWord, sentences, listHTML, // ["A rat is a gnawz. - Крыса грызун.", "Следующее предложение"]
                        words[word][translatedWord]);
                });
            } else {
                console.warn('words[word] is not either Array nor Object...');
            }
            listHTML += `
                    <div class="${_blockAddWordTranslatedClass}">
                        <button class="${_btnAdd}">Add word</button>
                    </div>`;
            listHTML += `
                </section>
            </div>`;
            sentences += `
                </div>`;
        }
    });
    return [listHTML, sentences, wordsLen];
}
