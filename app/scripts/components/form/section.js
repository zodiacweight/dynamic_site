/**
 * 
 */
function createFields() {
    output('createFields', arguments);
    return `<section>
    <input type="text" id="${_newWordId}" placeholder="translation for the word">
    <div id="new-word-sentences">
        <textarea placeholder="sentence for the word"></textarea>
        <button class="add-textarea">+</button>
    </div>
</section>`;
}